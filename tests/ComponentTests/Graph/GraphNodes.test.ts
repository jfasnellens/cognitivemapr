/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { setActivePinia, createPinia } from 'pinia';
import Nodes from '../components/Graph/Nodes.vue';
import { dfltNodeAliases } from '~/assets/json/defaultGraphColumns';

describe('Graph Nodes', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  it.each([
    {
      keys: [
        { key: 'id' },
        { key: 'nodeName' },
        { key: 'value' },
        { key: 'degrees', subKeys: [{ key: 'all' }, { key: 'in' }, { key: 'out' }] },
        { key: 'weightedDegrees', subKeys: [{ key: 'all' }, { key: 'in' }, { key: 'out' }] },
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
      result: [['1', 'nn', '2', '3', '4', '5', '6', '7', '8']],
    },
    {
      keys: [
        { key: 'id' },
        { key: 'nodeName' },
        { key: 'value' },
        { key: 'degrees', subKeys: [{ key: 'all' }, { key: 'in' }, { key: 'out' }] },
        { key: 'weightedDegrees', subKeys: [{ key: 'all' }, { key: 'in' }, { key: 'out' }] },
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
          {
            id: 9,
            nodeName: 'nn',
            value: 10,
            degrees: {
              all: 11,
              in: 12,
              out: 13,
            },
            weightedDegrees: {
              all: 14,
              in: 15,
              out: 16,
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
      result: [
        ['1', 'nn', '2', '3', '4', '5', '6', '7', '8'],
        ['9', 'nn', '10', '11', '12', '13', '14', '15', '16'],
      ],
    },
  ])('returns the correct array of string arrays', ({ keys, graph, result }) => {
    const pinia = createTestingPinia({
      createSpy: vi.fn,
      stubActions: false,
    });

    pinia.state.value.tableStore = {
      relevantNodeKeys: keys,
      nodeKeyAliases: dfltNodeAliases,
    };
    pinia.state.value.scriptStore = {
      graphs: { g: graph },
    };

    const wrapper = mount(Nodes, {
      global: {
        plugins: [pinia],
      },
    });

    const data = wrapper.vm.relevantNodeStrings();
    expect(data).toStrictEqual(result);
  });
});
