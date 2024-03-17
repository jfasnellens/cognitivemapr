/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

import { setActivePinia, createPinia } from 'pinia';
import { describe, it, beforeEach, expect, assertType } from 'vitest';
import * as _ from 'lodash';
import {
  createTestingNodeEdgeArray,
  generateTestingPartialEdges,
} from './utils/scriptstore.testing.utils';
import { useScriptStore } from '#imports';
import type { Node, Edge, UUID } from '~/types/graph';

describe('Script Store - Build graph', () => {
  const testData = createTestingNodeEdgeArray();

  let cloned: {
    nodes: Array<Node>;
    edges: Array<Edge>;
  };

  beforeEach(() => {
    setActivePinia(createPinia());
    cloned = _.cloneDeep(testData);
  });

  it('Creates store', () => {
    const scriptStore = useScriptStore();
    expect(scriptStore).toBeDefined();
  });

  it('Defines graph', () => {
    const scriptStore = useScriptStore();
    const graph = scriptStore.buildGraph(cloned.edges, cloned.nodes);
    expect(graph).toBeDefined();
  });

  it('Contains all nodes in same order array', () => {
    const scriptStore = useScriptStore();
    const graph = scriptStore.buildGraph(cloned.edges, cloned.nodes);
    expect(
      graph.nodeArray.length === cloned.nodes.length,
      'NodeArray does not contain same number of nodes',
    );
    graph.nodeArray.forEach((node, index) => {
      expect(
        node === cloned.nodes[index],
        `${node} is not equal to ${cloned.nodes[index]}, order changed!`,
      );
    });
  });

  it('Contains all nodes in node Array', () => {
    const scriptStore = useScriptStore();
    const graph = scriptStore.buildGraph(cloned.edges, cloned.nodes);
    expect(
      Object.keys(graph.nodes).length === cloned.nodes.length,
      'Node Dictionary does not contain same number of nodes',
    );

    cloned.nodes.forEach((node) => {
      expect(graph.nodes[node.id] === node, `${node} is not in dictionairy! Missing nodes`);
    });
  });

  it('Node array and Node Dictionary are linked', () => {
    const scriptStore = useScriptStore();
    const graph = scriptStore.buildGraph(cloned.edges, cloned.nodes);
    expect(
      Object.keys(graph.nodes).length === graph.nodeArray.length,
      "Array and Dictionairy aren't same size",
    );

    graph.nodeArray.forEach((node) => {
      expect(graph.nodes[node.id] === node, `${node} is not in dictionairy! Missing nodes`);
    });

    graph.nodeArray[2].inputValue = -5;
    expect(graph.nodes[2].inputValue === -5);
  });
  // ------------ Edges ---------

  it('Contains all Edges in same order array', () => {
    const scriptStore = useScriptStore();
    const graph = scriptStore.buildGraph(cloned.edges, cloned.nodes);
    expect(
      graph.edgeArray.length === cloned.edges.length,
      'EdgeArray does not contain same number of nodes',
    );
    graph.edgeArray.forEach((edge, index) => {
      expect(
        edge === cloned.edges[index],
        `${edge} is not equal to ${cloned.edges[index]}, order changed!`,
      );
    });
  });

  it('Contains all edges in edge Array', () => {
    const scriptStore = useScriptStore();
    const graph = scriptStore.buildGraph(cloned.edges, cloned.nodes);
    expect(
      Object.keys(graph.edges).length === cloned.edges.length,
      'Node Dictionary does not contain same number of nodes',
    );

    cloned.edges.forEach((edge) => {
      expect(graph.edges[edge.id] === edge, `${edge} is not in dictionairy! Missing nodes`);
    });
  });

  it('Edge array and Edge Dictionary are linked', () => {
    const scriptStore = useScriptStore();
    const graph = scriptStore.buildGraph(cloned.edges, cloned.nodes);
    expect(
      Object.keys(graph.edges).length === graph.edgeArray.length,
      "Array and Dictionairy aren't same size",
    );

    graph.edgeArray.forEach((edge) => {
      expect(graph.edges[edge.id] === edge, `${edge} is not in dictionairy! Missing nodes`);
    });
    graph.edgeArray[2].edgeValue = -5;
    expect(graph.edges[2].edgeValue === -5);
  });

  it('Stores graph in store.', () => {
    const scriptStore = useScriptStore();
    const graph = scriptStore.buildGraph(cloned.edges, cloned.nodes);
    expect(scriptStore.getGraphs()[graph.id!]).toStrictEqual(graph);
  });

  // -------- Auto generation -----------
  it('Can auto generate nodes based on edges', () => {
    const scriptStore = useScriptStore();
    const { nodes, warnings } = scriptStore.generateNodesBasedOnEdges(cloned.edges);
    expect(nodes.length).toBeGreaterThan(0);
    expect(warnings.length).toBe(1);
  });

  it('Generates the correct nodes based on data given', () => {
    const scriptStore = useScriptStore();
    const { edges, nodes } = generateTestingPartialEdges();
    const expectedNames = nodes.map((node) => node.nodeName);
    const { nodes: genNodes, warnings } = scriptStore.generateNodesBasedOnEdges(edges);
    genNodes.forEach((genNode: Partial<Node>) => {
      expect(expectedNames.includes(genNode.nodeName), 'Node name not expected').toBe(true);
      expect(genNode.id, 'No Id assigned to generated node').toBeTruthy();
    });
    expect(warnings.length).toBe(1);
  });

  it('Generates graph with only edges', () => {
    const scriptStore = useScriptStore();
    const { edges } = generateTestingPartialEdges();
    const generatedGraph = scriptStore.buildGraph(edges);
    expect(generatedGraph).toBeTruthy();
    expect(generatedGraph.edgeArray.length).toBe(4);
    expect(generatedGraph.nodeArray.length).toBe(5);
  });

  it('Generates graph - Hydrates edge data', () => {
    const scriptStore = useScriptStore();
    const { edges } = generateTestingPartialEdges();
    const generatedGraph = scriptStore.buildGraph(edges);
    expect(generatedGraph).toBeTruthy();
    generatedGraph.edgeArray.forEach((edge) => {
      // @ts-expect-error This function has to test the type that it is the correct one of the 2 possible
      assertType<UUID>(edge.id); // Check if the generated ID is used
      expect(edge.from).toBeTruthy(); // Check if the edge from has been defined
      expect(edge.to).toBeTruthy();
      // @ts-expect-error This function has to test the type that it is the correct one of the 2 possible
      assertType<UUID>(edge.from); // Check if it has been defined correctly
      // @ts-expect-error This function has to test the type that it is the correct one of the 2 possible
      assertType<UUID>(edge.to);

      expect(generatedGraph.nodes[edge.from], 'From node exists').toBeTruthy();
      expect(generatedGraph.nodes[edge.to], 'To node exists').toBeTruthy();
    });
  });
});
