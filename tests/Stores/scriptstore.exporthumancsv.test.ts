/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

import { setActivePinia, createPinia } from 'pinia';
import { describe, it, beforeEach, expect } from 'vitest';
import * as graphutils from './utils/scriptstore.evaluateConcepts.testing.utils';
import { useScriptStore } from '#imports';
import type { UrlString } from '~/types/exporter';

describe('Script Store - Build graph', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  it('Creates store', () => {
    const scriptStore = useScriptStore();
    expect(scriptStore).toBeDefined();
  });
  it('URLs are returned', async () => {
    const scriptStore = useScriptStore();

    const graph = graphutils.graphJ(); // A slightly larger graph, including some paradigm, instr, int values, edge values
    const builtGraph = scriptStore.buildGraph(graph.edges, graph.nodes);
    const evaluatedGraph = scriptStore.evaluateConcepts(builtGraph.id!);

    const urls: UrlString[] = await scriptStore.exporter(evaluatedGraph, [
      { value: 'csv', name: 'csv' },
    ]); // Exports a separate url for the nodes file and edges file

    urls.forEach((url) => {
      expect(url).toBeDefined();
    });
  });
  it('Correct nodes format outputted (scripts not run, paradigm support enabled)', () => {
    const scriptStore = useScriptStore();
    const globalStore = useGlobalStore();

    const graph = graphutils.graphJ(); // A slightly larger graph, including some paradigm, instr, int values, edge values
    const builtGraph = scriptStore.buildGraph(graph.edges, graph.nodes);
    scriptStore.evaluateConcepts(builtGraph.id!);

    globalStore.scriptSettings.paradigmSupport.enabled = true;
    globalStore.scriptSettings.instrumentSupport.enabled = false;

    const nodescsv: string = scriptStore.nodesToCSV(builtGraph.id!);

    expect(nodescsv).toBe(
      `id;node_name;input_value;picked_value;value;paradigms;instr;int` +
        `;degrees;in_degrees;out_degrees;degrees_w;in_degrees_w;out_degrees_w;go;go_w` +
        `\n1;a;-1;NA;-1;example paradigm;e.g. instr;this is an int` +
        `;1;0;1;1;0;1;-1;-1` +
        `\n2;b;-1;NA;1;NA;NA;NA` +
        `;4;3;1;4;3;1;0.5;0.5` +
        `\n3;c;0;NA;-1;other paradigm;e.g. instr;this is also an int` +
        `;1;0;1;1;0;1;-1;-1` +
        `\n4;d;1;NA;1;NA;NA;NA` +
        `;2;1;1;2;1;1;0;0` +
        `\n5;e;0;NA;-1;example paradigm;NA;this is also an int` +
        `;1;0;1;1;0;1;-1;-1` +
        `\n6;f;-1;NA;-1;NA;NA;NA` +
        `;1;1;0;1;1;0;1;1`,
    );
  });
  it('Correct nodes format outputted (scripts run and enabled)', () => {
    const scriptStore = useScriptStore();
    const globalStore = useGlobalStore();

    const graph = graphutils.graphJ(); // A slightly larger graph, including some paradigm, instr, int values, edge values
    const builtGraph = scriptStore.buildGraph(graph.edges, graph.nodes);
    scriptStore.evaluateConcepts(builtGraph.id!);
    scriptStore.paradigmSupport(builtGraph.id!);
    scriptStore.instrumentSupport(builtGraph.id!);

    globalStore.scriptSettings.paradigmSupport.enabled = true;
    globalStore.scriptSettings.instrumentSupport.enabled = true;

    const nodescsv: string = scriptStore.nodesToCSV(builtGraph.id!);

    expect(nodescsv).toBe(
      `id;node_name;input_value;picked_value;value;paradigms;example paradigm;other paradigm;instr;instr_support;int` +
        `;degrees;in_degrees;out_degrees;degrees_w;in_degrees_w;out_degrees_w;go;go_w` +
        `\n1;a;-1;NA;-1;example paradigm;0;1;e.g. instr;-1;this is an int` +
        `;1;0;1;1;0;1;-1;-1` +
        `\n2;b;-1;NA;1;NA;0;0;NA;NA;NA` +
        `;4;3;1;4;3;1;0.5;0.5` +
        `\n3;c;0;NA;-1;other paradigm;1;0;e.g. instr;-1;this is also an int` +
        `;1;0;1;1;0;1;-1;-1` +
        `\n4;d;1;NA;1;NA;0;0;NA;NA;NA` +
        `;2;1;1;2;1;1;0;0` +
        `\n5;e;0;NA;-1;example paradigm;0;1;NA;NA;this is also an int` +
        `;1;0;1;1;0;1;-1;-1` +
        `\n6;f;-1;NA;-1;NA;0;0;NA;NA;NA` +
        `;1;1;0;1;1;0;1;1`,
    );
  });
  it('Correct nodes format outputted (scripts run and disabled)', () => {
    const scriptStore = useScriptStore();
    const globalStore = useGlobalStore();

    const graph = graphutils.graphJ(); // A slightly larger graph, including some paradigm, instr, int values, edge values
    const builtGraph = scriptStore.buildGraph(graph.edges, graph.nodes);
    scriptStore.evaluateConcepts(builtGraph.id!);
    scriptStore.paradigmSupport(builtGraph.id!);

    globalStore.scriptSettings.paradigmSupport.enabled = false;
    globalStore.scriptSettings.instrumentSupport.enabled = false;

    const nodescsv: string = scriptStore.nodesToCSV(builtGraph.id!);

    expect(nodescsv).toBe(
      `id;node_name;input_value;picked_value;value;paradigms;instr;int` +
        `;degrees;in_degrees;out_degrees;degrees_w;in_degrees_w;out_degrees_w;go;go_w` +
        `\n1;a;-1;NA;-1;example paradigm;e.g. instr;this is an int` +
        `;1;0;1;1;0;1;-1;-1` +
        `\n2;b;-1;NA;1;NA;NA;NA` +
        `;4;3;1;4;3;1;0.5;0.5` +
        `\n3;c;0;NA;-1;other paradigm;e.g. instr;this is also an int` +
        `;1;0;1;1;0;1;-1;-1` +
        `\n4;d;1;NA;1;NA;NA;NA` +
        `;2;1;1;2;1;1;0;0` +
        `\n5;e;0;NA;-1;example paradigm;NA;this is also an int` +
        `;1;0;1;1;0;1;-1;-1` +
        `\n6;f;-1;NA;-1;NA;NA;NA` +
        `;1;1;0;1;1;0;1;1`,
    );
  });
  it('Correct edges format outputted', () => {
    const scriptStore = useScriptStore();

    const graph = graphutils.graphJ(); // A slightly larger graph, including some paradigm, instr, int values, edge values
    const builtGraph = scriptStore.buildGraph(graph.edges, graph.nodes);
    scriptStore.evaluateConcepts(builtGraph.id!);

    const edgescsv: string = scriptStore.edgesToCSV(builtGraph.id!);

    expect(edgescsv).toBe(
      `from;to;edge_id;edge_value;weight;map_id;map_date;speaker` +
        `\na;b;1;-1;1;28;01-04-1987;Marck Rötte` +
        `\nb;f;2;-1;1;28;01-04-1987;Marck Rötte` +
        `\nc;b;3;-1;1;28;01-04-1987;Marck Rötte` +
        `\ne;d;4;-1;1;28;01-04-1987;Marck Rötte` +
        `\nd;b;5;1;1;28;01-04-1987;Marck Rötte`,
    );
  });
});
