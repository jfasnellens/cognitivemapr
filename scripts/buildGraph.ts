/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

import { generateId, isNumeric } from './utils';
import { ScriptError } from '~/types/errors';
import type { Edge, Graph, Node, UUID } from '~/types/graph';

/**
 * Builds a graph based on given edge and node list. If no nodes are provides, it will generate a nodelist based on the edge list.
 * @param edges Edge array from CSV Parser
 * @param vertices Node array from CSV Parser or other scripts.
 * @returns Object with the build graph and an array of possible warnings that have occured
 */
export function buildGraphScript(
  edges: Array<Partial<Edge>>,
  vertices?: Array<Node>,
): {
  graph: Graph;
  warnings: Array<{
    from: string;
    message: string;
    subComponent?: string | undefined;
    data?: object | undefined;
  }>;
} {
  const { nodes: generatedNodes, warnings } = generateNodesBasedOnEdgesScript(edges, vertices);
  const filledEdges: Array<Edge> = fillEdges(edges, generatedNodes);

  const graph = fillArraysScript(filledEdges, generatedNodes);
  filledEdges.forEach((edge) => {
    if (!graph.nodes[edge.from])
      throw new ScriptError({
        from: 'Graph builder',
        subComponent: 'Degree calculator',
        message: `Node ${edge.from} not found in graph!`,
      });
    if (!graph.nodes[edge.to])
      throw new ScriptError({
        from: 'Graph builder',
        subComponent: 'Degree calculator',
        message: `Node ${edge.to} not found in graph!`,
      });

    // Setup degrees object
    if (!graph.nodes[edge.from].degrees) graph.nodes[edge.from].degrees = { all: 0, in: 0, out: 0 };
    if (!graph.nodes[edge.to].degrees) graph.nodes[edge.to].degrees = { all: 0, in: 0, out: 0 };
    if (!graph.nodes[edge.from].weightedDegrees)
      graph.nodes[edge.from].weightedDegrees = { all: 0, in: 0, out: 0 };
    if (!graph.nodes[edge.to].weightedDegrees)
      graph.nodes[edge.to].weightedDegrees = { all: 0, in: 0, out: 0 };

    // Non-weighted degrees
    graph.nodes[edge.from].degrees!.all++;
    graph.nodes[edge.from].degrees!.out++;
    graph.nodes[edge.to].degrees!.all++;
    graph.nodes[edge.to].degrees!.in++;

    // Weighted degrees
    graph.nodes[edge.from].weightedDegrees!.all += edge.weight;
    graph.nodes[edge.from].weightedDegrees!.out += edge.weight;
    graph.nodes[edge.to].weightedDegrees!.all += edge.weight;
    graph.nodes[edge.to].weightedDegrees!.in += edge.weight;
    return edge;
  });

  graph.nodeArray.forEach((node) => {
    node.go = (node.degrees!.in - node.degrees!.out) / node.degrees!.all;
    node.goW = (node.weightedDegrees!.in - node.weightedDegrees!.out) / node.weightedDegrees!.all;
    if (isNaN(node.go)) node.go = 0;
    if (isNaN(node.goW)) node.goW = 0;

    // Keep track of the paradigm names used in the nodes
    if (node.paradigm !== undefined && node.paradigm !== 'NA' && node.paradigm.trim() !== '') {
      if (graph.paradigmPair === undefined) {
        graph.paradigmPair = [node.paradigm, ''];
      } else if (graph.paradigmPair && node.paradigm !== graph.paradigmPair[0]) {
        // sort paradigm names alphabetically
        if (node.paradigm < graph.paradigmPair[0]) {
          graph.paradigmPair = [node.paradigm, graph.paradigmPair[0]];
        } else {
          graph.paradigmPair[1] = node.paradigm;
        }
      }
    }
  });
  return { graph, warnings };
}

/**
 * Fills graph with edges and nodes and fills dictionaries.
 * @param edges Edges to make graph with
 * @param vertices Nodes to make graph with
 * @returns Graph object with dictionairies and arrays filled.
 */
export function fillArraysScript(edges: Array<Edge>, vertices: Array<Node>): Graph {
  const graph: Graph = {
    edges: {},
    nodes: {},
    edgeArray: edges,
    nodeArray: vertices,
  };
  vertices.forEach((node) => {
    graph.nodes[node.id] = node;
  });
  edges.forEach((edge) => {
    graph.edges[edge.id] = edge;
  });
  return graph;
}

/**
 * Replaces the node array and dictionairy in a graph with a new array.
 * @param graph Graph to update
 * @param nodes Nodes to update to
 * @returns New updated graph.
 */
