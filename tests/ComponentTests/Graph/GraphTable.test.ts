/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Table from '../components/Graph/Table.vue';

describe('Graph Table', () => {
  it.each(['.tableWrapper', '.positionWrapper'])('renders %s', (element) => {
    const wrapper = mount(Table);

    const div = wrapper.find(element);
    expect(div.exists()).toBeTruthy();
  });

  it.each([
    [
      {
        hData: [
          [
            ['1', 1],
            ['2', 1],
            ['3', 1],
          ],
        ],
        hRows: 1,
        hColumns: 3,
      },
      { bData: [['1', '2', '3']], bRows: 1, bColumns: 3 },
    ],
    [
      { hData: [[['1', 1]], [['2', 1]], [['3', 1]]], hRows: 3, hColumns: 1 },
      { bData: [['1'], ['2'], ['3']], bRows: 3, bColumns: 1 },
    ],
    [
      {
        hData: [
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
        hRows: 3,
        hColumns: 3,
      },
      {
        bData: [
          ['1', '2', '3'],
          ['4', '5', '6'],
          ['7', '8', '9'],
        ],
        bRows: 3,
        bColumns: 3,
      },
    ],
  ])(
    'will display props as Rows in a thead and tbody',
    ({ hData, hRows, hColumns }, { bData, bRows, bColumns }) => {
      const wrapper = mount(Table, {
        props: {
          info: hData,
          columns: bData,
        },
      });

      const head = wrapper.find('thead');
      const headRows = head.findAll('tr');
      expect(headRows.length).toBe(hRows);

      const headColumnCount: number[] = [];
      headRows.forEach((row) => {
        const cells = row.findAll('th');
        headColumnCount.push(cells.length);
      });
      expect(Math.max(...headColumnCount)).toBe(hColumns);

      const body = wrapper.find('tbody');
      const bodyRows = body.findAll('tr');
      expect(bodyRows.length).toBe(bRows);

      const bodyColumnCount: number[] = [];
      bodyRows.forEach((row) => {
        const cells = row.findAll('td');
        bodyColumnCount.push(cells.length);
      });
      expect(Math.max(...bodyColumnCount)).toBe(bColumns);
    },
  );
});
