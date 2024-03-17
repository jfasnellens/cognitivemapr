/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Body from '../components/Graph/Body.vue';

describe('Graph Body', () => {
  it.each([
    { data: [['1', '2', '3']], rows: 1, columns: 3 },
    { data: [['1'], ['2'], ['3']], rows: 3, columns: 1 },
    {
      data: [
        ['1', '2', '3'],
        ['4', '5', '6'],
        ['7', '8', '9'],
      ],
      rows: 3,
      columns: 3,
    },
  ])('will display an array of string arrays as rows in a tbody', ({ data, rows, columns }) => {
    const wrapper = mount(Body, {
      props: {
        rowData: data,
      },
    });

    const bodyRows = wrapper.findAll('tr');
    expect(bodyRows.length).toBe(rows);

    const bodyColumnCount: number[] = [];
    bodyRows.forEach((row) => {
      const cells = row.findAll('td');
      bodyColumnCount.push(cells.length);
    });

    expect(Math.max(...bodyColumnCount)).toBe(columns);
  });
  it.each([
    { data: [['1', '2', '3']], i: 0, j: 1 },
    { data: [['1'], ['2'], ['3']], i: 2, j: 0 },
    {
      data: [
        ['1', '2', '3'],
        ['4', '5', '6'],
        ['7', '8', '9'],
      ],
      i: 1,
      j: 2,
    },
  ])('will toggle the .showContent class for a specified cell', async ({ data, i, j }) => {
    const wrapper = mount(Body, {
      props: {
        rowData: data,
      },
    });

    await wrapper.vm.showContent(i, j);
    const expandedCell = wrapper.find('.showContent');
    expect(expandedCell.exists()).toBeTruthy();

    await wrapper.vm.showContent(i, j);
    const noExpandedCell = wrapper.find('.showContent');
    expect(noExpandedCell.exists()).toBeFalsy();
  });
  it.each([
    { data: [['1', '2', '3']], i: 0, j: 2 },
    { data: [['1'], ['2'], ['3']], i: 2, j: 0 },
    {
      data: [
        ['1', '2', '3'],
        ['4', '5', '6'],
        ['7', '8', '9'],
      ],
      i: 1,
      j: 2,
    },
  ])('will emit the indices off the toggled cell', async ({ data, i, j }) => {
    const wrapper = mount(Body, {
      props: {
        rowData: data,
      },
    });

    await wrapper.vm.showContent(i, j);
    expect(wrapper.emitted('show-content')).toBeTruthy();
    expect(wrapper.emitted('show-content')![0][0]).toStrictEqual([i, j]);

    await wrapper.vm.showContent(i, j);
    expect(wrapper.emitted('show-content')).toBeTruthy();
    expect(wrapper.emitted('show-content')![0][0]).toStrictEqual([i, j]);
  });
});