export function replaceNodesScript(graph: Graph, nodes: Array<Node>) {
  // Clear
  graph.nodes = {};
  graph.nodeArray = [];

  // Rehydrate
  graph.nodeArray = nodes;
  nodes.forEach((node) => {
    graph.nodes[node.id] = node;
  });
  return graph;
}

/**
 * Generates a node list based on data in the edge array.
 * @param edges edge array to base nodes on
 * @param vertices node array to check against partial generation
 * @returns node array
 */
export function generateNodesBasedOnEdgesScript(
  edges: Array<Partial<Edge> | Edge>,
  vertices?: Array<Node>,
): {
  nodes: Array<Node>;
  warnings: Array<{
    from: string;
    message: string;
    subComponent?: string | undefined;
    data?: object | undefined;
  }>;
} {
  const uniqueNodeNames: Set<string> = new Set<string>();
  // Get all names from the edges and keep uniques
  edges.forEach((edge) => {
    if (!edge.fromName || !edge.toName) {
      if (!edge.from || !edge.to) {
        throw new ScriptError({
          message: 'Nothing to derive node name from in edges',
          from: 'Graph builder',
          subComponent: 'Node generator',
        });
      }
      uniqueNodeNames.add(edge.from.toString());
      uniqueNodeNames.add(edge.to.toString());
      return;
    }
    uniqueNodeNames.add(edge.fromName);
    uniqueNodeNames.add(edge.toName);
  });

  // Partial node generation
  if (vertices) {
    // Check if all the found nodes in the edge list are in the nodeList
    const nameInArray = Array.from(uniqueNodeNames).map(
      (name) =>
        vertices.map((node) => node.nodeName).includes(name) ||
        vertices.map((node) => node.id.toString()).includes(name),
    );
    if (nameInArray.every((bool) => !!bool)) {
      // All nodes are in the nodelist, no generation needed
      return { nodes: vertices, warnings: [] };
    } else {
      // Not all nodes are in the node list, remove the ones we already have.
      vertices.forEach((node) => {
        uniqueNodeNames.delete(node.nodeName);
      });
    }
  }

  // Generate basic nodes with these names
  const nodes: Array<Node> = [...uniqueNodeNames].map((name): Node => {
    const node: Node = {
      id: generateId(),
      nodeName: name,
      evaluation: { inputValue: 1 },
      degrees: {
        all: 0,
        in: 0,
        out: 0,
      },
      weightedDegrees: {
        all: 0,
        in: 0,
        out: 0,
      },
    };
    return node;
  });
  const finalNodes = nodes.concat(vertices ?? []);
  return {
    nodes: finalNodes,
    warnings: [
      {
        from: 'Graph builder',
        subComponent: 'Node generator',
        message: `${uniqueNodeNames.size} node(s) were generated during the building of the graph. \nThese nodes were made using the default node values and node names from the edge list`,
      },
    ],
  };
}

/**
 * Converts partial edges to edges using provided data.
 * @param partialEdges Edges from the CSV Parser
 * @param nodes Nodes to base Id's on for filling
 * @returns Saturated Edge array
 */
function fillEdges(partialEdges: Array<Partial<Edge>>, nodes: Array<Node>): Array<Edge> {
  if (!partialEdges || !partialEdges[0]) {
    throw new ScriptError({
      message: 'No edges to fill',
      from: 'Graph builder',
      subComponent: 'Edge hydrator',
    });
  }
  // If the from is already filled when we get here, it means its an advanced CSV.
  if (isNumeric(partialEdges[0].from?.toString()) && isNumeric(nodes[0].id.toString()))
    return partialEdges as Array<Edge>;

  // Build map from name to ID
  const nameId: Map<string, number | UUID> = new Map<string, number | UUID>();
  nodes.forEach((node) => {
    nameId.set(node.nodeName, node.id);
  });
  // Convert fromName and toName to from and to ids
  const filledEdges = partialEdges.map((edge): Edge => {
    if (!edge.toName || !edge.fromName)
      throw new ScriptError({
        message: 'Can not derive node Id from undefined names',
        from: 'Graph builder',
        subComponent: 'Edge hydrator',
      });
    if (!nameId.has(edge.toName) || !nameId.has(edge.fromName)) {
      const notFoundStr = !nameId.has(edge.toName)
        ? `Node name: ${edge.toName}`
        : `Node name: ${edge.fromName}`;
      throw new ScriptError({
        message: `Unknown node name found in edge. \nIs it missing from the provided nodelist? \n${notFoundStr}`,
        from: 'Graph builder',
        subComponent: 'Edge hydrator',
      });
    }

    const newEdge = { ...edge };
    newEdge.from = nameId.get(edge.fromName);
    newEdge.to = nameId.get(edge.toName);
    return newEdge as Edge;
  });

  return filledEdges;
}
