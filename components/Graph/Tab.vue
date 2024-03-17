<!--This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
It is distributed under the GPL 3.0 open source license.-->

<template lang="pug">
.tabWrapper
  .name(:class='{ selected: localSelected }') 
    p {{ localName }}
</template>

<script setup lang="ts">
const props = defineProps({
  selected: { type: Boolean, default: false },
  name: { type: String, default: 'No Graph name' },
});

const localSelected = computed(() => {
  return props.selected;
});

const localName = computed(() => {
  return props.name;
});
</script>

<style scoped lang="scss">
.tabWrapper {
  display: flex;
  height: fit-content;
  width: fit-content;
  > .name {
    max-width: 7rem;
    cursor: pointer;
    display: flex;
    background-color: var(--fad-btn-color);
    align-items: center;
    border: 1px solid var(--dflt-bor1-color);
    border-bottom: 0px;
    border-radius: 10px 10px 0px 0px;
    margin: auto;
    padding: 5px;
    > p {
      text-align: center;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    &.selected {
      background-color: var(--dflt-btn-color);
    }
  }
}
</style>
