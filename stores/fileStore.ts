/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

// auth.js
import { defineStore, acceptHMRUpdate } from 'pinia';
import type { FileCollection } from '~/types/filecollection';

export const useFileStore = defineStore('fileStore', () => {
  const collections: Ref<Array<FileCollection>> = ref([]);
  const nameCount: Ref<number> = ref(1);

  /**
   * delete all collections
   */
  function clearStore() {
    collections.value = [];
  }
  /**
   * Adds a collection to storage
   * @param collection collection to store
   */
  function addCollection(collection: FileCollection) {
    collections.value.push(collection);
  }

  /**
   * Removes a collection from storage
   * @param collectionIndex index to remove
   */
  function deleteCollection(collectionIndex: number) {
    collections.value.splice(collectionIndex, 1);
  }

  /**
   * Removes a collection as long as it is empty
   * @param collectionIndex Index to try to remove
   */
  function deleteIfEmpty(collectionIndex: number) {
    const emptyRow = !getFile(collectionIndex, 'edgeList') && !getFile(collectionIndex, 'nodeList');

    if (emptyRow) deleteCollection(collectionIndex);
  }

  /**
   * Update name of an collection
   * @param collectionIndex collection to update
   * @param name Name to update to
   */
  function updateName(collectionIndex: number, name: string) {
    collections.value[collectionIndex].name = name;
  }

  /**
   * Update a file in a collection
   * @param collectionIndex What collection to update the file in
   * @param collectionColumn Type of file
   * @param file File to update to
   */
  function updateFile(collectionIndex: number, collectionColumn: string, file: File | undefined) {
    collections.value[collectionIndex][collectionColumn] = file;
  }

  /**
   * Retrieve a file from a collection
   * @param collectionIndex Collection index to grab file from
   * @param collectionColumn Type of file to grab
   * @returns File object or undefined if no file available.
   */
  function getFile(collectionIndex: number, collectionColumn: string): File | undefined {
    return collections.value[collectionIndex][collectionColumn] as File | undefined;
  }

  /**
   * Removes a file from a collection
   * @param collectionIndex Collection Index to remove file from
   * @param column Type of file to remove
   */
  function deleteFile(collectionIndex: number, column: string) {
    delete collections.value[collectionIndex][column];
  }

  /**
   * Add a file to a collection
   * @param file File to add
   * @param column Type of file
   */
  function addFile(file: File | undefined, column: string) {
    addCollection({ name: makeName() });
    updateFile(collections.value.length - 1, column, file);
  }

  /**
   * Pushes a file into a new collection if top spot is filled, or fills into empty stop on collection
   * @param file File to push
   * @param column Type of file
   */
  function pushFile(file: File, column: string) {
    const rowCount = collections.value.length;
    let spot = rowCount - 1;

    for (spot; spot >= 0; spot--) if (getFile(spot, column)) break;

    if (spot >= rowCount - 1) addFile(file, column);
    else updateFile(spot + 1, column, file);
  }

  /**
   * Generates an unique name for the graph based on an incrementer
   * @returns New graph name
   */
  function makeName() {
    if (collections.value.length === 0) nameCount.value = 1;
    const autoName = 'Graph ' + nameCount.value;
    nameCount.value++;
    return autoName;
  }

  /**
   * Swap files from collections
   * @param from Collection index to grab file from
   * @param to Collection index to push file to
   * @param fromColumn Column to grab file from
   * @param toColumn Column to push file to
   */
  function swapFiles(from: number, to: number, fromColumn: string, toColumn: string) {
    const drag = getFile(from, fromColumn);
    const drop = getFile(to, toColumn);

    updateFile(to, toColumn, drag);
    updateFile(from, fromColumn, drop);

    deleteIfEmpty(from);
  }

  /**
   * Updates an collection
   * @param collection Collection to update
   * @param collectionIndex Index to put it.
   */
  function updateCollection(collection: FileCollection, collectionIndex: number) {
    collections.value[collectionIndex] = collection;
  }

  return {
    collections,
    clearStore,
    addCollection,
    updateCollection,
    deleteCollection,
    updateFile,
    getFile,
    deleteIfEmpty,
    deleteFile,
    addFile,
    pushFile,
    swapFiles,
    updateName,
  };
});

// make sure to pass the right store definition, `useAuth` in this case.
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFileStore, import.meta.hot));
}
