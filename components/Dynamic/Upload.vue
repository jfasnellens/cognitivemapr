<!--This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
It is distributed under the GPL 3.0 open source license.-->

<template lang="pug">
.uploadWrapper
  .headerRow
    .graphColumn
      h3 Graphs
    .edgeColumn
      h3 Edge files
    .nodeColumn
      h3 Node files

  .contentWrapper
    .rowsWrapper
      ScrollBar(direction='vertical')
        .collectionRow(v-for='({ name, edgeList, nodeList }, index) in collections', :key='name')
          DynamicRow(:name='name', :edge-list='edgeList', :node-list='nodeList', :index='index')

    .addFileRow
      .dummyNameRow
      .addEdgeFile(
        @drop.prevent='newRowDrag($event, "edgeList")',
        @dragenter.prevent,
        @dragover.prevent
      ) Drag file here to add new row
      .addNodeFile(
        @drop.prevent='newRowDrag($event, "nodeList")',
        @dragenter.prevent,
        @dragover.prevent
      ) Drag file here to add new row

  .inputRow
    .fileSelectorWrapper
    DynamicSelector(@files-selected='(files) => addFiles(files, "edgeList")') Upload edge lists
    DynamicSelector(@files-selected='(files) => addFiles(files, "nodeList")') Upload node lists
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useFileStore } from '@/stores/fileStore';

const fileStore = useFileStore();
const { collections } = storeToRefs(fileStore);
const { pushFile, addFile, getFile, deleteFile, deleteIfEmpty } = fileStore;

// function called by edge/node files button
/**
 * @param files - Passed to the function by a Selector component
 * @param column - The column of the clicked selector component
 */
function addFiles(files: File[], column: string) {
  files.forEach((file) => {
    pushFile(file, column);
  });
}

// called on "drop" event when dropped on the .addFileRow
// retrieves cell index and column and uses it to call addFile
// if index/column doesn't exist add files from datatransfer
/**
 * @param e - Represents dragging from cell to cell or from file selector to the Upload component
 * @param dropColumn - Column the drop event takes place
 */
function newRowDrag(e: DragEvent, dropColumn: string) {
  if (e.dataTransfer) {
    const cellIndex = parseInt(e.dataTransfer!.getData('cellIndex'));
    const cellColumn = e.dataTransfer!.getData('cellColumn');

    const bothExist = !Number.isNaN(cellIndex) && cellColumn !== undefined;

    if (bothExist) {
      const drag = getFile(cellIndex, cellColumn);

      addFile(drag, dropColumn);
      deleteFile(cellIndex, cellColumn);

      deleteIfEmpty(cellIndex);
    } else {
      const files = [...e.dataTransfer.files].filter(
        (file) => file.name.split('.').at(-1) === 'csv',
      );
      addFiles(files, dropColumn);
    }
  }
}
</script>

<style scoped lang="scss">
.uploadWrapper {
  border: 1px solid var(--dflt-bor1-color);
  border-radius: 10px;

  font-family: sans-serif;

  width: 70%;
  min-width: 515px;

  .contentWrapper {
    display: flex;
    flex-flow: column;
    height: 15em;
  }
  .rowsWrapper {
    width: 100%;
    max-height: 10em;
    .collectionRow:nth-child(even) {
      background-color: var(--nth-row-color);
    }
  }
}
.headerRow {
  width: 100%;
  border-radius: 8px 8px 0px 0px;
  border-bottom: 3px solid var(--dflt-bor1-color);
  font-weight: bold;
  font-size: 20px;
  text-align: center;
  display: flex;
  background-color: var(--thead-color);

  div {
    min-width: 0;
    flex: 0.4 1 0;
  }
  .graphColumn {
    min-width: 0;
    flex: 0.2 1 0;
  }
  .edgeColumn {
    border-left: 3px solid var(--dflt-bor1-color);
    border-right: 3px solid var(--dflt-bor1-color);
  }
}
.addFileRow {
  display: flex;
  min-height: 5em;

  flex: 1;

  div {
    min-width: 0;
    flex: 0.4 1 0;
    padding-top: 1em;
    font-size: medium;
    font-style: italic;
    text-align: center;
  }
  .addEdgeFile {
    border-right: 3px solid var(--dflt-bor1-color);
    border-left: 3px solid var(--dflt-bor1-color);
  }
  .dummyNameRow {
    min-width: 0;
    flex: 0.2 1 0;
  }
}
.inputRow {
  border-top: 1px solid var(--dflt-bor1-color);
  display: flex;

  div {
    display: flex;
    align-items: center;
    justify-content: center;

    margin-top: 10px;
    margin-bottom: 10px;

    min-width: 0;
    flex: 0.4 1 0;

    &:first-of-type {
      min-width: 0;
      flex: 0.2 1 0;
    }
  }
}
</style>
