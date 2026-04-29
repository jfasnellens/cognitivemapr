/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

import type { Edge, Graph, Node, UUID } from '../types/graph';
import { sum } from 'lodash';

/**
 * Runs causal power script from Profs van Esch's R package on a graph
 * @param graph Graph to run script on
 * @returns New processed graph
 */
export function causalPowerScript(graph: Graph, initialNode: number|UUID): Record<number|UUID,number> { 
  let incomingEdges: Record<number | UUID, Array<number | UUID>> = listIncomingEdges();

  // For each node keeps track of causal power and distance per path
  type pathRecordType = Record<number | UUID, Array<number>>;
  const pathRecord: pathRecordType = {};
  recursiveCausalPower(initialNode, 1, 0, 1);

  // For each node, add the causal power value from each individual path to obtain the total causal power of the node
  const causalPowerRecord: Record<number|UUID, number> = {};
  for(const [key, value] of Object.entries(pathRecord) as [keyof pathRecordType, pathRecordType[keyof pathRecordType]][]){
    causalPowerRecord[key] = sum(pathRecord[key]);
  }

  delete causalPowerRecord[initialNode];

  return causalPowerRecord;

  function recursiveCausalPower(currentNode: number|UUID, edgeValue: number, distance: number, previousCausalPower: number): void {
    // Causal power formula
    let autonomousPower: number = edgeValue * (Math.pow(0.9, distance));
    let currentCausalPower: number = autonomousPower * previousCausalPower;

    // Recursive for all incoming edges
    incomingEdges[currentNode].forEach((edgeID: number|UUID) => {
      let edge: Edge = graph.edges[edgeID];
      recursiveCausalPower(edge.from, edge.edgeValue, distance+1, currentCausalPower);
    })
    
    // Add causal power to pathrecord
    if (!pathRecord[currentNode]) {
      pathRecord[currentNode] = []
    }
    pathRecord[currentNode].push(currentCausalPower);

    return;
  }

  /**
   * For each node, makes a list of all outgoing edges
   * @returns Record of outgoing edges
   */
  function listIncomingEdges(): Record<number | UUID, Array<number | UUID>> {
    const nodesWithEdges: Record<number | UUID, Array<number | UUID>> = {}; // key: nodeID, value: edgeID[]

    // Every node needs a list, even if it's empty. Otherwise loops will throw an error rather than looping 0 times
    graph.nodeArray.forEach((node: Node) => {
      nodesWithEdges[node.id] = [];
    });
    graph.edgeArray.forEach((edge: Edge) => {
      nodesWithEdges[edge.to].push(edge.id); // Add the edge to the key, safely assuming the list exists
    });

    return nodesWithEdges;
  }
}
