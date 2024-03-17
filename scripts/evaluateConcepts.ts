/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

import type { Edge, Graph, Node, UUID } from '../types/graph';
import { ScriptError } from '~/types/errors';

/**
 * Runs evaluate concepts script from Profs van Esch's R package on a graph
 * @param graph Graph to run script on
 * @returns New processed graph
 */
export function evaluateConceptsScript(graph: Graph): Graph {
  // Dictionary with node ids as keys and node values as values. Used to store calculated values to prevent duplicate calculations
  const nodeValues: Record<number | UUID, number | undefined> = {};
  // Dictionary with node ids as keys and as values whether the node is on a cycle. Makes sure the DFS only is applied once to each node
  const nodesOnCycle: Record<number | UUID, boolean> = {};

  const outgoingEdges: Record<number | UUID, Array<number | UUID>> = listOutgoingEdges(); // Maps each node to its outgoing edges

  // The actual calculation of each node's value
  graph.nodeArray.forEach((node) => {
    node.evaluation.value = evaluateNode(node);
    // Note that, when an error occurs, only part of the values has been updated.
    // This is not a problem, because the graph would not be returned in case of an error,
    // so the function gives either a fully updated graph or no graph at all.
  });
  return graph;

  /**
   * The main function that determines the value of a node
   * @param node The node for which a value needs to be determined
   * @returns The value of the node
   */
  function evaluateNode(node: Node): number {
    if (node.id in nodeValues) {
      return nodeValues[node.id]!;
    } else if (onCycle(node)) {
      evaluateCycle(node);
      return nodeValues[node.id]!;
    } else {
      nodeValues[node.id] = calculateNodeValue(node);
      return nodeValues[node.id]!;
    }
  }

  /**
   * For each node, makes a list of all outgoing edges
   * @returns Record of outgoing edges
   */
  function listOutgoingEdges(): Record<number | UUID, Array<number | UUID>> {
    const nodesWithEdges: Record<number | UUID, Array<number | UUID>> = {}; // key: nodeID, value: edgeID[]

    // Every node needs a list, even if it's empty. Otherwise loops will throw an error rather than looping 0 times
    graph.nodeArray.forEach((node: Node) => {
      nodesWithEdges[node.id] = [];
    });
    graph.edgeArray.forEach((edge: Edge) => {
      nodesWithEdges[edge.from].push(edge.id); // Add the edge to the key, safely assuming the list exists
    });

    return nodesWithEdges;
  }

  /**
   * Sum the positive and negative influence of this node on other nodes.
   * If the sum is negative, the node's value should be negative (-1), if it's positive, the value should be positive (1)
   * otherwise, it should be neutral (0)
   * @param node Node to calculate value of
   * @returns Node value
   */
  function calculateNodeValue(node: Node): number {
    if (node.degrees.out < 1) {
      // Base case
      return getSign(node.evaluation.inputValue);
    } else {
      let sum: number = 0;
      let edge: Edge;
      // Sum the values of destinations * edge values
      outgoingEdges[node.id].forEach((edgeid) => {
        edge = graph.edges[edgeid];
        sum += edge.edgeValue * edge.weight * evaluateNode(graph.nodes[edge.to]);
      });
      return getSign(sum); // Turn the sum into a value that is simply positive (1), negative (-1), or arbitrary (0)
    }
  }

  /**
   * Turns number into 1, -1 or 0
   * @param i input to get sign of
   * @returns sign being 1 if positive, -1 if negative or 0 if neutral
   */
  function getSign(i: number): number {
    if (i > 0) {
      return 1;
    } else if (i < 0) {
      return -1;
    } else {
      return 0;
    }
  }

  // =============== Cycle Evaluation ===============

  /**
   * Checks if a node is on a cycle
   * @param node The node for which is checked if it's on a cycle
   * @returns A boolean that indicates whether the node is on a cycle
   */
  function onCycle(node: Node): boolean {
    const nodesVisited: Record<number | UUID, boolean> = {};
    // If this check has already been done for this node, we don't need to do it again
    if (node.id in nodesOnCycle) {
      return nodesOnCycle[node.id];
    } else {
      // Otherwise, determine if the node is on a cycle
      // In order to prevent eternal loops, we have to handle detecting back edges of another cycle
      // For that purpose, we keep track of the visited nodes
      findNode(node, node, nodesVisited);
      if (!(node.id in nodesOnCycle)) {
        // If findNode didn't find a cycle for the node, it's probably not on a cycle
        nodesOnCycle[node.id] = false;
      }
      return nodesOnCycle[node.id];
    }

    /**
     * See if, starting from parentNode, the initial node can be found among the children nodes. Used to determine whether the initial node is on a cycle.
     * Does not return a value, but updates the nodesOnCycle dictionary if any value could be determined.
     * @param nodeToFind The node that needs to be found to determine if its on a cycle
     * @param parentNode The node that is currently being processed to see if the initial node can be found
     * @param nodesVisited A record that keeps track of the nodes visited so far on this path
     */
    function findNode(
      nodeToFind: Node,
      parentNode: Node,
      nodesVisited: Record<number | UUID, boolean>,
    ): void {
      if (!(nodeToFind.id in nodesOnCycle)) {
        if (parentNode.degrees.out < 1) {
          // Base case. This node can't be on a cycle and can't continue looking from here
          nodesVisited[parentNode.id] = true;
          nodesOnCycle[parentNode.id] = false;
        } else {
          outgoingEdges[parentNode.id].forEach((edgeID: number | UUID) => {
            // To prevent detecting double edges or merging paths as cycles, the paths need to be local, so we copy one for each child
            const childNodesVisited = structuredClone(nodesVisited);
            const outEdge: Edge = graph.edges[edgeID];
            const childNode: Node = graph.nodes[outEdge.to];

            if (childNode.id === nodeToFind.id) {
              // If it's the same node, we're in a cycle
              childNodesVisited[childNode.id] = true;
              nodesOnCycle[childNode.id] = true; // Which is the same as the nodeToFind, so that's true now
            } else if (childNodesVisited[childNode.id]) {
              // If we've found a different back edge, it's a different cycle
              childNodesVisited[childNode.id] = true;
              nodesOnCycle[childNode.id] = true;
            } else {
              childNodesVisited[childNode.id] = true;
              findNode(nodeToFind, childNode, childNodesVisited);
            }
          });
        }
      }
    }
  }

  /**
   * Attempts to give all nodes in the cycle complex (i.e. in the same cycle and in other connected cycles) a value
   * @param cycleNode Any node in the cycle complex, from which the cycle complex to be evaluated is located
   */
  function evaluateCycle(cycleNode: Node): void {
    const cycleNodes: Array<Node> = scoutCycleComplex(cycleNode); // All nodes that need to be processed in this cycle evaluation
    cycleNodes.forEach((node: Node) => {
      // For the evaluation, we prevent the eternal loop by assuming a neutral value before evaluating the cycle further
      nodeValues[node.id] = 0;
    });

    const iterations: Array<Record<number | UUID, number>> = []; // Keeps track of all evaluation iterations, in chronological order
    const iterationIndices: Record<string, number> = {}; // Makes sure that the position of an iteration in the 'iterations' list can be found efficiently

    const maxIterations = 100000; // Just for safety
    let iteration: Record<number | UUID, number>;
    for (let i = 0; i < maxIterations; i++) {
      iteration = iterateCycle(cycleNodes);
      const iterationId = IterationToId(cycleNodes, iteration);
      const iterationIndex = iterationIndices[iterationId]; // Retrieves the location of the iteration in the list if it was already present there
      if (iterationIndex) {
        // Iteration already seen before
        // Case 1: the iteration is the same as the previous one, which means the cycle has stabilized and the evaluation of the cycle is done
        if (iterationIndex === iterations.length - 1) return;
        // Case 2: the iteration is the same as one encountered earlier
        // The values will keep looping infinitely over the double iteration retrieved up until the current iteration
        // First check if user input is available
        const valuesRequired: Array<{ node: Node; values: number[] }> = [];
        cycleNodes.forEach((cycleNode: Node) => {
          if (typeof cycleNode.evaluation.pickedValue === 'undefined') {
            // This node has no user value available. Add the value found for each looping iteration as possible values
            valuesRequired.push({
              node: cycleNode,
              values: ValueOptions(iterations, iterationIndex, cycleNode.id),
            });
          } else {
            nodeValues[cycleNode.id] = cycleNode.evaluation.pickedValue;
          }
        });
        if (valuesRequired.length > 0) {
          // There is at least one node without a user value
          cycleNodes.forEach((node: Node) => {
            nodeValues[node.id] = undefined;
          });
          throw new ScriptError({
            message: 'An unstable cycle has been detected. User input required.',
            from: 'Analysis Scripts',
            subComponent: 'Evaluate Concepts',
            data: valuesRequired,
          });
        }
        return; // All user values applied succesfully
      } // New iteration. Save it and continue
      else {
        iterationIndices[iterationId] = iterations.length; // Which is the index it will receive in 'iterations'
        iterations.push(iteration);
      }
    }
  }

  /**
   * Assigns an iteration an ID on the basis of the values in it, so that iterations with the exact same values have the same ID
   * @param cycleNodes The nodes in the cycle
   * @param iteration The iteration to turn into an ID
   * @returns The ID
   */
  function IterationToId(
    cycleNodes: Array<Node>,
    iteration: Record<number | UUID, number>,
  ): string {
    // Constructing a unique ID will simply give each possible value a corresponding letter: -1 = n, 0 = z, 1 = p
    // Since the order of nodes should remain the same in the cycle evaluation, the same string will be the same node values
    let id = '';
    cycleNodes.forEach((node: Node) => {
      const value = iteration[node.id];
      id += value === 1 ? 'p' : value === 0 ? 'z' : 'n';
    });
    return id;
  }

  /**
   * For a node, filters the iteration values to only include those of the looping iterations
   * @param iterations The full set of iterations as gathered by the cycle evaluation
   * @param loopIndex The index of the iteration at which the looping starts
   * @param cycleNodeId The node for which to filter the values
   * @returns The list of values of only those iterations that loop, so that no duplicates or non-looping values are among them
   */
  function ValueOptions(
    iterations: Array<Record<number | UUID, number>>,
    loopIndex: number,
    cycleNodeId: number | UUID,
  ): number[] {
    const values = [];
    for (let i = loopIndex; i < iterations.length; i++) {
      // For each iteration in the loop
      values.push(iterations[i][cycleNodeId]); // Push this node's value
    }
    return values;
  }

  /**
   * Evaluates all given nodes once, replacing old values
   * @param cycleNodes All nodes to be evaluated
   * @returns A record with a new value for each node evaluated
   */
  function iterateCycle(cycleNodes: Array<Node>): Record<number | UUID, number> {
    const newValues: Record<number | UUID, number> = {};
    // The actual node values are only update after an entire iteration, ensuring that nothing is messed up by the order of evaluation
    // This means that the definition of 'iteration' here is not a full circle in the cycle, but essentially one step for all nodes
    cycleNodes.forEach((node: Node) => {
      newValues[node.id] = calculateNodeValue(node);
    });
    cycleNodes.forEach((node: Node) => {
      nodeValues[node.id] = newValues[node.id];
    });
    return newValues;
  }

  /**
   * Finds an array of all nodes on the same cycle complex (i.e. in the same cycle and in other connected cycles) and evaluates all nodes on which the cycle depends
   * @param initialNode Any node in the cycle complex from which to start looking for the other nodes
   * @returns A single array of all nodes in the same cycle complex
   */
  function scoutCycleComplex(initialNode: Node): Array<Node> {
    const cycleNodes: Array<Node> = []; // Used to store and return which nodes are in this cycle complex
    const stack: Array<Node> = []; // TypeScript doesn't seem to have Queues, or Stacks, so I'm using an array instead
    cycleNodes.push(initialNode);
    stack.push(initialNode);
    while (stack.length > 0) {
      const currentNode: Node = stack.splice(stack.length - 1, 1)[0]; // Pulls the last element from the "stack"
      outgoingEdges[currentNode.id].forEach((edgeID: number | UUID) => {
        const node: Node = graph.nodes[graph.edges[edgeID].to];
        if (!nodesOnCycle[node.id]) {
          // First checks if the node hasn't been processed before, then if it's on a cycle
          if (onCycle(node)) {
            // If the condition is passed, it means we have found a new node in the cycle complex, so we need to add it
            cycleNodes.push(node);
            stack.push(node); // To continue scouting the cycle complex, we need to process the children of this node as well
          } else {
            // If it's not on a cycle, we don't need to add it,
            // but we need to determine the value, because it impacts the value of the cycle
            evaluateNode(node);
          }
        }
      });
    }
    return cycleNodes;
  }
}
