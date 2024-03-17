<!--This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
It is distributed under the GPL 3.0 open source license.-->

<template lang="pug">
.edgesWrapper
  GraphTable(:info='edges', :columns='header')
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useGlobalStore } from '@/stores/globalStore';
import { useTableStore } from '@/stores/tableStore';
import { useScriptStore } from '@/stores/scriptStore';

const props = defineProps({
  tab: { type: Number, default: 0 },
});

// watcher for refreshing the graph to a new graph
watch(
  () => props.tab,
  () => {
    edges.value = relevantEdgeStrings();
  },
);

const globalStore = useGlobalStore();
// function used for filtering the edgeArray
const { relevantObjectData } = globalStore;

const tableStore = useTableStore();
// get the header titles, keys to show from the Edge type, graph to display
const { edgeKeyAliases, relevantEdgeKeys, graphId } = storeToRefs(tableStore);
const { relevantOrderedHeader, relevantOrderedStrings } = tableStore;

const scriptStore = useScriptStore();
const { getGraphs } = scriptStore;

const header = ref(relevantOrderedHeader(edgeKeyAliases.value, relevantEdgeKeys.value));
const edges = ref(relevantEdgeStrings());

/**
 * @returns - an array of string arrays, each array represents a row in the Body.vue component
 */
function relevantEdgeStrings(): string[][] {
  const edges =
    graphId.value !== undefined
      ? getGraphs()[graphId.value!].edgeArray
      : Object.values(getGraphs())[0].edgeArray;
  const relevantData: object[] = relevantObjectData(edges, relevantEdgeKeys.value);
  const relevantStrings: string[][] = [];
  relevantData.forEach((obj) => {
    relevantStrings.push(relevantOrderedStrings(obj, relevantEdgeKeys.value));
  });
  return relevantStrings;
}
</script>

<style>
/* necessary for vertical overflow */
.edgesWrapper {
  height: 100%;
}
</style>
