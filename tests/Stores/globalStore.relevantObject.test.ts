/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

import { setActivePinia, createPinia } from 'pinia';
import { describe, it, beforeEach, expect } from 'vitest';
import { useGlobalStore } from '@/stores/globalStore';

describe('Global store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it.each([
    [{ a: 1, b: 2, c: 3 }, [{ key: 'a' }, { key: 'c' }], { a: 1, c: 3 }],
    [{ a: { b: 2, c: 3 } }, [{ key: 'a', subKeys: [{ key: 'b' }] }], { a: { b: 2 } }],
    [
      { a: { b: 2, c: 3 } },
      [{ key: 'a', subKeys: [{ key: 'b' }, { key: 'c' }] }],
      { a: { b: 2, c: 3 } },
    ],
    [{ a: { b: 2 } }, [{ key: 'a', subKeys: [{ key: 'b' }, { key: 'c' }] }], { a: { b: 2 } }],
    [{ a: undefined }, [{ key: 'a' }], { a: undefined }],
  ])('will return an object with only relevant key value pairs', (obj, keys, expt) => {
    const globalStore = useGlobalStore();
    const { relevantObject } = globalStore;

    expect(relevantObject(obj, keys)).toStrictEqual(expt);
  });
});
