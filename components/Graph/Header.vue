<!--This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
It is distributed under the GPL 3.0 open source license.-->

<template lang="pug">
thead.tableHead(ref='tableHead')
  //- one row per array in headers
  tr.headerRow(v-for='(header, i) in headers', :key='i')
    //- one column per element in the previously queried array
    //- span is used to set the th colspan
    th.headerColumn(v-for='([head, span], j) in header', :key='j', :colspan='span') 
      .headerTxt {{ head }}
      .floatingBorder
</template>

<script setup lang="ts">
// number is used to set colspan on th elements
defineProps({
  headers: { type: Array<Array<[string, number]>>, default: [] },
});

const tableHead = ref<HTMLElement | undefined>(undefined);
const emit = defineEmits(['theadRenderd']);

onMounted(() => {
  emit('theadRenderd', tableHead.value);
});
</script>

<style lang="scss">
.tableHead {
  position: sticky;
  top: 0;

  background-color: var(--thead-color);

  .headerRow:last-of-type {
    .floatingBorder {
      position: absolute;
      bottom: 0;
      left: 0;

      width: 100%;
      height: 100%;

      border-bottom: 2px solid var(--dflt-bor1-color);
    }
  }

  .headerColumn {
    position: relative;
    border-right: 2px solid var(--dflt-bor1-color);

    &:last-of-type {
      border-right: none;
    }
  }
  .headerTxt {
    white-space: nowrap;
    text-align: center;
    font-weight: bold;

    padding-left: 5px;
    padding-right: 5px;
  }
}
</style>
