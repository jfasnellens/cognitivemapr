<!--This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
It is distributed under the GPL 3.0 open source license.-->

<template lang="pug">
.colorPickerWrapper
  .pickerPointer
  .pickerHeader
  | Select Color
  .pickerColors
    .color(
      v-for='(color, id) in currentColors',
      :key='id',
      :style='`background-color: ${color}`',
      @click='$emit("colorSelected", color)'
    )
</template>
<script setup lang="ts">
const globalStore = useGlobalStore();
const colors: Array<string> = [
  '#B50000',
  '#FC6666',
  '#FFC94A',
  '#FFFF30',
  '#25EB36',
  '#64A5FA',
  '#8577DE',
  '#D359E5',
  '#f9f9f9',
  '#8b8b8b',
  '#2e2e2e',
];

const colorsColorBlind: Array<string> = [
  '#f9f9f9',
  '#DCDCDC',
  '#A2A2A2',
  '#2e2e2e',
  '#9C0A31',
  '#79E279',
  '#E66100',
  '#5D3A9B',
  '#D851E6',
  '#FFC20A',
  '#2097B7',
];

const currentColors = computed(() => {
  return globalStore.colorBlindMode ? colorsColorBlind : colors;
});
</script>

<style lang="scss">
.colorPickerWrapper {
  position: absolute;
  top: 3.6em;
  left: 0.31em;
  text-align: center;
  width: 8em;
  border: 1px solid var(--dflt-bor1-color);
  border-radius: 0.5em;
  background-color: var(--background-color);
  .pickerPointer {
    position: absolute;
    left: 10px;
    top: -6px;
    background-color: var(--background-color);
    rotate: 45deg;
    border-left: 1px solid var(--dflt-bor1-color);
    border-top: 1px solid var(--dflt-bor1-color);
    height: 0.6em;
    width: 0.6em;
  }
  .pickerColors {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .color {
      box-sizing: border-box;
      height: 1.2em;
      width: 1.2em;
      border: 1px solid rgb(60, 60, 60);
      border-radius: 1em;
      margin: 0.3em;
      &:hover {
        border: 2px solid rgb(60, 60, 60);
      }
    }
  }
}
</style>
