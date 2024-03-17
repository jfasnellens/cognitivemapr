/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Header from '../components/Graph/Header.vue';

describe('Graph Header', () => {
  it.each([
    {
      data: [
        [
          ['1', 1],
          ['2', 1],
          ['3', 1],
        ],
      ],
      rows: 1,
      columns: 3,
    },
    { data: [[['1', 1]], [['2', 1]], [['3', 1]]], rows: 3, columns: 1 },
    {
      data: [
        [
          ['1', 1],
          ['2', 1],
          ['3', 1],
        ],
        [
          ['4', 1],
          ['5', 1],
          ['6', 1],
        ],
        [
          ['7', 1],
          ['8', 1],
          ['9', 1],
        ],
      ],
      rows: 3,
      columns: 3,
    },
  ])('will display an array of string arrays as rows in a thead', ({ data, rows, columns }) => {
    const wrapper = mount(Header, {
      props: {
        headers: data,
      },
    });

    const bodyRows = wrapper.findAll('tr');
    expect(bodyRows.length).toBe(rows);

    const bodyColumnCount: number[] = [];
    bodyRows.forEach((row) => {
      const cells = row.findAll('th');
      bodyColumnCount.push(cells.length);
    });

    expect(Math.max(...bodyColumnCount)).toBe(columns);
  });
});
