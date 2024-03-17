/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

import { setActivePinia, createPinia } from 'pinia';
import { describe, it, beforeEach, expect } from 'vitest';
import { useFileStore } from '@/stores/fileStore';

describe('File Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('adds collection', () => {
    const fileStore = useFileStore();
    const { addCollection } = fileStore;
    expect(fileStore.collections.length).toBe(0);
    addCollection({ name: 'TestCollection' });
    expect(fileStore.collections.length).toBe(1);
  });

  it('adds multiple to collection and keep order', () => {
    const fileStore = useFileStore();
    const { addCollection } = fileStore;
    expect(fileStore.collections.length).toBe(0);
    addCollection({ name: 'TestCollection1' });
    addCollection({ name: 'TestCollection2' });
    addCollection({ name: 'TestCollection3' });
    expect(fileStore.collections.length).toBe(3);
    expect(fileStore.collections[0]).toStrictEqual({ name: 'TestCollection1' });
    expect(fileStore.collections[1]).toStrictEqual({ name: 'TestCollection2' });
    expect(fileStore.collections[2]).toStrictEqual({ name: 'TestCollection3' });
  });

  it('deletes collection', () => {
    const fileStore = useFileStore();
    const { addCollection, deleteCollection } = fileStore;
    addCollection({ name: 'TestCollection' });
    expect(fileStore.collections.length).toBe(1);
    deleteCollection(0);
    expect(fileStore.collections.length).toBe(0);
  });

  it('deletes from empty store', () => {
    const fileStore = useFileStore();
    const { deleteCollection } = fileStore;
    deleteCollection(3);
    expect(fileStore.collections.length).toBe(0);
  });

  it('updates collection', () => {
    const fileStore = useFileStore();
    const { addCollection, updateCollection } = fileStore;
    addCollection({ name: 'TestCollection' });
    updateCollection({ name: 'updatedName' }, 0);
    expect(fileStore.collections[0].name).toBe('updatedName');
  });

  it('deletes an row if its empty', () => {
    const fileStore = useFileStore();
    const { addCollection, deleteIfEmpty } = fileStore;
    addCollection({ name: 'TestCollection' });
    deleteIfEmpty(0);
    expect(fileStore.collections.length).toBe(0);
  });

  it('updates a collections name', () => {
    const fileStore = useFileStore();
    const { addCollection, updateName } = fileStore;
    addCollection({ name: 'TestCollection' });
    updateName(0, 'NewName');
    expect(fileStore.collections[0].name).toBe('NewName');
  });

  it('updates a collections files', () => {
    const fileStore = useFileStore();
    const { addCollection, updateFile } = fileStore;

    const mockFile1 = new File([], 'File_1');
    const mockFile2 = new File([], 'File_2');

    addCollection({
      name: 'TestCollection',
      nodeList: mockFile1,
      edgeList: mockFile1,
    });

    updateFile(0, 'nodeList', mockFile2);
    updateFile(0, 'edgeList', mockFile2);

    expect(fileStore.collections[0].nodeList).toStrictEqual(mockFile2);
    expect(fileStore.collections[0].edgeList).toStrictEqual(mockFile2);
  });

  it('returns the correct file given an index and file type', () => {
    const fileStore = useFileStore();
    const { addCollection, getFile } = fileStore;

    const mockNodeFile = new File([], 'nodeFile');
    const mockEdgeFile = new File([], 'edgeFile');

    addCollection({
      name: 'TestCollection',
      nodeList: mockNodeFile,
      edgeList: mockEdgeFile,
    });

    expect(getFile(0, 'nodeList')).toStrictEqual(mockNodeFile);
    expect(getFile(0, 'edgeList')).toStrictEqual(mockEdgeFile);
  });

  it('deletes the correct file given an index and file type', () => {
    const fileStore = useFileStore();
    const { addCollection, deleteFile } = fileStore;

    const mockNodeFile = new File([], 'nodeFile');
    const mockEdgeFile = new File([], 'edgeFile');

    addCollection({
      name: 'TestCollection',
      nodeList: mockNodeFile,
      edgeList: mockEdgeFile,
    });

    expect(deleteFile(0, 'nodeList')).toStrictEqual(undefined);
    expect(deleteFile(0, 'edgeList')).toStrictEqual(undefined);
  });

  it('adds new collection with a single file', () => {
    const fileStore = useFileStore();
    const { addFile } = fileStore;

    const mockNodeFile = new File([], 'nodeFile');
    const mockEdgeFile = new File([], 'edgeFile');

    addFile(mockNodeFile, 'nodeList');
    addFile(mockEdgeFile, 'edgeList');

    expect(fileStore.collections[0].nodeList).toStrictEqual(mockNodeFile);
    expect(fileStore.collections[0].name).toBe('Graph 1');

    expect(fileStore.collections[1].edgeList).toStrictEqual(mockEdgeFile);
    expect(fileStore.collections[1].name).toBe('Graph 2');
  });

  it('adds file to existing row if their is room', () => {
    const fileStore = useFileStore();
    const { addFile, pushFile } = fileStore;

    const mockNodeFile = new File([], 'nodeFile');
    const mockEdgeFile = new File([], 'edgeFile');

    addFile(mockNodeFile, 'nodeList');
    pushFile(mockEdgeFile, 'edgeList');

    expect(fileStore.collections[0].edgeList).toStrictEqual(mockEdgeFile);
    expect(fileStore.collections[0].name).toBe('Graph 1');
  });

  it('adds new row if their is no room, row will have generated name', () => {
    const fileStore = useFileStore();
    const { addCollection, pushFile } = fileStore;

    const mockNodeFile = new File([], 'nodeFile');
    const mockEdgeFile = new File([], 'edgeFile');

    addCollection({ name: 'TestCollection', nodeList: mockNodeFile, edgeList: mockEdgeFile });
    pushFile(mockEdgeFile, 'edgeList');

    expect(fileStore.collections[1].edgeList).toStrictEqual(mockEdgeFile);
    expect(fileStore.collections[1].name).toBe('Graph 1');
  });

  it.each([
    { frIndex: 0, toIndex: 1, from: 'nodeList', to: 'nodeList' },
    { frIndex: 0, toIndex: 1, from: 'nodeList', to: 'edgeList' },
    { frIndex: 0, toIndex: 1, from: 'edgeList', to: 'nodeList' },
    { frIndex: 0, toIndex: 1, from: 'edgeList', to: 'edgeList' },
    { frIndex: 1, toIndex: 0, from: 'nodeList', to: 'nodeList' },
    { frIndex: 1, toIndex: 0, from: 'nodeList', to: 'edgeList' },
    { frIndex: 1, toIndex: 0, from: 'edgeList', to: 'nodeList' },
    { frIndex: 1, toIndex: 0, from: 'edgeList', to: 'edgeList' },
    { frIndex: 0, toIndex: 0, from: 'nodeList', to: 'edgeList' },
    { frIndex: 0, toIndex: 0, from: 'edgeList', to: 'nodeList' },
    { frIndex: 1, toIndex: 1, from: 'nodeList', to: 'edgeList' },
    { frIndex: 1, toIndex: 1, from: 'edgeList', to: 'nodeList' },
  ])(
    'it can swap files from $from at $frIndex to $to at $toIndex',
    ({ frIndex, toIndex, from, to }) => {
      const fileStore = useFileStore();
      const { addCollection, swapFiles, getFile } = fileStore;

      const mockNodeFile1 = new File([], 'nodeFile_1');
      const mockEdgeFile1 = new File([], 'edgeFile_1');
      const mockNodeFile2 = new File([], 'nodeFile_2');
      const mockEdgeFile2 = new File([], 'edgeFile_2');

      addCollection({
        name: 'TestCollection_1',
        nodeList: mockNodeFile1,
        edgeList: mockEdgeFile1,
      });
      addCollection({
        name: 'TestCollection_2',
        nodeList: mockNodeFile2,
        edgeList: mockEdgeFile2,
      });

      const originalFrom = getFile(frIndex, from);
      const originalTo = getFile(toIndex, to);

      swapFiles(frIndex, toIndex, from, to);
      expect(getFile(frIndex, from)).toStrictEqual(originalTo);
      expect(getFile(toIndex, to)).toStrictEqual(originalFrom);
    },
  );
});
