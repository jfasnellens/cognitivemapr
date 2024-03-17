/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

import { useDayjs } from 'dayjs-nuxt/dist/runtime/composables/dayjs';
import type { Node, Edge } from '~/types/graph';

const dayjs = useDayjs();
dayjs.locale('nl');

function emptyDegrees() {
  return { all: 0, in: 0, out: 0 };
}

export function graphA(): { nodes: Array<Node>; edges: Array<Edge> } {
  // Graph with separated nodes

  const node1: Node = {
    id: 1,
    nodeName: 'a',
    evaluation: { inputValue: 0 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node2: Node = {
    id: 2,
    nodeName: 'b',
    evaluation: { inputValue: 1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node3: Node = {
    id: 3,
    nodeName: 'c',
    evaluation: { inputValue: -1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const nodeArray = [node1, node2, node3];
  const edge1: Edge = {
    from: 1,
    to: 2,
    weight: 1,
    edgeValue: -1,
    id: 1,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edgeArray = [edge1];
  return { edges: edgeArray, nodes: nodeArray };
}

export function graphB(): { nodes: Array<Node>; edges: Array<Edge> } {
  // Graph with positive-positive link
  const node1: Node = {
    id: 1,
    nodeName: 'a',
    evaluation: { inputValue: 0 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node2: Node = {
    id: 2,
    nodeName: 'b',
    evaluation: { inputValue: 1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node3: Node = {
    id: 3,
    nodeName: 'c',
    evaluation: { inputValue: 1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const nodeArray = [node1, node2, node3];
  const edge1: Edge = {
    from: 1,
    to: 2,
    weight: 1,
    edgeValue: 1,
    id: 1,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edge2: Edge = {
    from: 1,
    to: 3,
    weight: 1,
    edgeValue: 1,
    id: 2,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edgeArray = [edge1, edge2];
  return { edges: edgeArray, nodes: nodeArray };
}

export function graphC(): { nodes: Array<Node>; edges: Array<Edge> } {
  // Graph with negative-positive link
  const node1: Node = {
    id: 1,
    nodeName: 'a',
    evaluation: { inputValue: 0 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node2: Node = {
    id: 2,
    nodeName: 'b',
    evaluation: { inputValue: 1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node3: Node = {
    id: 3,
    nodeName: 'c',
    evaluation: { inputValue: 1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const nodeArray = [node1, node2, node3];
  const edge1: Edge = {
    from: 1,
    to: 2,
    weight: 1,
    edgeValue: -1,
    id: 1,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edge2: Edge = {
    from: 1,
    to: 3,
    weight: 1,
    edgeValue: -1,
    id: 2,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edgeArray = [edge1, edge2];
  return { edges: edgeArray, nodes: nodeArray };
}

export function graphD(): { nodes: Array<Node>; edges: Array<Edge> } {
  // Graph with positive-negative link
  const node1: Node = {
    id: 1,
    nodeName: 'a',
    evaluation: { inputValue: 0 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node2: Node = {
    id: 2,
    nodeName: 'b',
    evaluation: { inputValue: -1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node3: Node = {
    id: 3,
    nodeName: 'c',
    evaluation: { inputValue: -1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const nodeArray = [node1, node2, node3];
  const edge1: Edge = {
    from: 1,
    to: 2,
    weight: 1,
    edgeValue: 1,
    id: 1,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edge2: Edge = {
    from: 1,
    to: 3,
    weight: 1,
    edgeValue: 1,
    id: 2,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edgeArray = [edge1, edge2];
  return { edges: edgeArray, nodes: nodeArray };
}

export function graphE(): { nodes: Array<Node>; edges: Array<Edge> } {
  // Graph with negative-negative link
  const node1: Node = {
    id: 1,
    nodeName: 'a',
    evaluation: { inputValue: 1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node2: Node = {
    id: 2,
    nodeName: 'b',
    evaluation: { inputValue: -1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node3: Node = {
    id: 3,
    nodeName: 'c',
    evaluation: { inputValue: -1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const nodeArray = [node1, node2, node3];
  const edge1: Edge = {
    from: 1,
    to: 2,
    weight: 1,
    edgeValue: -1,
    id: 1,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edge2: Edge = {
    from: 1,
    to: 3,
    weight: 1,
    edgeValue: -1,
    id: 2,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edgeArray = [edge1, edge2];
  return { edges: edgeArray, nodes: nodeArray };
}

export function graphF(): { nodes: Array<Node>; edges: Array<Edge> } {
  // Graph with neutral link
  const node1: Node = {
    id: 1,
    nodeName: 'a',
    evaluation: { inputValue: 1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node2: Node = {
    id: 2,
    nodeName: 'b',
    evaluation: { inputValue: 0 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node3: Node = {
    id: 3,
    nodeName: 'c',
    evaluation: { inputValue: -1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node4: Node = {
    id: 4,
    nodeName: 'd',
    evaluation: { inputValue: 0 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const nodeArray = [node1, node2, node3, node4];
  const edge1: Edge = {
    from: 1,
    to: 2,
    weight: 1,
    edgeValue: 1,
    id: 1,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edge2: Edge = {
    from: 1,
    to: 3,
    weight: 1,
    edgeValue: 1,
    id: 2,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edge3: Edge = {
    from: 3,
    to: 4,
    weight: 1,
    edgeValue: 1,
    id: 3,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edgeArray = [edge1, edge2, edge3];
  return { edges: edgeArray, nodes: nodeArray };
}

export function graphG(): { nodes: Array<Node>; edges: Array<Edge> } {
  // Graph with balanced link
  const node1: Node = {
    id: 1,
    nodeName: 'a',
    evaluation: { inputValue: -1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node2: Node = {
    id: 2,
    nodeName: 'b',
    evaluation: { inputValue: 1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node3: Node = {
    id: 3,
    nodeName: 'c',
    evaluation: { inputValue: -1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const nodeArray = [node1, node2, node3];
  const edge1: Edge = {
    from: 1,
    to: 2,
    weight: 1,
    edgeValue: 1,
    id: 1,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edge2: Edge = {
    from: 1,
    to: 3,
    weight: 1,
    edgeValue: 1,
    id: 2,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edgeArray = [edge1, edge2];
  return { edges: edgeArray, nodes: nodeArray };
}

export function graphH(): { nodes: Array<Node>; edges: Array<Edge> } {
  // Graph with a stable cycle, as well as user values
  const node1: Node = {
    id: 1,
    nodeName: 'a',
    evaluation: { inputValue: 0, pickedValue: 1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node2: Node = {
    id: 2,
    nodeName: 'b',
    evaluation: { inputValue: 1, pickedValue: -1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node3: Node = {
    id: 3,
    nodeName: 'c',
    evaluation: { inputValue: -1, pickedValue: 0 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node4: Node = {
    id: 4,
    nodeName: 'd',
    evaluation: { inputValue: -1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const nodeArray = [node1, node2, node3, node4];
  const edge1: Edge = {
    from: 1,
    to: 2,
    weight: 1,
    edgeValue: 1,
    id: 1,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edge2: Edge = {
    from: 2,
    to: 3,
    weight: 1,
    edgeValue: 1,
    id: 2,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edge3: Edge = {
    from: 3,
    to: 1,
    weight: 1,
    edgeValue: 1,
    id: 3,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edge4: Edge = {
    from: 3,
    to: 4,
    weight: 1,
    edgeValue: -1,
    id: 4,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edgeArray = [edge1, edge2, edge3, edge4];
  return { edges: edgeArray, nodes: nodeArray };
}

export function graphI(): { nodes: Array<Node>; edges: Array<Edge> } {
  //
  const node1: Node = {
    id: 1,
    nodeName: 'a',
    evaluation: { inputValue: 1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node2: Node = {
    id: 2,
    nodeName: 'b',
    evaluation: { inputValue: -1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node3: Node = {
    id: 3,
    nodeName: 'c',
    evaluation: { inputValue: 0 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const nodeArray = [node1, node2, node3];
  const edge1: Edge = {
    from: 1,
    to: 2,
    weight: 1,
    edgeValue: 1,
    id: 1,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edge2: Edge = {
    from: 2,
    to: 3,
    weight: 1,
    edgeValue: 1,
    id: 2,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edgeArray = [edge1, edge2];
  return { edges: edgeArray, nodes: nodeArray };
}

export function graphJ(): { nodes: Array<Node>; edges: Array<Edge> } {
  // A slightly larger graph, including some paradigm, instr, int values, edge values
  const node1: Node = {
    id: 1,
    nodeName: 'a',
    evaluation: { inputValue: -1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
    paradigm: 'example paradigm',
    instr: { name: 'e.g. instr' },
    int: 'this is an int',
  };
  const node2: Node = {
    id: 2,
    nodeName: 'b',
    evaluation: { inputValue: -1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node3: Node = {
    id: 3,
    nodeName: 'c',
    evaluation: { inputValue: 0 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
    paradigm: 'other paradigm',
    instr: { name: 'e.g. instr' },
    int: 'this is also an int',
  };
  const node4: Node = {
    id: 4,
    nodeName: 'd',
    evaluation: { inputValue: 1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node5: Node = {
    id: 5,
    nodeName: 'e',
    evaluation: { inputValue: 0 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
    paradigm: 'example paradigm',
    int: 'this is also an int',
  };
  const node6: Node = {
    id: 6,
    nodeName: 'f',
    evaluation: { inputValue: -1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const nodeArray = [node1, node2, node3, node4, node5, node6];
  const edge1: Edge = {
    from: 1,
    to: 2,
    weight: 1,
    edgeValue: -1,
    id: 1,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edge2: Edge = {
    from: 2,
    to: 6,
    weight: 1,
    edgeValue: -1,
    id: 2,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edge3: Edge = {
    from: 3,
    to: 2,
    weight: 1,
    edgeValue: -1,
    id: 3,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edge4: Edge = {
    from: 5,
    to: 4,
    weight: 1,
    edgeValue: -1,
    id: 4,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 1,
    valueY: 2,
  };
  const edge5: Edge = {
    from: 4,
    to: 2,
    weight: 1,
    edgeValue: 1,
    id: 5,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edgeArray = [edge1, edge2, edge3, edge4, edge5];
  return { edges: edgeArray, nodes: nodeArray };
}

export function graphK(): { nodes: Array<Node>; edges: Array<Edge> } {
  // Graph with double edge
  const node1: Node = {
    id: 1,
    nodeName: 'a',
    evaluation: { inputValue: 0 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node2: Node = {
    id: 2,
    nodeName: 'b',
    evaluation: { inputValue: 1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node3: Node = {
    id: 3,
    nodeName: 'c',
    evaluation: { inputValue: -1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node4: Node = {
    id: 4,
    nodeName: 'd',
    evaluation: { inputValue: 1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const nodeArray = [node1, node2, node3, node4];
  const edge1: Edge = {
    from: 1,
    to: 2,
    weight: 1,
    edgeValue: -1,
    id: 1,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edge2: Edge = {
    from: 2,
    to: 3,
    weight: 1,
    edgeValue: 1,
    id: 2,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edge3: Edge = {
    from: 2,
    to: 3,
    weight: 1,
    edgeValue: 1,
    id: 3,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edge4: Edge = {
    from: 3,
    to: 4,
    weight: 1,
    edgeValue: -1,
    id: 4,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edgeArray = [edge1, edge2, edge3, edge4];
  return { edges: edgeArray, nodes: nodeArray };
}

export function graphM(): { nodes: Array<Node>; edges: Array<Edge> } {
  // A graph with two speakers, each having multiple edges
  const node1: Node = {
    id: 1,
    nodeName: 'a',
    evaluation: { inputValue: -1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
    paradigm: 'example paradigm',
    instr: { name: 'e.g. instr' },
    int: 'this is an int',
  };
  const node2: Node = {
    id: 2,
    nodeName: 'b',
    evaluation: { inputValue: -1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node3: Node = {
    id: 3,
    nodeName: 'c',
    evaluation: { inputValue: 0 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
    paradigm: 'other paradigm',
    instr: { name: 'e.g. instr' },
    int: 'this is also an int',
  };
  const node4: Node = {
    id: 4,
    nodeName: 'd',
    evaluation: { inputValue: 1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node5: Node = {
    id: 5,
    nodeName: 'e',
    evaluation: { inputValue: 0 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
    paradigm: 'example paradigm',
    int: 'this is also an int',
  };
  const node6: Node = {
    id: 6,
    nodeName: 'f',
    evaluation: { inputValue: -1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node7: Node = {
    id: 7,
    nodeName: 'g',
    evaluation: { inputValue: 1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const nodeArray = [node1, node2, node3, node4, node5, node6, node7];
  const edge1: Edge = {
    from: 1,
    to: 2,
    weight: 1,
    edgeValue: -2,
    id: 1,
    mapId: '39',
    mapDate: dayjs('02-06-1985', 'DD-MM-YYYY').toISOString(),
    speaker: 'Anshella Merkoll',
    valueX: 0,
    valueY: 0,
  };
  const edge2: Edge = {
    from: 2,
    to: 6,
    weight: 1,
    edgeValue: -2,
    id: 2,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edge3: Edge = {
    from: 3,
    to: 2,
    weight: 1,
    edgeValue: -2,
    id: 3,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edge4: Edge = {
    from: 5,
    to: 4,
    weight: 1,
    edgeValue: -2,
    id: 4,
    mapId: '39',
    mapDate: dayjs('02-06-1985', 'DD-MM-YYYY').toISOString(),
    speaker: 'Anshella Merkoll',
    valueX: 1,
    valueY: 2,
  };
  const edge5: Edge = {
    from: 4,
    to: 2,
    weight: 1,
    edgeValue: 1,
    id: 5,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edge6: Edge = {
    from: 5,
    to: 6,
    weight: 1,
    edgeValue: 1,
    id: 6,
    mapId: '39',
    mapDate: dayjs('02-06-1985', 'DD-MM-YYYY').toISOString(),
    speaker: 'Anshella Merkoll',
    valueX: 0,
    valueY: 0,
  };
  const edge7: Edge = {
    from: 4,
    to: 2,
    weight: 1,
    edgeValue: -1,
    id: 7,
    mapId: '39',
    mapDate: dayjs('02-06-1985', 'DD-MM-YYYY').toISOString(),
    speaker: 'Anshella Merkoll',
    valueX: 0,
    valueY: 0,
  };
  const edge8: Edge = {
    from: 6,
    to: 7,
    weight: 1,
    edgeValue: 1,
    id: 8,
    mapId: '39',
    mapDate: dayjs('02-06-1985', 'DD-MM-YYYY').toISOString(),
    speaker: 'Anshella Merkoll',
    valueX: 0,
    valueY: 0,
  };
  const edgeArray = [edge1, edge2, edge3, edge4, edge5, edge6, edge7, edge8];
  return { edges: edgeArray, nodes: nodeArray };
}

export function graphN(): { nodes: Array<Node>; edges: Array<Edge> } {
  // A graph with two speakers, designed to become disconnected when filtered
  const node1: Node = {
    id: 1,
    nodeName: 'a',
    evaluation: { inputValue: -1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
    paradigm: 'example paradigm',
    instr: { name: 'e.g. instr' },
    int: 'this is an int',
  };
  const node2: Node = {
    id: 2,
    nodeName: 'b',
    evaluation: { inputValue: -1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node3: Node = {
    id: 3,
    nodeName: 'c',
    evaluation: { inputValue: 0 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
    paradigm: 'other paradigm',
    instr: { name: 'e.g. instr' },
    int: 'this is also an int',
  };
  const node4: Node = {
    id: 4,
    nodeName: 'd',
    evaluation: { inputValue: 1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const nodeArray = [node1, node2, node3, node4];
  const edge1: Edge = {
    from: 1,
    to: 2,
    weight: 1,
    edgeValue: -2,
    id: 1,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edge2: Edge = {
    from: 2,
    to: 3,
    weight: 1,
    edgeValue: -2,
    id: 2,
    mapId: '39',
    mapDate: dayjs('02-06-1985', 'DD-MM-YYYY').toISOString(),
    speaker: 'Anshella Merkoll',
    valueX: 0,
    valueY: 0,
  };
  const edge3: Edge = {
    from: 3,
    to: 4,
    weight: 1,
    edgeValue: 1,
    id: 3,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edgeArray = [edge1, edge2, edge3];
  return { edges: edgeArray, nodes: nodeArray };
}

export function graphO(): { nodes: Array<Node>; edges: Array<Edge> } {
  // Graph with an unstable cycle and with userValues
  const node1: Node = {
    id: 1,
    nodeName: 'a',
    evaluation: { inputValue: 1, pickedValue: 0 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node2: Node = {
    id: 2,
    nodeName: 'b',
    evaluation: { inputValue: -1, pickedValue: -1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node3: Node = {
    id: 3,
    nodeName: 'c',
    evaluation: { inputValue: 1, pickedValue: 1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node4: Node = {
    id: 4,
    nodeName: 'd',
    evaluation: { inputValue: 1, pickedValue: -1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const nodeArray = [node1, node2, node3, node4];
  const edge1: Edge = {
    from: 2,
    to: 1,
    weight: 1,
    edgeValue: 1,
    id: 1,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edge2: Edge = {
    from: 3,
    to: 2,
    weight: 1,
    edgeValue: 1,
    id: 2,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edge3: Edge = {
    from: 1,
    to: 3,
    weight: 1,
    edgeValue: -1,
    id: 3,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edge4: Edge = {
    from: 2,
    to: 4,
    weight: 1,
    edgeValue: 1,
    id: 4,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edgeArray = [edge1, edge2, edge3, edge4];
  return { edges: edgeArray, nodes: nodeArray };
}

export function graphP(): { nodes: Array<Node>; edges: Array<Edge> } {
  // Graph with an unstable cycle and no userValues
  const node1: Node = {
    id: 1,
    nodeName: 'a',
    evaluation: { inputValue: 1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node2: Node = {
    id: 2,
    nodeName: 'b',
    evaluation: { inputValue: 1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node3: Node = {
    id: 3,
    nodeName: 'c',
    evaluation: { inputValue: 1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node4: Node = {
    id: 4,
    nodeName: 'd',
    evaluation: { inputValue: 1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const nodeArray = [node1, node2, node3, node4];
  const edge1: Edge = {
    from: 1,
    to: 2,
    weight: 1,
    edgeValue: -1,
    id: 1,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edge2: Edge = {
    from: 2,
    to: 3,
    weight: 1,
    edgeValue: 1,
    id: 2,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edge3: Edge = {
    from: 3,
    to: 1,
    weight: 1,
    edgeValue: 1,
    id: 3,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edge4: Edge = {
    from: 3,
    to: 4,
    weight: 1,
    edgeValue: 1,
    id: 4,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edgeArray = [edge1, edge2, edge3, edge4];
  return { edges: edgeArray, nodes: nodeArray };
}

export function graphQ(): { nodes: Array<Node>; edges: Array<Edge> } {
  // Graph with an unstable cycle and with part of the userValues
  const node1: Node = {
    id: 1,
    nodeName: 'a',
    evaluation: { inputValue: 1, pickedValue: 0 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node2: Node = {
    id: 2,
    nodeName: 'b',
    evaluation: { inputValue: 1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node3: Node = {
    id: 3,
    nodeName: 'c',
    evaluation: { inputValue: 1, pickedValue: -1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node4: Node = {
    id: 4,
    nodeName: 'd',
    evaluation: { inputValue: 1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const nodeArray = [node1, node2, node3, node4];
  const edge1: Edge = {
    from: 1,
    to: 2,
    weight: 1,
    edgeValue: -1,
    id: 1,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edge2: Edge = {
    from: 2,
    to: 3,
    weight: 1,
    edgeValue: 1,
    id: 2,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edge3: Edge = {
    from: 3,
    to: 1,
    weight: 1,
    edgeValue: 1,
    id: 3,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edge4: Edge = {
    from: 3,
    to: 4,
    weight: 1,
    edgeValue: 1,
    id: 4,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edgeArray = [edge1, edge2, edge3, edge4];
  return { edges: edgeArray, nodes: nodeArray };
}

export function graphR(): { nodes: Array<Node>; edges: Array<Edge> } {
  // Graph with a stable cycle and no user values
  const node1: Node = {
    id: 1,
    nodeName: 'a',
    evaluation: { inputValue: 0 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node2: Node = {
    id: 2,
    nodeName: 'b',
    evaluation: { inputValue: 1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node3: Node = {
    id: 3,
    nodeName: 'c',
    evaluation: { inputValue: -1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node4: Node = {
    id: 4,
    nodeName: 'd',
    evaluation: { inputValue: -1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const nodeArray = [node1, node2, node3, node4];
  const edge1: Edge = {
    from: 1,
    to: 2,
    weight: 1,
    edgeValue: 1,
    id: 1,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edge2: Edge = {
    from: 2,
    to: 3,
    weight: 1,
    edgeValue: 1,
    id: 2,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edge3: Edge = {
    from: 3,
    to: 1,
    weight: 1,
    edgeValue: 1,
    id: 3,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edge4: Edge = {
    from: 3,
    to: 4,
    weight: 1,
    edgeValue: -1,
    id: 4,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edgeArray = [edge1, edge2, edge3, edge4];
  return { edges: edgeArray, nodes: nodeArray };
}

export function graphS(): { nodes: Array<Node>; edges: Array<Edge> } {
  // Graph with a stable cycle that requires more than one iteration to stabilize
  const node1: Node = {
    id: 1,
    nodeName: 'a',
    evaluation: { inputValue: 0 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node2: Node = {
    id: 2,
    nodeName: 'b',
    evaluation: { inputValue: 1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node3: Node = {
    id: 3,
    nodeName: 'c',
    evaluation: { inputValue: 1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node4: Node = {
    id: 4,
    nodeName: 'd',
    evaluation: { inputValue: 0 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node5: Node = {
    id: 5,
    nodeName: 'e',
    evaluation: { inputValue: -1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const nodeArray = [node1, node2, node3, node4, node5];
  const edge1: Edge = {
    from: 2,
    to: 1,
    weight: 1,
    edgeValue: 1,
    id: 1,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edge2: Edge = {
    from: 3,
    to: 2,
    weight: 1,
    edgeValue: 1,
    id: 2,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edge3: Edge = {
    from: 4,
    to: 3,
    weight: 1,
    edgeValue: 1,
    id: 3,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edge4: Edge = {
    from: 1,
    to: 4,
    weight: 1,
    edgeValue: 1,
    id: 4,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edge5: Edge = {
    from: 4,
    to: 5,
    weight: 1,
    edgeValue: 1,
    id: 5,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edgeArray = [edge1, edge2, edge3, edge4, edge5];
  return { edges: edgeArray, nodes: nodeArray };
}

export function graphT(): { nodes: Array<Node>; edges: Array<Edge> } {
  // Graph with two cycles that overlap on a single node
  const node1: Node = {
    id: 1,
    nodeName: 'a',
    evaluation: { inputValue: 0 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node2: Node = {
    id: 2,
    nodeName: 'b',
    evaluation: { inputValue: 1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node3: Node = {
    id: 3,
    nodeName: 'c',
    evaluation: { inputValue: 1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node4: Node = {
    id: 4,
    nodeName: 'd',
    evaluation: { inputValue: 0 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node5: Node = {
    id: 5,
    nodeName: 'e',
    evaluation: { inputValue: -1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node6: Node = {
    id: 6,
    nodeName: 'f',
    evaluation: { inputValue: 1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const nodeArray = [node1, node2, node3, node4, node5, node6];
  const edge1: Edge = {
    from: 1,
    to: 2,
    weight: 1,
    edgeValue: 1,
    id: 1,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edge2: Edge = {
    from: 2,
    to: 3,
    weight: 1,
    edgeValue: 1,
    id: 2,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edge3: Edge = {
    from: 3,
    to: 1,
    weight: 1,
    edgeValue: 1,
    id: 3,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edge4: Edge = {
    from: 3,
    to: 4,
    weight: 1,
    edgeValue: 1,
    id: 4,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edge5: Edge = {
    from: 4,
    to: 5,
    weight: 1,
    edgeValue: 1,
    id: 5,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edge6: Edge = {
    from: 5,
    to: 3,
    weight: 1,
    edgeValue: 1,
    id: 6,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edge7: Edge = {
    from: 5,
    to: 6,
    weight: 1,
    edgeValue: -1,
    id: 7,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edgeArray = [edge1, edge2, edge3, edge4, edge5, edge6, edge7];
  return { edges: edgeArray, nodes: nodeArray };
}

export function graphU(): { nodes: Array<Node>; edges: Array<Edge> } {
  // Graph with two cycles that overlap on a single edge
  const node1: Node = {
    id: 1,
    nodeName: 'a',
    evaluation: { inputValue: 0 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node2: Node = {
    id: 2,
    nodeName: 'b',
    evaluation: { inputValue: 1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node3: Node = {
    id: 3,
    nodeName: 'c',
    evaluation: { inputValue: 1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node4: Node = {
    id: 4,
    nodeName: 'd',
    evaluation: { inputValue: 0 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node5: Node = {
    id: 5,
    nodeName: 'e',
    evaluation: { inputValue: -1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const nodeArray = [node1, node2, node3, node4, node5];
  const edge1: Edge = {
    from: 1,
    to: 2,
    weight: 1,
    edgeValue: 1,
    id: 1,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edge2: Edge = {
    from: 2,
    to: 3,
    weight: 1,
    edgeValue: 1,
    id: 2,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edge3: Edge = {
    from: 3,
    to: 1,
    weight: 1,
    edgeValue: 1,
    id: 3,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edge4: Edge = {
    from: 3,
    to: 4,
    weight: 1,
    edgeValue: 1,
    id: 4,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edge5: Edge = {
    from: 4,
    to: 2,
    weight: 1,
    edgeValue: 1,
    id: 5,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edge6: Edge = {
    from: 4,
    to: 5,
    weight: 1,
    edgeValue: -1,
    id: 6,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edgeArray = [edge1, edge2, edge3, edge4, edge5, edge6];
  return { edges: edgeArray, nodes: nodeArray };
}

export function graphV(): { nodes: Array<Node>; edges: Array<Edge> } {
  // Graph with two disconnected cycles
  const node1: Node = {
    id: 1,
    nodeName: 'a',
    evaluation: { inputValue: 0 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node2: Node = {
    id: 2,
    nodeName: 'b',
    evaluation: { inputValue: 1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node3: Node = {
    id: 3,
    nodeName: 'c',
    evaluation: { inputValue: 1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node4: Node = {
    id: 4,
    nodeName: 'd',
    evaluation: { inputValue: 0 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node5: Node = {
    id: 5,
    nodeName: 'e',
    evaluation: { inputValue: -1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node6: Node = {
    id: 6,
    nodeName: 'f',
    evaluation: { inputValue: 1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node7: Node = {
    id: 7,
    nodeName: 'g',
    evaluation: { inputValue: 1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node8: Node = {
    id: 8,
    nodeName: 'h',
    evaluation: { inputValue: -1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const nodeArray = [node1, node2, node3, node4, node5, node6, node7, node8];
  const edge1: Edge = {
    from: 1,
    to: 2,
    weight: 1,
    edgeValue: 1,
    id: 1,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edge2: Edge = {
    from: 2,
    to: 3,
    weight: 1,
    edgeValue: 1,
    id: 2,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edge3: Edge = {
    from: 3,
    to: 1,
    weight: 1,
    edgeValue: 1,
    id: 3,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edge4: Edge = {
    from: 3,
    to: 4,
    weight: 1,
    edgeValue: -1,
    id: 4,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edge5: Edge = {
    from: 4,
    to: 5,
    weight: 1,
    edgeValue: 1,
    id: 5,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edge6: Edge = {
    from: 5,
    to: 6,
    weight: 1,
    edgeValue: 1,
    id: 6,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edge7: Edge = {
    from: 6,
    to: 7,
    weight: 1,
    edgeValue: 1,
    id: 7,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edge8: Edge = {
    from: 7,
    to: 5,
    weight: 1,
    edgeValue: 1,
    id: 8,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edge9: Edge = {
    from: 7,
    to: 8,
    weight: 1,
    edgeValue: -1,
    id: 8,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edgeArray = [edge1, edge2, edge3, edge4, edge5, edge6, edge7, edge8, edge9];
  return { edges: edgeArray, nodes: nodeArray };
}

export function graphW(): { nodes: Array<Node>; edges: Array<Edge> } {
  // Graph with two disconnected cycles, of which the one on which the other cycle depends is an unstable cycle with user values
  const node1: Node = {
    id: 1,
    nodeName: 'a',
    evaluation: { inputValue: 0 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node2: Node = {
    id: 2,
    nodeName: 'b',
    evaluation: { inputValue: 1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node3: Node = {
    id: 3,
    nodeName: 'c',
    evaluation: { inputValue: 1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node4: Node = {
    id: 4,
    nodeName: 'd',
    evaluation: { inputValue: 0 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node5: Node = {
    id: 5,
    nodeName: 'e',
    evaluation: { inputValue: -1, pickedValue: -1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node6: Node = {
    id: 6,
    nodeName: 'f',
    evaluation: { inputValue: 1, pickedValue: 0 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node7: Node = {
    id: 7,
    nodeName: 'g',
    evaluation: { inputValue: 1, pickedValue: 1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node8: Node = {
    id: 8,
    nodeName: 'h',
    evaluation: { inputValue: 1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const nodeArray = [node1, node2, node3, node4, node5, node6, node7, node8];
  const edge1: Edge = {
    from: 1,
    to: 2,
    weight: 1,
    edgeValue: 1,
    id: 1,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edge2: Edge = {
    from: 2,
    to: 3,
    weight: 1,
    edgeValue: 1,
    id: 2,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edge3: Edge = {
    from: 3,
    to: 1,
    weight: 1,
    edgeValue: 1,
    id: 3,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edge4: Edge = {
    from: 3,
    to: 4,
    weight: 1,
    edgeValue: -1,
    id: 4,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edge5: Edge = {
    from: 4,
    to: 5,
    weight: 1,
    edgeValue: 1,
    id: 5,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edge6: Edge = {
    from: 6,
    to: 5,
    weight: 1,
    edgeValue: -1,
    id: 6,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edge7: Edge = {
    from: 7,
    to: 6,
    weight: 1,
    edgeValue: 1,
    id: 7,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edge8: Edge = {
    from: 5,
    to: 7,
    weight: 1,
    edgeValue: 1,
    id: 8,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edge9: Edge = {
    from: 7,
    to: 8,
    weight: 1,
    edgeValue: 1,
    id: 9,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edgeArray = [edge1, edge2, edge3, edge4, edge5, edge6, edge7, edge8, edge9];
  return { edges: edgeArray, nodes: nodeArray };
}

export function graphX(): { nodes: Array<Node>; edges: Array<Edge> } {
  // Graph with weights that impact values

  const node1: Node = {
    id: 1,
    nodeName: 'a',
    evaluation: { inputValue: 0 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node2: Node = {
    id: 2,
    nodeName: 'b',
    evaluation: { inputValue: 1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const node3: Node = {
    id: 3,
    nodeName: 'c',
    evaluation: { inputValue: -1 },
    degrees: structuredClone(emptyDegrees()),
    weightedDegrees: structuredClone(emptyDegrees()),
  };
  const nodeArray = [node1, node2, node3];
  const edge1: Edge = {
    from: 1,
    to: 2,
    weight: 1,
    edgeValue: -1,
    id: 1,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edge2: Edge = {
    from: 1,
    to: 3,
    weight: 2,
    edgeValue: -1,
    id: 1,
    mapId: '28',
    mapDate: dayjs('01-04-1987', 'DD-MM-YYYY').toISOString(),
    speaker: 'Marck Rötte',
    valueX: 0,
    valueY: 0,
  };
  const edgeArray = [edge1, edge2];
  return { edges: edgeArray, nodes: nodeArray };
}
