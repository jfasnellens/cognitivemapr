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
 * Uses a line function to calculate the size of an edge based on its weight
 * @param weight - weight of the edge that size is being calculated for
 * @returns result of giving current edge weight as input to the calculated line function
 */
export function calcEdgeSize(weight: number) {
  return 1 / (-(weight + 5) * (1 / 100)) + 20;
}

/**
 * Decides which color a node should have based on the values of it's paradigms
 * @param colors object with colors
 * @param colors.paradigmA the first paradigm color
 * @param colors.paradigmB the second paradigm color
 * @param colors.noParadigm the color for nodes without paradigms
 * @param paradigmA the value of the first paradigm
 * @param paradigmB the value of the second paradigm
 * @returns the color this node should be
 */
export function paradigmsToNodeColor(
  colors: { paradigmA: string; paradigmB: string; noParadigm: string },
  paradigmA?: number,
  paradigmB?: number,
): string {
  let result: string;
  const globalStore = useGlobalStore();
  // We want to color nodes by paradigm only if paradigm support is enabled
  if (globalStore.scriptSettings.paradigmSupport.enabled) {
    result =
      paradigmA && paradigmA > 0
        ? colors.paradigmA
        : paradigmB && paradigmB > 0
          ? colors.paradigmB
          : colors.noParadigm;
  } else {
    result = colors.noParadigm;
  }
  return result;
}
/**
 * returns the edge color belonging to the value of an edge
 * @param colorData Object with edge color data.
 * @param colorData.positiveEdgeColor the color of positive edges
 * @param colorData.negativeEdgeColor the color of negative edges
 * @param colorData.neutralEdgeColor the color of neutral edges
 * @param value the value of the edge, 1, 0 or -1
 * @returns a hex string for the color of this edge
 */
export function edgeValueToEdgeColor(
  colorData: { positiveEdgeColor: string; negativeEdgeColor: string; neutralEdgeColor: string },
  value: number,
): string {
  const initial =
    value > 0
      ? colorData.positiveEdgeColor
      : value < 0
        ? colorData.negativeEdgeColor
        : colorData.neutralEdgeColor;

  return chroma(initial).brighten(1.5).hex();
}

/**
 * Converts an evaluation value to a color
 * @param value value form the evaluation
 * @param colors object with colors
 * @param colors.positive positive color
 * @param colors.negative negative color
 * @param colors.neutral neutral color
 * @returns hex color
 */
export function evaluateConceptValueToColor(
  value: number,
  colors: { positive: string; negative: string; neutral: string },
) {
  if (value < 0) {
    return colors.negative;
  }
  if (value > 0) {
    return colors.positive;
  }
  return colors.neutral;
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
  const nodes = graph.nodes;
  if (nodes[id]) {
    return nodes[id].nodeName;
  }
  // In some contexts the given ID is actually the name of the node
  return id;
}
