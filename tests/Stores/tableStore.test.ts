/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

import { setActivePinia, createPinia } from 'pinia';
import { describe, it, beforeEach, expect } from 'vitest';
import { useTableStore } from '@/stores/tableStore';

describe('Table store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it.each([
    [
      [{ key: 'a' }, { key: 'c' }],
      [
        [
          ['a', 1],
          ['c', 1],
        ],
      ],
    ],
    [[{ key: 'a', subKeys: [{ key: 'b' }] }], [[['a', 1]], [['b', 1]]]],
    [
      [{ key: 'a', subKeys: [{ key: 'b' }] }, { key: 'c' }],
      [
        [
          ['a', 1],
          ['c', 1],
        ],
        [
          ['b', 1],
          ['', 1],
        ],
      ],
    ],
    [
      [{ key: 'a', subKeys: [{ key: 'c' }, { key: 'b' }] }],
      [
        [['a', 2]],
        [
          ['c', 1],
          ['b', 1],
        ],
      ],
    ],
    [[{ key: 'a' }], [[['a', 1]]]],
  ])('will return an ordered array of all object values as strings', (keys, expt) => {
    const tableStore = useTableStore();
    const { relevantOrderedHeader } = tableStore;
    const aliases = { a: 'a', b: 'b', c: 'c' };
    expect(relevantOrderedHeader(aliases, keys)).toStrictEqual(expt);
  });

  it.each([
    [{ a: 1, c: 3 }, [{ key: 'a' }, { key: 'c' }], ['1', '3']],
    [{ a: { b: 2 } }, [{ key: 'a', subKeys: [{ key: 'b' }] }], ['2']],
    [{ a: { b: 2 }, c: 3 }, [{ key: 'a', subKeys: [{ key: 'b' }] }, { key: 'c' }], ['2', '3']],
    [{ a: { b: 2, c: 3 } }, [{ key: 'a', subKeys: [{ key: 'c' }, { key: 'b' }] }], ['3', '2']],
    [{ a: undefined }, [{ key: 'a' }], ['-']],
  ])('will return an ordered array of all object values as strings', (obj, keys, expt) => {
    const tableStore = useTableStore();
    const { relevantOrderedStrings } = tableStore;

    expect(relevantOrderedStrings(obj, keys)).toStrictEqual(expt);
  });
});
