<!--This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
It is distributed under the GPL 3.0 open source license.-->
<template lang="pug">
.rowWrapper
  .collectionName
    .closeButton(v-if='nodeList || edgeList')
      Defaultbutton.closeRow(btn-type='close', @click='removeRow(index)') 
    .inputWrapper
      input(
        v-if='nodeList || edgeList',
        type='text',
        :value='name',
        @change='nameInput($event, index)'
      )

  .collectionEdgeList(
    :draggable='edgeList !== undefined',
    @dragstart='startDrag($event, index, "edgeList")',
    @drop.prevent='endDrag($event, index, "edgeList")',
    @dragenter.prevent,
    @dragover.prevent
  ) 
    .edgeListName {{ edgeList?.name }}
    .closeButton(v-if='edgeList')
      Defaultbutton.close(btn-type='close', @click='removeFile(index, "edgeList")')

  .collectionNodeList(
    :draggable='nodeList !== undefined',
    @dragstart='startDrag($event, index, "nodeList")',
    @drop.prevent='endDrag($event, index, "nodeList")',
    @dragenter.prevent,
    @dragover.prevent
  ) 
    .nodeListName {{ nodeList?.name }}
    .closeButton(v-if='nodeList')
      Defaultbutton.close(btn-type='close', @click='removeFile(index, "nodeList")')
</template>

<script setup lang="ts">
import { useFileStore } from '@/stores/fileStore';

defineProps({
  name: { type: String, default: '' },
  edgeList: { type: Object as PropType<File>, default: undefined },
  nodeList: { type: Object as PropType<File>, default: undefined },
  index: { type: Number, default: 0 },
});

const fileStore = useFileStore();
const { deleteIfEmpty, deleteFile, deleteCollection, swapFiles, updateName } = fileStore;

// called on "dragstart" event
/**
 * @param e - used to store the cell index and the cell column
 * @param index - dragged elements position in their column
 * @param column - dragged elements column (nodeList or edgeList)
 */
function startDrag(e: DragEvent, index: number, column: string) {
  if (e.dataTransfer) {
    e.dataTransfer.dropEffect = 'move';
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('cellIndex', String(index));
    e.dataTransfer.setData('cellColumn', column);
  }
}

// called on "drop" event,
// retrieves cell index and column and uses it to call swapFiles
/**
 * @param e - used to retrieve cell index and column
 * @param dropIndex - index of the dropped on element
 * @param dropColumn - column of the dropped on element
 */
function endDrag(e: DragEvent, dropIndex: number, dropColumn: string) {
  if (e.dataTransfer) {
    const cellIndex = parseInt(e.dataTransfer!.getData('cellIndex'));
    const cellColumn = e.dataTransfer!.getData('cellColumn');

    swapFiles(cellIndex, dropIndex, cellColumn, dropColumn);
  }
}

/**
 * called by a files Defaultbutton.close element
 * @param index - elements position in column = files index in collection
 * @param column - elements column in table = files object key in collection
 */
function removeFile(index: number, column: string) {
  deleteFile(index, column);
  deleteIfEmpty(index);
}

/**
 * called by a rows Defaultbutton.close element
 * @param index - elements position in column = files index in collection
 */
function removeRow(index: number) {
  deleteCollection(index);
}

// reads and writes user name input
/**
 * @param e - use to retrieve text value from input element
 * @param index - elements position in column = name index in collection
 */
function nameInput(e: Event, index: number) {
  const input = e.target as HTMLInputElement;
  updateName(index, input.value);
}
</script>

<style lang="scss">
.rowWrapper {
  height: 2.5em;
  display: flex;

  .collectionName {
    display: flex;
    align-items: center;

    min-width: 0;
    flex: 0.2 1 0;
    .inputWrapper {
      position: relative;

      flex: 1;
      height: 100%;

      input {
        color: var(--txt-color);
        position: absolute;
        padding-left: 5px;
        border: 0px;
        box-sizing: border-box;
        width: 100%;
        height: 100%;

        background-color: transparent;
        border-bottom: 1px solid var(--dflt-bor2-color);
      }
    }
  }
  .collectionEdgeList {
    border-left: 3px solid var(--dflt-bor1-color);
    border-right: 3px solid var(--dflt-bor1-color);
  }
  .collectionNodeList,
  .collectionEdgeList {
    display: flex;

    justify-content: space-between;
    align-items: center;
    min-width: 0;
    flex: 0.4 1 0;

    cursor: pointer;
    user-select: none;

    .nodeListName,
    .edgeListName {
      flex: 1;
      height: 100%;
      padding-left: 5px;
      display: flex;
      align-items: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      border-bottom: 1px solid var(--dflt-bor2-color);
    }
  }
  .close,
  .closeRow {
    height: 2.5em;
    padding-left: 5px;
    padding-right: 5px;
    border-bottom: 1px solid var(--dflt-bor2-color);
  }

  .close {
    border-left: 1px solid var(--dflt-bor2-color);
  }

  .closeRow {
    border-right: 1px solid var(--dflt-bor2-color);
  }
}
</style>
