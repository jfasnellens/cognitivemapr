/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

/* eslint-disable require-await */
import { setActivePinia, createPinia } from 'pinia';
import { describe, expect, it } from 'vitest';
import _ from 'lodash';
import { createTestingNodeEdgeArray } from './utils/scriptstore.testing.utils';
import { useScriptStore } from '#imports';
import type { Node, Edge } from '~/types/graph';

describe.concurrent('Instrument Support', () => {
  const testData = createTestingNodeEdgeArray();
  let cloned: {
    nodes: Array<Node>;
    edges: Array<Edge>;
  };

  it('Function exists', async ({ expect }) => {
    setupTestScope();
    const scriptStore = useScriptStore();
    expect(scriptStore.instrumentSupport).toBeDefined();
  });

  it('Does not change amount of nodes', async ({ expect }) => {
    setupTestScope();
    const scriptStore = useScriptStore();
    const graph = scriptStore.buildGraph(cloned.edges, cloned.nodes);
    const amountOfNodesBefore = graph.nodeArray.length;
    const updatedGraph = scriptStore.instrumentSupport(graph.id!);
    expect(updatedGraph.nodeArray.length).toBe(amountOfNodesBefore);
  });

  it('Handles instrumentless nodes', async ({ expect }) => {
    setupTestScope();
    const scriptStore = useScriptStore();
    const graph = scriptStore.buildGraph(cloned.edges, cloned.nodes);
    const updatedGraph = scriptStore.instrumentSupport(graph.id!);
    expect(updatedGraph.nodes[2].instr).toBeUndefined();
    expect(updatedGraph.nodes[4].instr).toBeUndefined();
  });

  it('Handles instrument nodes', async ({ expect }) => {
    setupTestScope();
    const scriptStore = useScriptStore();
    const graph = scriptStore.buildGraph(cloned.edges, cloned.nodes);
    const updatedGraph = scriptStore.instrumentSupport(graph.id!);
    expect(updatedGraph.nodes[1].instr).toStrictEqual({ name: 'Supernational', value: 1 });
    expect(
      updatedGraph.nodes[3].instr,
      'Error in negative value or degree handling.',
    ).toStrictEqual({ name: 'Intergovermental', value: -2 });
    expect(updatedGraph.nodes[5].instr).toStrictEqual({ name: 'Supernational', value: 1 });
  });

  it('Throws script error if evaluate concept has not ran', () => {
    setupTestScope();
    cloned.nodes = cloned.nodes.map((node) => {
      const _newNode = _.cloneDeep(node);
      _newNode.evaluation.value = undefined;
      return _newNode;
    });
    const scriptStore = useScriptStore();
    const graph = scriptStore.buildGraph(cloned.edges, cloned.nodes);
    expect(() => scriptStore.instrumentSupport(graph.id!)).toThrowError();
  });

  function setupTestScope() {
    setActivePinia(createPinia());
    cloned = structuredClone(testData);
  }
});
