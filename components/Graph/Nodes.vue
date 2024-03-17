<!--This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
It is distributed under the GPL 3.0 open source license.-->

<template lang="pug">
.nodesWrapper
  GraphTable(:info='nodes', :columns='header')
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
    nodes.value = relevantNodeStrings();
  },
);

const globalStore = useGlobalStore();
// function used for filtering the nodeArray
const { relevantObjectData } = globalStore;

const tableStore = useTableStore();
// get the header titles, keys to show from the Node type, graph to display
const { nodeKeyAliases, relevantNodeKeys, graphId } = storeToRefs(tableStore);
const { relevantOrderedHeader, relevantOrderedStrings } = tableStore;

const scriptStore = useScriptStore();
const { getGraphs } = scriptStore;

const header = ref(relevantOrderedHeader(nodeKeyAliases.value, relevantNodeKeys.value));
const nodes = ref(relevantNodeStrings());
/**
 * @returns - an array of string arrays, each array represents a row in the Body.vue component
 */
function relevantNodeStrings(): string[][] {
  // use graphId or pick the first graph
  const nodes =
    graphId.value !== undefined
      ? getGraphs()[graphId.value!].nodeArray
      : Object.values(getGraphs())[0].nodeArray;
  const relevantData: object[] = relevantObjectData(nodes, relevantNodeKeys.value);
  const relevantStrings: string[][] = [];
  relevantData.forEach((obj) => {
    relevantStrings.push(relevantOrderedStrings(obj, relevantNodeKeys.value));
  });
  return relevantStrings;
}
</script>
<style>
/* necessary for vertical overflow */
.nodesWrapper {
  height: 100%;
}
</style>
