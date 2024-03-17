/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

import { setActivePinia, createPinia } from 'pinia';
import { describe, it, beforeEach, expect } from 'vitest';
import { createTestingNodeEdgeArray } from './utils/scriptstore.testing.utils';
import { useScriptStore } from '#imports';
import type { Node, Edge } from '~/types/graph';

describe('File Store', () => {
  const testData = createTestingNodeEdgeArray();
  let cloned: {
    nodes: Array<Node>;
    edges: Array<Edge>;
  };

  beforeEach(() => {
    setActivePinia(createPinia());
    cloned = structuredClone(testData);
  });
  it('Creates store', () => {
    const scriptStore = useScriptStore();
    expect(scriptStore).toBeDefined();
  });
  it('exactly 0 or 2 paradigm names', () => {
    const scriptStore = useScriptStore();
    const builtGraph = scriptStore.buildGraph(cloned.edges, cloned.nodes);
    scriptStore.paradigmSupport(builtGraph.id!);
    for (let i = 0; i < builtGraph.nodeArray.length; i++) {
      // paradigmSupport should either be undefined, or both paradigms should be available:
      if (builtGraph.nodeArray[i].paradigmSupport) {
        // if paradigmSupport is defined
        expect(builtGraph.nodeArray[i].paradigmSupport!.paradigmA).toBeDefined();
        expect(builtGraph.nodeArray[i].paradigmSupport!.paradigmB).toBeDefined();
      }
    }
  });
  it('paradigm names never equal', () => {
    const scriptStore = useScriptStore();
    const builtGraph = scriptStore.buildGraph(cloned.edges, cloned.nodes);
    scriptStore.paradigmSupport(builtGraph.id!);
    for (let i = 0; i < builtGraph.nodeArray.length; i++) {
      // paradigmSupport should only have unequal names

      if (builtGraph.nodeArray[i].paradigmSupport) {
        // if paradigmSupport is defined
        const namesAreEqual: boolean =
          builtGraph.nodeArray[i].paradigmSupport!.paradigmA ===
          builtGraph.nodeArray[i].paradigmSupport!.paradigmB;
        expect(namesAreEqual).toBe(false);
      }
    }
  });
  // ensure no negative paradigm values are generated
  it('No negative paradigm values', () => {
    const scriptStore = useScriptStore();
    const builtGraph = scriptStore.buildGraph(cloned.edges, cloned.nodes);
    scriptStore.paradigmSupport(builtGraph.id!);
    for (let i = 0; i < builtGraph.nodeArray.length; i++)
      if (builtGraph.nodeArray[i].paradigmSupport) {
        expect(builtGraph.nodeArray[i].paradigmSupport!.paradigmA.value).toBeGreaterThanOrEqual(0);
        expect(builtGraph.nodeArray[i].paradigmSupport!.paradigmB.value).toBeGreaterThanOrEqual(0);
      }
  });
  // ensure one of the two is always 0
  it('At least one paradigm value is always 0', () => {
    const scriptStore = useScriptStore();
    const builtGraph = scriptStore.buildGraph(cloned.edges, cloned.nodes);
    scriptStore.paradigmSupport(builtGraph.id!);
    for (let i = 0; i < builtGraph.nodeArray.length; i++)
      if (builtGraph.nodeArray[i].paradigmSupport) {
        expect(
          builtGraph.nodeArray[i].paradigmSupport!.paradigmA.value *
            builtGraph.nodeArray[i].paradigmSupport!.paradigmB.value,
        ).toBe(0);
      }
  });
  // a paradigm should have value 0 when
  it("Nonzero paradigm values are equal to the node's weighted degrees", () => {
    const scriptStore = useScriptStore();
    const builtGraph = scriptStore.buildGraph(cloned.edges, cloned.nodes);
    scriptStore.paradigmSupport(builtGraph.id!);
    for (let i = 0; i < builtGraph.nodeArray.length; i++)
      if (builtGraph.nodeArray[i].paradigmSupport) {
        if (builtGraph.nodeArray[i].paradigmSupport!.paradigmA.value !== 0) {
          expect(builtGraph.nodeArray[i].paradigmSupport!.paradigmA.value).toBe(
            builtGraph.nodeArray[i].degrees.all,
          );
        }
        if (builtGraph.nodeArray[i].paradigmSupport!.paradigmB.value !== 0) {
          expect(builtGraph.nodeArray[i].paradigmSupport!.paradigmB.value).toBe(
            builtGraph.nodeArray[i].degrees.all,
          );
        }
      }
  });

  it("Two 0-values only when there's no paradigm name", () => {
    const scriptStore = useScriptStore();
    const builtGraph = scriptStore.buildGraph(cloned.edges, cloned.nodes);
    scriptStore.paradigmSupport(builtGraph.id!);
    for (let i = 0; i < builtGraph.nodeArray.length; i++)
      if (builtGraph.nodeArray[i].paradigmSupport)
        if (
          builtGraph.nodeArray[i].paradigmSupport!.paradigmA.value === 0 && // if both paradigm values are 0
          builtGraph.nodeArray[i].paradigmSupport!.paradigmB.value === 0
        ) {
          expect(builtGraph.nodeArray[i].paradigm).toBeFalsy(); // then the node's paradigm should not be set
        }
  });

  it('Having no paradigm name always results in two 0-values', () => {
    const scriptStore = useScriptStore();
    const builtGraph = scriptStore.buildGraph(cloned.edges, cloned.nodes);
    scriptStore.paradigmSupport(builtGraph.id!);
    for (let i = 0; i < builtGraph.nodeArray.length; i++)
      if (builtGraph.nodeArray[i].paradigmSupport)
        if (!builtGraph.nodeArray[i].paradigm) {
          // if the paradigm value is not set
          expect(builtGraph.nodeArray[i].paradigmSupport!.paradigmA.value).toBe(0); // then both paradigm values are 0
          expect(builtGraph.nodeArray[i].paradigmSupport!.paradigmB.value).toBe(0);
        }
  });

  it('If a paradigm value is positive, it belongs to the correct paradigm name', () => {
    const scriptStore = useScriptStore();
    const builtGraph = scriptStore.buildGraph(cloned.edges, cloned.nodes);
    scriptStore.paradigmSupport(builtGraph.id!);
    for (let i = 0; i < builtGraph.nodeArray.length; i++) {
      if (builtGraph.nodeArray[i].paradigmSupport) {
        const positiveParadigm =
          builtGraph.nodeArray[i].paradigmSupport!.paradigmA.value > 0
            ? builtGraph.nodeArray[i].paradigmSupport!.paradigmA.name
            : builtGraph.nodeArray[i].paradigmSupport!.paradigmB.value > 0
              ? builtGraph.nodeArray[i].paradigmSupport!.paradigmB.name
              : undefined;

        const nodeParadigm = builtGraph.nodeArray[i].paradigm;

        if (positiveParadigm && nodeParadigm) {
          if (positiveParadigm === nodeParadigm) {
            expect(builtGraph.nodeArray[i].evaluation.value).toBe(1);
          } else {
            expect(builtGraph.nodeArray[i].evaluation.value).toBe(-1);
          }
        }
      }
    }
  });
});
