<!--This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
It is distributed under the GPL 3.0 open source license.-->

<template lang="pug">
.selector-wrapper
  .zone
    .file-input
      Defaultbutton.uploadButton(@click.prevent)
        slot
      input.file-selector(type='file', accept='text/csv', multiple, @change='onInputChange')
    p.zone-text in .csv format
</template>

<script setup lang="ts">
// source: https://www.smashingmagazine.com/2022/03/drag-drop-file-uploader-vuejs-3/
const emit = defineEmits(['files-selected']);

/**
 * Function to process file input changes
 * @param e input change event
 */
function onInputChange(e: Event) {
  const files = [...e.target.files].filter((file) => file.name.split('.').at(-1) === 'csv');
  emit('files-selected', files);
  e.target.value = '';
}
</script>

<style lang="scss">
.zone {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 5em;
  width: 70%;
  border-radius: 10px;
  align-items: center;

  .file-input {
    background: var(--dflt-nav-color);
    height: 100%;
    width: 100%;
    border-radius: 10px;

    .file-selector {
      position: relative;
      top: 0;
      height: 100%;
      width: 100%;
      opacity: 0;
      cursor: pointer;
    }
    .uploadButton {
      pointer-events: none;
      z-index: 1;
      height: 70%;
      width: 100%;
      position: absolute;
      button {
        width: 100%;
        height: 100%;
      }
    }
  }

  .zone-text {
    position: absolute;
    bottom: 0px;
    font-size: 16px;
    margin: 0 0.1em 0.2em 0.1em;
    cursor: pointer;
    pointer-events: none;
  }
}
</style>
