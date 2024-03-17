/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

import dayjs from 'dayjs';
import type { Node, Edge } from '~/types/graph';

/**
 * Creates a testing node and edge array
 * @returns testing nodes and edges
 */
export function createTestingNodeEdgeArray(): { nodes: Array<Node>; edges: Array<Edge> } {
  // Construct empty nodes
  const emptyDegrees = { all: 0, in: 0, out: 0 };
  const node1: Node = {
    id: 1,
    nodeName: 'z',
    paradigm: 'Ordoliberal',
    int: 'Supernational',
    instr: { name: 'Supernational' },
    evaluation: { inputValue: 0, value: 1 },
    degrees: structuredClone(emptyDegrees),
    weightedDegrees: structuredClone(emptyDegrees),
  };
  const node2: Node = {
    id: 2,
    nodeName: 'x',
    evaluation: { inputValue: 0, value: 1 },
    degrees: structuredClone(emptyDegrees),
    weightedDegrees: structuredClone(emptyDegrees),
  };
  const node3: Node = {
    id: 3,
    nodeName: 'y',
    int: 'Intergovermental',
    instr: { name: 'Intergovermental' },
    evaluation: { inputValue: 0, value: -1 },
    degrees: structuredClone(emptyDegrees),
    weightedDegrees: structuredClone(emptyDegrees),
  };
  const node4: Node = {
    id: 4,
    nodeName: 't',
    evaluation: { inputValue: 0, value: 1 },
    degrees: structuredClone(emptyDegrees),
    weightedDegrees: structuredClone(emptyDegrees),
  };
  const node5: Node = {
    id: 5,
    nodeName: 's',
    paradigm: 'Keynesian',
    int: 'Supernational',
    instr: { name: 'Supernational' },
    evaluation: { inputValue: 0, value: 1 },
    degrees: structuredClone(emptyDegrees),
    weightedDegrees: structuredClone(emptyDegrees),
  };

  const nodeArray = [node1, node2, node3, node4, node5];

  // Construct edges
  const edge1: Edge = {
    from: 1,
    to: 3,
    weight: 1,
    edgeValue: 1,
    id: 1,
    mapId: '22',
    mapDate: dayjs('2010-05-10').toISOString(),
    speaker: 'Mark Rutte',
    valueX: 1,
    valueY: -1,
  };
  const edge2: Edge = {
    from: 3,
    to: 4,
    weight: 1,
    edgeValue: -1,
    id: 2,
    mapId: '23',
    mapDate: dayjs('2010-05-21').toISOString(),
    speaker: 'Mark Rutte',
    valueX: -1,
    valueY: 1,
  };
  const edge3: Edge = {
    from: 4,
    to: 5,
    weight: 1,
    edgeValue: -1,
    id: 3,
    mapId: '24',
    mapDate: dayjs('2010-05-22').toISOString(),
    speaker: 'Mark Rutte',
    valueX: 1,
    valueY: 1,
  };
  const edge4: Edge = {
    from: 2,
    to: 4,
    weight: 1,
    edgeValue: 1,
    id: 4,
    mapId: '25',
    mapDate: dayjs('2010-05-23').toISOString(),
    speaker: 'Mark Rutte',
    valueX: 1,
    valueY: 1,
  };
  const edgeArray: Array<Edge> = [edge1, edge2, edge3, edge4];

  return { edges: edgeArray, nodes: nodeArray };
}

/**
 * Generates testing partial edges
 * @returns Not hydrated edges
 */
export function generateTestingPartialEdges() {
  // Construct edges
  const edge1: Partial<Edge> = {
    fromName: 'z',
    toName: 'y',
    edgeValue: 1,
  };
  const edge2: Partial<Edge> = {
    fromName: 'y',
    toName: 't',
    edgeValue: -1,
  };
  const edge3: Partial<Edge> = {
    fromName: 't',
    toName: 's',
    edgeValue: -1,
  };
  const edge4: Partial<Edge> = {
    fromName: 'x',
    toName: 't',
    edgeValue: 1,
  };
  const edgeArray: Array<Partial<Edge>> = [edge1, edge2, edge3, edge4];

  const emptyDegrees = { all: 0, in: 0, out: 0 };
  const node1: Partial<Node> = {
    nodeName: 'z',
    evaluation: { inputValue: 0, value: 1 },
    degrees: structuredClone(emptyDegrees),
    weightedDegrees: structuredClone(emptyDegrees),
  };
  const node2: Partial<Node> = {
    nodeName: 'x',
    evaluation: { inputValue: 0, value: 1 },
    degrees: structuredClone(emptyDegrees),
    weightedDegrees: structuredClone(emptyDegrees),
  };
  const node3: Partial<Node> = {
    nodeName: 'y',
    int: 'Intergovermental',
    evaluation: { inputValue: 0, value: -1 },
    degrees: structuredClone(emptyDegrees),
    weightedDegrees: structuredClone(emptyDegrees),
  };
  const node4: Partial<Node> = {
    nodeName: 't',
    evaluation: { inputValue: 0, value: 1 },
    degrees: structuredClone(emptyDegrees),
    weightedDegrees: structuredClone(emptyDegrees),
  };
  const node5: Partial<Node> = {
    nodeName: 's',
    evaluation: { inputValue: 0, value: 1 },
    degrees: structuredClone(emptyDegrees),
    weightedDegrees: structuredClone(emptyDegrees),
  };

  const nodeArray = [node1, node2, node3, node4, node5];

  return { edges: edgeArray, nodes: nodeArray };
}
