/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { setActivePinia, createPinia } from 'pinia';
import Edges from '../components/Graph/Edges.vue';
import { dfltEdgeAliases } from '~/assets/json/defaultGraphColumns';

describe('Graph Edges', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  it.each([
    {
      keys: [
        { key: 'from' },
        { key: 'to' },
        { key: 'weight' },
        { key: 'edgeValue' },
        { key: 'id' },
        { key: 'valueX' },
        { key: 'valueY' },
      ],
      graph: {
        nodes: {
          e: {
            id: 1,
            nodeName: 'nn',
            value: 2,
            degrees: {
              all: 3,
              in: 4,
              out: 5,
            },
            weightedDegrees: {
              all: 6,
              in: 7,
              out: 8,
            },
          },
        },
        edges: {
          f: {
            from: 1,
            to: 2,
            weight: 3,
            edgeValue: 4,
            id: 5,
            valueX: 6,
            valueY: 7,
          },
        },
        nodeArray: [
          {
            id: 1,
            nodeName: 'nn',
            value: 2,
            degrees: {
              all: 3,
              in: 4,
              out: 5,
            },
            weightedDegrees: {
              all: 6,
              in: 7,
              out: 8,
            },
          },
        ],
        edgeArray: [
          {
            from: 1,
            to: 2,
            weight: 3,
            edgeValue: 4,
            id: 5,
            valueX: 6,
            valueY: 7,
          },
        ],
      },
      result: [['1', '2', '3', '4', '5', '6', '7']],
    },
    {
      keys: [
        { key: 'from' },
        { key: 'to' },
        { key: 'weight' },
        { key: 'edgeValue' },
        { key: 'id' },
        { key: 'valueX' },
        { key: 'valueY' },
      ],
      graph: {
        nodes: {
          e: {
            id: 1,
            nodeName: 'nn',
            value: 2,
            degrees: {
              all: 3,
              in: 4,
              out: 5,
            },
            weightedDegrees: {
              all: 6,
              in: 7,
              out: 8,
            },
          },
        },
        edges: {
          f: {
            from: 1,
            to: 2,
            weight: 3,
            edgeValue: 4,
            id: 5,
            valueX: 6,
            valueY: 7,
          },
        },
        nodeArray: [
          {
            id: 1,
            nodeName: 'nn',
            value: 2,
            degrees: {
              all: 3,
              in: 4,
              out: 5,
            },
            weightedDegrees: {
              all: 6,
              in: 7,
              out: 8,
            },
          },
        ],
        edgeArray: [
          {
            from: 1,
            to: 2,
            weight: 3,
            edgeValue: 4,
            id: 5,
            valueX: 6,
            valueY: 7,
          },
          {
            from: 8,
            to: 9,
            weight: 10,
            edgeValue: 11,
            id: 12,
            valueX: 13,
            valueY: 14,
          },
        ],
      },
      result: [
        ['1', '2', '3', '4', '5', '6', '7'],
        ['8', '9', '10', '11', '12', '13', '14'],
      ],
    },
  ])('returns the correct array of string arrays', ({ keys, graph, result }) => {
    const pinia = createTestingPinia({
      createSpy: vi.fn,
      stubActions: false,
    });

    pinia.state.value.tableStore = {
      relevantEdgeKeys: keys,
      edgeKeyAliases: dfltEdgeAliases,
    };
    pinia.state.value.scriptStore = {
      graphs: { g: graph },
    };

    const wrapper = mount(Edges, {
      global: {
        plugins: [pinia],
      },
    });

    const data = wrapper.vm.relevantEdgeStrings();
    expect(data).toStrictEqual(result);
  });
});
