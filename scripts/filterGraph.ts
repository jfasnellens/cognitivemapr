/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

/* ----- The Filter Graph Script -----
This script is the Typescript equivalent of the "extract_edge_and_node_lists.R".
The goal is to filter a graph on edges that belong to a specific speaker or time period.
Only the nodes that are connected to these edges are kept.
The function has been split into one that filters on the speaker, and one that filters on the time period.
This choice has been made to allow filtering on either speaker or time period separately,
for example when someone wants to use all speeches of a certain speaker from all times, or speeches from a specific time period from all speakers.

The function does not return a graph, but rather a separate edge and node list.
This is done in order to properly separate the scripts from the store;
we don't want to call the buildGraph script of the store
This means that, after calling this method, the build graph function will have to be called as well in order to get a graph again
*/

import dayjs from 'dayjs';
import type { Edge, Graph, ISODateString, Node, UUID } from '../types/graph';


/**
 * Extracts edges from a certain speaker out of the graph
 * @param graph Graph to extract from
 * @param speaker Speaker to extract
 * @returns New graph with speaker extracted
 */
export function extractSpeakerScript(
  graph: Graph,
  speaker: string,
): { edges: Array<Edge>; nodes: Array<Node> } {
  const edgeArray: Array<Edge> = [];
  const nodeArray: Array<Node> = [];
  // The edges are treated once each, so they can simply be pushed, but for the nodes, this would result in duplicates
  // e.g. if edges 1 and 2 go into node A, and edge 3 comes out of it, node A will be pushed three times: as "to" of 1 and 2, and as "from" of 3
  // Instead, we'll use a dictionary that shifts the value of the node to true if it's included
  const nodes: Record<number | UUID, boolean> = {};

  // Only keep the edge if its speaker corresponds to the parameter
  graph.edgeArray.forEach((edge: Edge) => {
    if (edge.speaker === speaker) {
      edgeArray.push(edge);
      nodes[edge.from] = true;
      nodes[edge.to] = true;
    }
  });

  for (const n of graph.nodeArray) {
    if (nodes[n.id] === true) nodeArray.push(graph.nodes[n.id]);
  }

  // Note that the degrees are different now that edges have been removed, so they have to be calculated again
  return { edges: edgeArray, nodes: nodeArray };
}

/**
 * Extracts edges from a certain date range out of the graph
 * @param graph Graph to extract from
 * @param startDate Start of date range to extract from
 * @param endDate End of date range to extract to.
 * @returns New graph with date range extracted
 */
export function extractTimePeriodScript(
  graph: Graph,
  startDate: ISODateString,
  endDate: ISODateString,
): { edges: Array<Edge>; nodes: Array<Node> } {
  const edgeArray: Array<Edge> = [];
  const nodeArray: Array<Node> = [];
  const nodeInclusion: Record<number | UUID, boolean> = {};

  // Only keep the edge if the date is within the specified time frame
  graph.edgeArray.forEach((edge: Edge) => {
    if (dayjs(startDate).isBefore(edge.mapDate) && dayjs(edge.mapDate).isBefore(endDate)) {
      edgeArray.push(edge);
      nodeInclusion[edge.from] = true;
      nodeInclusion[edge.to] = true;
    }
  });

  for (const n of graph.nodeArray) {
    if (nodeInclusion[n.id] === true) nodeArray.push(graph.nodes[n.id]);
  }

  return { edges: edgeArray, nodes: nodeArray };
}
