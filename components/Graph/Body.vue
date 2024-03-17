<!--This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
It is distributed under the GPL 3.0 open source license.-->

<template lang="pug">
tbody.bodyRowsWrapper
  //- adds an empty array into the columns ref for each row
  //- gets an array filled with the data for the row, index is used as parameter
  tr.bodyRow(v-for='(dataArr, i) in rowData', :ref='columns.push([])', :key='i')
    //- adds itself to one of the previously added arrays
    //- displays text from an element from the previously queried array
    //- listens to a click and calls a function that toggles a class
    td.bodyColumn(
      v-for='(data, j) in dataArr',
      :ref='(col) => columns[i].push(col)',
      :key='j',
      @click='showContent(i, j)'
    )
      .bodyTxt {{ data }}
</template>

<script setup lang="ts">
defineProps({
  rowData: { type: Array<Array<string>>, default: [] },
});

const emit = defineEmits(['show-content']);

// used to toggle the class of a clicked cell
const columns = ref<HTMLElement[][]>([]);

/**
 * toggles the class off the column at i, j
 * @param i - a row in the columns array
 * @param j - a cell in one of the row arrays
 */
function showContent(i: number, j: number) {
  const clicked = columns.value[i][j];
  clicked.classList.toggle('showContent');
  emit('show-content', [i, j]);
}
</script>

<style lang="scss">
.bodyRow {
  background-color: var(--background-color);
}
.bodyRow:nth-child(even) {
  background-color: var(--nth-row-color);
}
.bodyColumn {
  border-right: 2px solid var(--dflt-bor1-color);
  padding: 0.2em 0.5em;
  width: fit-content;
  max-width: 3em;

  transition: background-color 0.2s;

  &:last-of-type {
    border-right: none;
  }

  .bodyTxt {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
  }
}
.showContent {
  .bodyTxt {
    overflow: visible;
    border-radius: 10px;
  }
  max-width: fit-content;
  background-color: var(--dflt-bor2-color-d);
}
</style>
