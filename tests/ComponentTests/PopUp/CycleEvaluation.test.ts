/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

import { describe, it, test, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import CycleEvaluation from '../components/PopupComponents/CycleEvaluation.vue';
import * as graphutils from '../../Stores/utils/scriptstore.evaluateConcepts.testing.utils';
import { useScriptStore } from '#imports';

describe('CycleEvaluationPopUp', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    const scriptStore = useScriptStore();
    const graph = graphutils.graphP(); // Graph with unstable cycle and no user values
    const builtGraph = scriptStore.buildGraph(graph.edges, graph.nodes);
    scriptStore.evaluateConcepts(builtGraph.id!);
  });
  it.each([
    '.CycleEvaluationWrapper',
    '.content',
    '.topText',
    '.title',
    '.subTitle',
    '.contents',
    '.buttons',
  ])('creates a %s element', (element) => {
    const scriptStore = useScriptStore();
    const graphId = scriptStore.graphsRequiringValues[0];
    const wrapper = mount(CycleEvaluation, {
      props: {
        graphId,
        graphName: scriptStore.graphs[graphId].name,
        valuesRequired: scriptStore.nodesRequiringValues[graphId],
      },
    });

    const div = wrapper.find(element);

    expect(div.exists()).toBeTruthy();
  });

  it('renders the graph name correctly', () => {
    const scriptStore = useScriptStore();
    const graphId = scriptStore.graphsRequiringValues[0];
    const graph = scriptStore.graphs[graphId];
    graph.name = 'Haraldr inn Grafandi';
    const wrapper = mount(CycleEvaluation, {
      props: {
        graphId,
        graphName: graph.name,
        valuesRequired: scriptStore.nodesRequiringValues[graphId],
      },
    });

    const subTitle = wrapper.find('.subTitle');
    const expectedString = `The 'Evaluate Concepts' script has encountered a cycle in "Haraldr inn Grafandi" that can not be evaluated automatically. User intervention is required in order to pick the best set of values out of the attempted calculations. In the table displayed below, a row is shown for each node in this cycle. Each column contains a set of evaluation values that was calculated by the analysis script. Please select the column that contains the best set of values.`;
    expect(subTitle.exists()).toBeTruthy();
    expect(subTitle.text()).toBe(expectedString);
  });

  it('renders all nodes of the cycle in the table', () => {
    const scriptStore = useScriptStore();
    const graphId = scriptStore.graphsRequiringValues[0];
    const wrapper = mount(CycleEvaluation, {
      props: {
        graphId,
        graphName: scriptStore.graphs[graphId].name,
        valuesRequired: scriptStore.nodesRequiringValues[graphId],
      },
    });

    const tableRows = wrapper.findAll('tr'); // One table row for each node that requires a value
    expect(tableRows.length).toBe(3);
  });

  test('if the back button renders and emits correctly', async () => {
    const scriptStore = useScriptStore();
    const graphId = scriptStore.graphsRequiringValues[0];
    const wrapper = mount(CycleEvaluation, {
      props: {
        graphId,
        graphName: scriptStore.graphs[graphId].name,
        valuesRequired: scriptStore.nodesRequiringValues[graphId],
      },
    });

    const dfButtons = wrapper.findAllComponents('.btn-wrapper');
    expect(dfButtons.at(0)?.exists()).toBeTruthy();

    await dfButtons.at(0)?.trigger('click');
    expect(wrapper.emitted()).toHaveProperty('closePopup');
  });

  test('if the disable scripts button renders and emits correctly', async () => {
    const scriptStore = useScriptStore();
    const graphId = scriptStore.graphsRequiringValues[0];
    const wrapper = mount(CycleEvaluation, {
      props: {
        graphId,
        graphName: scriptStore.graphs[graphId].name,
        valuesRequired: scriptStore.nodesRequiringValues[graphId],
      },
    });

    const dfButtons = wrapper.findAllComponents('.btn-wrapper');
    expect(dfButtons.at(1)?.exists()).toBeTruthy();

    await dfButtons.at(1)?.trigger('click');
    expect(wrapper.emitted()).toHaveProperty('cancelEvaluation');
  });

  test('if the pick values button renders and emits correctly', async () => {
    const scriptStore = useScriptStore();
    const graphId = scriptStore.graphsRequiringValues[0];
    const wrapper = mount(CycleEvaluation, {
      props: {
        graphId,
        graphName: scriptStore.graphs[graphId].name,
        valuesRequired: scriptStore.nodesRequiringValues[graphId],
      },
    });

    const dfButtons = wrapper.findAllComponents('.btn-wrapper');
    expect(dfButtons.at(2)?.exists()).toBeTruthy();

    await dfButtons.at(2)?.trigger('click');
    expect(wrapper.emitted()).toHaveProperty('pickValues');
  });

  test('if the pick values button emits the selected iteration', async () => {
    const scriptStore = useScriptStore();
    const graphId = scriptStore.graphsRequiringValues[0];
    const wrapper = mount(CycleEvaluation, {
      props: {
        graphId,
        graphName: scriptStore.graphs[graphId].name,
        valuesRequired: scriptStore.nodesRequiringValues[graphId],
      },
    });

    const tableCells = wrapper.findAll('td');
    expect(tableCells.at(2)?.exists()).toBeTruthy();
    await tableCells.at(3)?.trigger('click'); // Should be the fourth column of the first row. First column is node names, so this is iteration 3.

    const dfButtons = wrapper.findAllComponents('.btn-wrapper');
    await dfButtons.at(2)?.trigger('click');
    expect(wrapper.emitted('pickValues')).toBeTruthy();
    expect(wrapper.emitted('pickValues')?.length).toBe(1);
    expect(wrapper.emitted('pickValues')![0][0]).toBe(3); // Iteration 3
  });
});
