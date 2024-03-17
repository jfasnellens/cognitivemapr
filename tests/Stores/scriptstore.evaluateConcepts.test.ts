/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

import { setActivePinia, createPinia } from 'pinia';
import { describe, it, beforeEach, expect } from 'vitest';
import * as graphutils from './utils/scriptstore.evaluateConcepts.testing.utils';
import { useScriptStore } from '#imports';

describe('Script Store - Evaluate Concepts', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('Creates store', () => {
    const scriptStore = useScriptStore();
    expect(scriptStore).toBeDefined();
  });

  it('Separated nodes retain their value', () => {
    // They currently should not appear in any graph, but you never know what the user inputs or what changes in the future
    const scriptStore = useScriptStore();

    const graph = graphutils.graphA(); // Graph with separated nodes
    const builtGraph = scriptStore.buildGraph(graph.edges, graph.nodes);
    const evaluatedGraph = scriptStore.evaluateConcepts(builtGraph.id!);

    expect(evaluatedGraph.nodes[3].evaluation.value).toBe(-1);
  });

  it('Nodes with no outgoing edges keep their own value', () => {
    const scriptStore = useScriptStore();

    const graph = graphutils.graphB();
    const builtGraph = scriptStore.buildGraph(graph.edges, graph.nodes);
    const evaluatedGraph = scriptStore.evaluateConcepts(builtGraph.id!);

    expect(evaluatedGraph.nodes[3].evaluation.value).toBe(1);
  });

  it('Positive influence on positive values means positive value', () => {
    const scriptStore = useScriptStore();

    const graph = graphutils.graphB(); // Graph with positive-positive link
    const builtGraph = scriptStore.buildGraph(graph.edges, graph.nodes);
    const evaluatedGraph = scriptStore.evaluateConcepts(builtGraph.id!);

    expect(evaluatedGraph.nodes[1].evaluation.value).toBe(1);
  });

  it('Negative influence on positive values means negative value', () => {
    const scriptStore = useScriptStore();

    const graph = graphutils.graphC(); // Graph with negative-positive link
    const builtGraph = scriptStore.buildGraph(graph.edges, graph.nodes);
    const evaluatedGraph = scriptStore.evaluateConcepts(builtGraph.id!);

    expect(evaluatedGraph.nodes[1].evaluation.value).toBe(-1);
  });

  it('Positive influence on negative values means negative value', () => {
    const scriptStore = useScriptStore();

    const graph = graphutils.graphD(); // Graph with positive-negative link
    const builtGraph = scriptStore.buildGraph(graph.edges, graph.nodes);
    const evaluatedGraph = scriptStore.evaluateConcepts(builtGraph.id!);

    expect(evaluatedGraph.nodes[1].evaluation.value).toBe(-1);
  });

  it('Negative influence on negative values means positive value', () => {
    const scriptStore = useScriptStore();

    const graph = graphutils.graphE(); // Graph with negative-negative link
    const builtGraph = scriptStore.buildGraph(graph.edges, graph.nodes);
    const evaluatedGraph = scriptStore.evaluateConcepts(builtGraph.id!);

    expect(evaluatedGraph.nodes[1].evaluation.value).toBe(1);
  });

  it('Influence on neutral values means neutral value', () => {
    const scriptStore = useScriptStore();

    const graph = graphutils.graphF(); // Graph with neutral links
    const builtGraph = scriptStore.buildGraph(graph.edges, graph.nodes);
    const evaluatedGraph = scriptStore.evaluateConcepts(builtGraph.id!);

    expect(evaluatedGraph.nodes[4].evaluation.value).toBe(0);
  });

  it('Influence on balanced values means neutral value', () => {
    const scriptStore = useScriptStore();

    const graph = graphutils.graphG(); // Graph with balanced links
    const builtGraph = scriptStore.buildGraph(graph.edges, graph.nodes);
    const evaluatedGraph = scriptStore.evaluateConcepts(builtGraph.id!);

    expect(evaluatedGraph.nodes[1].evaluation.value).toBe(0);
  });

  it('Handles double edges correctly', () => {
    const scriptStore = useScriptStore();

    const graph = graphutils.graphK(); // Graph with double edges
    const builtGraph = scriptStore.buildGraph(graph.edges, graph.nodes);
    const evaluatedGraph = scriptStore.evaluateConcepts(builtGraph.id!);

    expect(evaluatedGraph.nodes[1].evaluation.value).toBe(1);
  });

  it('Retrieves neutral values correctly', () => {
    const scriptStore = useScriptStore();

    const graph = graphutils.graphF(); // Graph with neutral links
    const builtGraph = scriptStore.buildGraph(graph.edges, graph.nodes);
    const evaluatedGraph = scriptStore.evaluateConcepts(builtGraph.id!);

    expect(evaluatedGraph.nodes[1].evaluation.value).toBe(0);
  });

  it('Long branched chain with more random order in arrays', () => {
    const scriptStore = useScriptStore();

    const graph = graphutils.graphJ(); // Slightly larger graph
    const builtGraph = scriptStore.buildGraph(graph.edges, graph.nodes);
    const evaluatedGraph = scriptStore.evaluateConcepts(builtGraph.id!);

    expect(evaluatedGraph.nodes[1].evaluation.value).toBe(-1);
    expect(evaluatedGraph.nodes[2].evaluation.value).toBe(1);
    expect(evaluatedGraph.nodes[3].evaluation.value).toBe(-1);
    expect(evaluatedGraph.nodes[4].evaluation.value).toBe(1);
    expect(evaluatedGraph.nodes[5].evaluation.value).toBe(-1);
    expect(evaluatedGraph.nodes[6].evaluation.value).toBe(-1);
  });

  it('Evaluates a stable cycle automatically', () => {
    const scriptStore = useScriptStore();

    const graph = graphutils.graphR(); // Graph with stable cycle and no user values
    const builtGraph = scriptStore.buildGraph(graph.edges, graph.nodes);
    const evaluatedGraph = scriptStore.evaluateConcepts(builtGraph.id!);

    expect(evaluatedGraph.nodes[1].evaluation.value).toBe(1);
    expect(evaluatedGraph.nodes[2].evaluation.value).toBe(1);
    expect(evaluatedGraph.nodes[3].evaluation.value).toBe(1);
  });

  it('Evaluates a stable cycle automatically after multiple iterations', () => {
    const scriptStore = useScriptStore();

    const graph = graphutils.graphS(); // Graph with a stable cycle that requires more than one iteration to stabilize
    const builtGraph = scriptStore.buildGraph(graph.edges, graph.nodes);
    const evaluatedGraph = scriptStore.evaluateConcepts(builtGraph.id!);

    expect(evaluatedGraph.nodes[1].evaluation.value).toBe(-1);
    expect(evaluatedGraph.nodes[2].evaluation.value).toBe(-1);
    expect(evaluatedGraph.nodes[3].evaluation.value).toBe(-1);
    expect(evaluatedGraph.nodes[4].evaluation.value).toBe(-1);
    expect(evaluatedGraph.nodes[5].evaluation.value).toBe(-1);
  });

  it("Doesn't use user values in case of a stable cycle", () => {
    const scriptStore = useScriptStore();

    const graph = graphutils.graphH(); // Graph with stable cycle and user values
    const builtGraph = scriptStore.buildGraph(graph.edges, graph.nodes);
    const evaluatedGraph = scriptStore.evaluateConcepts(builtGraph.id!);

    expect(evaluatedGraph.nodes[1].evaluation.value).toBe(1);
    expect(evaluatedGraph.nodes[2].evaluation.value).toBe(1);
    expect(evaluatedGraph.nodes[3].evaluation.value).toBe(1);
  });

  it('Uses the user values for an unstable cycle', () => {
    const scriptStore = useScriptStore();

    const graph = graphutils.graphO(); // Graph with unstable cycle and user values
    const builtGraph = scriptStore.buildGraph(graph.edges, graph.nodes);
    const evaluatedGraph = scriptStore.evaluateConcepts(builtGraph.id!);

    expect(evaluatedGraph.nodes[1].evaluation.value).toBe(0);
    expect(evaluatedGraph.nodes[2].evaluation.value).toBe(-1);
    expect(evaluatedGraph.nodes[3].evaluation.value).toBe(1);
  });

  it("Doesn't uses user values for nodes outside the cycle", () => {
    const scriptStore = useScriptStore();

    const graph = graphutils.graphO(); // Graph with unstable cycle and user values
    const builtGraph = scriptStore.buildGraph(graph.edges, graph.nodes);
    const evaluatedGraph = scriptStore.evaluateConcepts(builtGraph.id!);

    expect(evaluatedGraph.nodes[4].evaluation.value).toBe(1);
  });

  it('Correctly evaluates a graph with cycles that overlap on a single node', () => {
    const scriptStore = useScriptStore();

    const graph = graphutils.graphT(); // Graph with two cycles that overlap on a single node
    const builtGraph = scriptStore.buildGraph(graph.edges, graph.nodes);
    const evaluatedGraph = scriptStore.evaluateConcepts(builtGraph.id!);

    expect(evaluatedGraph.nodes[1].evaluation.value).toBe(-1);
    expect(evaluatedGraph.nodes[2].evaluation.value).toBe(-1);
    expect(evaluatedGraph.nodes[3].evaluation.value).toBe(-1);
    expect(evaluatedGraph.nodes[4].evaluation.value).toBe(-1);
    expect(evaluatedGraph.nodes[5].evaluation.value).toBe(-1);
    expect(evaluatedGraph.nodes[6].evaluation.value).toBe(1);
  });

  it('Correctly evaluates a graph with cycles that overlap on a single edge', () => {
    const scriptStore = useScriptStore();

    const graph = graphutils.graphU(); // Graph with two cycles that overlap on a single edge
    const builtGraph = scriptStore.buildGraph(graph.edges, graph.nodes);
    const evaluatedGraph = scriptStore.evaluateConcepts(builtGraph.id!);

    expect(evaluatedGraph.nodes[1].evaluation.value).toBe(1);
    expect(evaluatedGraph.nodes[2].evaluation.value).toBe(1);
    expect(evaluatedGraph.nodes[3].evaluation.value).toBe(1);
    expect(evaluatedGraph.nodes[4].evaluation.value).toBe(1);
    expect(evaluatedGraph.nodes[5].evaluation.value).toBe(-1);
  });

  it('Correctly evaluates a graph with disconnected cycles', () => {
    const scriptStore = useScriptStore();

    const graph = graphutils.graphV(); // Graph with disconnected cycles
    const builtGraph = scriptStore.buildGraph(graph.edges, graph.nodes);
    const evaluatedGraph = scriptStore.evaluateConcepts(builtGraph.id!);

    expect(evaluatedGraph.nodes[1].evaluation.value).toBe(-1);
    expect(evaluatedGraph.nodes[2].evaluation.value).toBe(-1);
    expect(evaluatedGraph.nodes[3].evaluation.value).toBe(-1);
    expect(evaluatedGraph.nodes[4].evaluation.value).toBe(1);
    expect(evaluatedGraph.nodes[5].evaluation.value).toBe(1);
    expect(evaluatedGraph.nodes[6].evaluation.value).toBe(1);
    expect(evaluatedGraph.nodes[7].evaluation.value).toBe(1);
    expect(evaluatedGraph.nodes[8].evaluation.value).toBe(-1);
  });

  it('Correctly evaluates a cycle that depends on an unstable cycle with user values', () => {
    const scriptStore = useScriptStore();

    const graph = graphutils.graphW(); // Graph with disconnected cycles, of which one is unstable with user values
    const builtGraph = scriptStore.buildGraph(graph.edges, graph.nodes);
    const evaluatedGraph = scriptStore.evaluateConcepts(builtGraph.id!);

    expect(evaluatedGraph.nodes[1].evaluation.value).toBe(1);
    expect(evaluatedGraph.nodes[2].evaluation.value).toBe(1);
    expect(evaluatedGraph.nodes[3].evaluation.value).toBe(1);
    expect(evaluatedGraph.nodes[4].evaluation.value).toBe(-1);
    expect(evaluatedGraph.nodes[5].evaluation.value).toBe(-1);
    expect(evaluatedGraph.nodes[6].evaluation.value).toBe(0);
    expect(evaluatedGraph.nodes[7].evaluation.value).toBe(1);
    expect(evaluatedGraph.nodes[8].evaluation.value).toBe(1);
  });

  it('Uses weights in the evaluation correctly', () => {
    const scriptStore = useScriptStore();

    const graph = graphutils.graphX(); // Graph with weights that impact values
    const builtGraph = scriptStore.buildGraph(graph.edges, graph.nodes);
    const evaluatedGraph = scriptStore.evaluateConcepts(builtGraph.id!);

    expect(evaluatedGraph.nodes[1].evaluation.value).toBe(1);
  });
});
