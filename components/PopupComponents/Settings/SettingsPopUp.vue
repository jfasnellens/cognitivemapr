<!--This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
It is distributed under the GPL 3.0 open source license.-->

<template lang="pug">
.settingPopupWrapper
  .content
    .left
      .options(v-for='(option, index) in options', :key='index')
        .option(@click='optionClicked(index)') {{ option }}
    .right
      .component(v-if='optionChoosen === "Color"')
        PopupComponentsSettingsGeneral(title='Color Settings')
        .optionTitle Options:
        PopupComponentsSettingsColor
      .close
        Defaultbutton(btn-type='close', @click='$emit("closePopup")')
</template>
<script setup lang="ts">
defineEmits(['closePopup']);
const options: Ref<string[]> = ref(['Color']);
const optionChoosen: Ref<string> = ref('Color');

/**
 * Changes the content according to the current active tab
 * @param index The index number of the chosen tab
 */
function optionClicked(index: number) {
  optionChoosen.value = options.value[index];
}
</script>
<style lang="scss" scoped>
.settingPopupWrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: var(--overlay-model);
  z-index: 999;
  height: 100vh;
  align-items: center;
  backdrop-filter: blur(5px);
  .content {
    display: flex;
    .left {
      width: 10rem;
      border-radius: 1.3rem 0 0 1.3rem;
      overflow: hidden;
      margin-right: 0.3rem;
      .options {
        .option {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 4rem;
          background-color: var(--dflt-hvr-color);
          cursor: pointer;
          margin-bottom: 0.3rem;
        }
      }
      .options:last-child {
        .option {
          border-radius: 0 0 0 1.3rem;
          overflow: hidden;
        }
      }
    }
    .right {
      width: 30rem;
      background-color: var(--background-color);
      height: 30rem;
      border-radius: 0 1.3rem 1.3rem 1.3rem;
      display: flex;
      justify-content: space-between;

      .component {
        width: 100%;

        .optionTitle,
        .optionText {
          padding: 0 1.3rem 0.2rem 1.3rem;
          text-align: left;
        }
        .optionTitle {
          margin-bottom: 0.5rem;
          font-size: large;
        }
      }
      .close {
        margin: 0.3em;
      }
    }
  }
}
.line:last-of-type {
  border: none;
}
</style>
