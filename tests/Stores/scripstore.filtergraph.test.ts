/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

import { setActivePinia, createPinia } from 'pinia';
import { describe, it, beforeEach, expect } from 'vitest';
import { useDayjs } from 'dayjs-nuxt/dist/runtime/composables/dayjs';
import * as graphutils from './utils/scriptstore.evaluateConcepts.testing.utils';
import { useScriptStore } from '#imports';

const dayjs = useDayjs();
dayjs.locale('nl');

describe('Script Store - Evaluate Concepts', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('Creates store', () => {
    const scriptStore = useScriptStore();
    expect(scriptStore).toBeDefined();
  });

  it('Only edges with matching speaker are included', () => {
    const scriptStore = useScriptStore();

    const graph = graphutils.graphM(); // Graph with multiple speakers
    const builtGraph = scriptStore.buildGraph(graph.edges, graph.nodes);
    const filteredGraph = scriptStore.extractSpeaker(builtGraph.id!, 'Anshella Merkoll');

    expect(filteredGraph.edgeArray.length).toBe(5); // There are 3 Rötte edges, 5 Merkoll
  });

  it('Only nodes connected to edges with the matching speaker are kept', () => {
    const scriptStore = useScriptStore();

    const graph = graphutils.graphM(); // Graph with multiple speakers
    const builtGraph = scriptStore.buildGraph(graph.edges, graph.nodes);
    const filteredGraph = scriptStore.extractSpeaker(builtGraph.id!, 'Anshella Merkoll');

    expect(filteredGraph.nodeArray.length).toBe(6); // 1 of the 7 nodes is not connected to Merkoll edges
  });

  it('Graph resulting from speaker filter is empty', () => {
    const scriptStore = useScriptStore();

    const graph = graphutils.graphA(); // Graph with only Marck Rötte
    const builtGraph = scriptStore.buildGraph(graph.edges, graph.nodes);
    const filteredGraph = scriptStore.extractSpeaker(builtGraph.id!, 'Anshella Merkoll');

    expect(filteredGraph.edgeArray.length).toBe(0);
    expect(filteredGraph.nodeArray.length).toBe(0);
  });

  it('Graph resulting from speaker filter is disconnected', () => {
    const scriptStore = useScriptStore();

    const graph = graphutils.graphN(); // Graph designed to become disconnected when filtered
    const builtGraph = scriptStore.buildGraph(graph.edges, graph.nodes);
    const filteredGraph = scriptStore.extractSpeaker(builtGraph.id!, 'Marck Rötte');

    expect(filteredGraph.edgeArray.length).toBe(2);
    expect(filteredGraph.nodeArray.length).toBe(4);
  });

  it('All edges with matching dates are included', () => {
    const scriptStore = useScriptStore();

    const graph = graphutils.graphM(); // Graph with multiple dates
    const builtGraph = scriptStore.buildGraph(graph.edges, graph.nodes);
    const filteredGraph = scriptStore.extractTimePeriod(
      builtGraph.id!,
      dayjs('12-08-1571', 'DD-MM-YYYY').toISOString(),
      dayjs('04-03-2103', 'DD-MM-YYYY').toISOString(),
    );

    expect(filteredGraph.edgeArray.length).toBe(8); // All edges
  });

  it('No edges earlier than start date included', () => {
    const scriptStore = useScriptStore();

    const graph = graphutils.graphM(); // Graph with multiple dates
    const builtGraph = scriptStore.buildGraph(graph.edges, graph.nodes);
    const filteredGraph = scriptStore.extractTimePeriod(
      builtGraph.id!,
      dayjs('02-07-1985', 'DD-MM-YYYY').toISOString(),
      dayjs('04-03-2103', 'DD-MM-YYYY').toISOString(),
    );

    expect(filteredGraph.edgeArray.length).toBe(3); // Rötte Edges
  });

  it('No edges later than end date included', () => {
    const scriptStore = useScriptStore();

    const graph = graphutils.graphM(); // Graph with multiple dates
    const builtGraph = scriptStore.buildGraph(graph.edges, graph.nodes);
    const filteredGraph = scriptStore.extractTimePeriod(
      builtGraph.id!,
      dayjs('12-08-1571', 'DD-MM-YYYY').toISOString(),
      dayjs('04-03-1986', 'DD-MM-YYYY').toISOString(),
    );

    expect(filteredGraph.edgeArray.length).toBe(5); // Merkoll Edges
  });

  it('Graph resulting from time filter is empty', () => {
    const scriptStore = useScriptStore();

    const graph = graphutils.graphM(); // Graph with multiple dates
    const builtGraph = scriptStore.buildGraph(graph.edges, graph.nodes);
    const filteredGraph = scriptStore.extractTimePeriod(
      builtGraph.id!,
      dayjs('02-03-1986', 'DD-MM-YYYY').toISOString(),
      dayjs('06-07-1986', 'DD-MM-YYYY').toISOString(),
    );

    expect(filteredGraph.edgeArray.length).toBe(0);
    expect(filteredGraph.nodeArray.length).toBe(0);
  });

  it('Graph resulting from time filter is disconnected', () => {
    const scriptStore = useScriptStore();

    const graph = graphutils.graphN(); // Graph designed to become disconnected when filtered
    const builtGraph = scriptStore.buildGraph(graph.edges, graph.nodes);
    const filteredGraph = scriptStore.extractTimePeriod(
      builtGraph.id!,
      dayjs('02-07-1985', 'DD-MM-YYYY').toISOString(),
      dayjs('04-03-2103', 'DD-MM-YYYY').toISOString(),
    );

    expect(filteredGraph.edgeArray.length).toBe(2);
    expect(filteredGraph.nodeArray.length).toBe(4);
  });

  it('Only nodes connected to edges with the matching time period are kept', () => {
    const scriptStore = useScriptStore();

    const graph = graphutils.graphM(); // Graph with multiple speakers
    const builtGraph = scriptStore.buildGraph(graph.edges, graph.nodes);
    const filteredGraph = scriptStore.extractTimePeriod(
      builtGraph.id!,
      dayjs('12-08-1571', 'DD-MM-YYYY').toISOString(),
      dayjs('04-03-1986', 'DD-MM-YYYY').toISOString(),
    );

    expect(filteredGraph.edgeArray.length).toBe(5);
    expect(filteredGraph.nodeArray.length).toBe(6); // 1 of the 7 nodes is not connected to Merkoll edges not connected to Merkoll edges
  });
});
