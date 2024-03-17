<!--This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
It is distributed under the GPL 3.0 open source license.-->

<template lang="pug">
//- The scrollbar component is given the table head height 
//- this will be used to reduce the scroll area
.tableWrapper
  ScrollBar(ref='scrollBar')
    table
      GraphHeader(:headers='columns', @thead-renderd='updateTop')
      GraphBody(:row-data='info', @show-content='updateScrollBar')
</template>

<script setup lang="ts">
import type { ScrollBar } from '#build/components';

defineProps({
  info: { type: Array<Array<string>>, default: [] },
  columns: { type: Array<Array<[string, number]>>, default: [] },
});

const scrollBar = ref<InstanceType<typeof ScrollBar> | undefined>(undefined);

const bottomLeftRadius = ref();
const bottomRightRadius = ref();

/**
 * sets the top ref of the scrollbar component
 * to make the scroll thumb start below the table head
 * @param headerHeight table head height in pixels
 */
function updateTop(headerHeight: number) {
  if (scrollBar.value) scrollBar.value.top = headerHeight;
}
/**
 * calls onChange to update scroll thumb size and position
 */
function updateScrollBar() {
  if (scrollBar.value) scrollBar.value.onChange();
}

onMounted(() => {
  bottomLeftRadius.value = scrollBar.value?.xOverFlow ? '0' : '10px';
  bottomRightRadius.value = scrollBar.value?.xOverFlow || scrollBar.value?.yOverFlow ? '0' : '10px';
});
</script>

<style scoped lang="scss">
.tableWrapper {
  width: fit-content;
  max-width: 75vw;
  height: 95%;

  display: flex;
  flex-direction: column;
}
:deep(.scrollWrapper) {
  border: 1px solid var(--dflt-bor1-color);
  border-top-left-radius: 0;
  border-top-right-radius: 10px;
  border-bottom-left-radius: v-bind(bottomLeftRadius);
  border-bottom-right-radius: v-bind(bottomRightRadius);
}
table {
  border-spacing: 0;
}
</style>
