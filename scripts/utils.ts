/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

import { v4 as uuid } from 'uuid';
import chroma from 'chroma-js';
import type { UUID, Graph } from '~/types/graph';

/**
 * Generates an ID, returns a number if ID present in file
 * @param str string to check for id
 * @returns number or UUID id
 */
export function generateId(str?: string): number | UUID {
  if (str && isId(str)) {
    return isId(str)!;
  }
  return uuid();
}

/**
 * Function to do a simple check if something fits as UUID
 * @param str String to test
 * @returns boolean if UUID
 */
export function isUUID(str: string) {
  return str.length === 36 && str.split('-').length === 5;
}

/**
 * Simple function to quickly check if something can be an ID
 * @param str String to test
 * @returns number or UUID if ID, otherwise undefined
 */
export function isId(str: string): number | UUID | undefined {
  if (str && isNumeric(str)) {
    return parseInt(str);
  } else if (isUUID(str)) {
    return str as UUID;
  }
}

/**
 * Helper function that checks if a given string is a valid integer
 * @param str string to test
 * @returns true if numeric
 */
export function isNumeric(str?: string): boolean {
  if (!str) return false;
  return /^-?\d+$/.test(str);
}
export const defaultNodeSize = ref(5);
const maxEdgeSize = ref(7);
const minEdgeSize = ref(2);
/**
 * calculates the size this node should have
 * @param scaleByDegrees whether nodes are scaled by the number of degrees they have
 * @param degrees the number of degrees this node has
 * @returns the size this node should have
 */
export function calcNodeSize(scaleByDegrees: boolean, degrees: number) {
  if (scaleByDegrees) return defaultNodeSize.value + degrees;
  else return defaultNodeSize.value;
}
/**
 * finds a line that crosses the points (maxWeight, maxEdgeSize) and (minWeight, minEdgeSize)
 * @param weight - weight of the edge that size is being calculated for
 * @param maxWeight - largest weight of all edges
 * @param minWeight - smallest weight og all edges
 * @returns result of giving current edge weight as input to the calculated line function
 */
export function calcEdgeSize(weight: number, maxWeight: number, minWeight: number) {
  const intersect =
    (maxEdgeSize.value - maxWeight * (minEdgeSize.value / minWeight)) / (-maxWeight + 1);
  const growthRate = minEdgeSize.value - intersect;

  return weight * growthRate + intersect;
}
const globalStore = useGlobalStore();

/**
 * Decides which color a node should have based on the values of it's paradigms
 * @param graphData the graph object on for which the edges are being calculated
 * @param paradigmA the first paradigm
 * @param paradigmB the second paradigm
 * @returns the color this node should be
 */
export function paradigmsToNodeColor(
  graphData: Graph,
  paradigmA: number,
  paradigmB: number,
): string {
  let result: string;
  // We want to color nodes by paradigm only if paradigm support is enabled
  if (globalStore.scriptSettings.paradigmSupport.enabled) {
    result =
      paradigmA && paradigmA > 0
        ? graphData.settings.legend.paradigmA.color
        : paradigmB && paradigmB > 0
          ? graphData.settings.legend.paradigmB.color
          : graphData.settings.legend.noParadigm.color;
  } else {
    result = graphData.settings.legend.noParadigm.color;
  }
  return result;
}
/**
 * returns the edge color belonging to the value of an edge
 * @param graphData the graph object on for which the edges are being calculated
 * @param value the value of the edge, 1, 0 or -1
 * @returns a hex string for the color of this edge
 */
export function edgeValueToEdgeColor(graphData: Graph, value: number): string {
  const initial =
    value > 0
      ? graphData.settings.legend.positiveEdge.color
      : value < 0
        ? graphData.settings.legend.negativeEdge.color
        : graphData.settings.legend.neutralEdge.color;

  return chroma(initial).brighten(1.5).hex();
}
/**
 * computes the the normalized version of a given vector
 * @param v the input vector
 * @returns a normalized version of the original vector
 */
export function normalize(v: [number, number]): [number, number] {
  const length = Math.sqrt(v[0] * v[0] + v[1] * v[1]);
  return [v[0] / length, v[1] / length];
}
/**
 * calculates the angle of a vector with the x-axis
 * @param v a 2-dimensional input vector
 * @returns the angle with the x-axis of the input vector
 */
export function angle(v: [number, number]): number {
  const v2 = normalize(v);
  return Math.atan2(v2[1], v2[0]);
}

/**
 * computes the sign of a number
 * @param x The number of which the sign is wanted
 * @returns the sign of a nonzero number, and an empty string for zero
 */
export function signSymbol(x: number): string {
  return x === 0 ? '' : x < 0 ? '-' : '+';
}
/**
 * Hooks a node's ID to the node's name
 * @param graph The graph in which to look for the node
 * @param id Id to search
 * @returns Name of the node
 */
export function nodeIdToName(graph: Graph, id: string): string {
  if (!isId(id)) return id;
  const nodes = graph.nodes;
  if (nodes[id]) {
    return nodes[id].nodeName;
  }
  return 'Unknown node ID';
}
