<!--This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
It is distributed under the GPL 3.0 open source license.-->

<template lang="pug">
.colorWrapper
  .colorChoice
    .darkmode.choice
      label.switch(for='darkmode')
        input#darkmode(v-model='globalStore.darkMode', type='checkbox', @change='darkModeToggled')
        span.slider
      .toggleText Dark Mode
    .colorBlind.choice
      label.switch(for='colorblindmode')
        input#colorblindmode(
          v-model='globalStore.colorBlindMode',
          type='checkbox',
          @change='colorBlindModeToggled'
        )
        span.slider
      .toggleText Color Blind Mode
</template>
<script setup lang="ts">
const globalStore = useGlobalStore();
const graphStore = useGraphStore();
const scriptStore = useScriptStore();

/**
 * function for enabling and disabling darkmode
 */
function darkModeToggled() {
  globalStore.colorBlindMode = false;
  const id = scriptStore.graphIds[graphStore.activeTab];
  const graphData = scriptStore.getGraphs()[id];
  if (graphData) graphData.settings = scriptStore.getDefaultSettings(graphData.paradigmPair);
  globalStore.toggleDarkMode(globalStore.darkMode);
}

/**
 * function for enabling and disabling colorbindmode
 */
function colorBlindModeToggled() {
  globalStore.darkMode = false;
  const id = scriptStore.graphIds[graphStore.activeTab];
  const graphData = scriptStore.getGraphs()[id];
  if (graphData) graphData.settings = scriptStore.getDefaultSettings(graphData.paradigmPair);
  globalStore.toggleColorBlindMode(globalStore.colorBlindMode);
}
</script>

<style lang="scss" scoped>
.colorWrapper {
  padding: 0 1.3rem 0 1.3rem;
  background-color: var(--background-color);
}
.colorChoice {
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
}
.choice {
  display: flex;
  align-items: center;
  .toggleText {
    margin-left: 5px;
  }
  .checkbox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-right: 0.5rem;
    cursor: pointer;
    .checked {
      height: 1rem;
      width: 1rem;
      background: green;
    }
    .unChecked {
      height: 1rem;
      width: 1rem;
      background: red;
    }
  }
  .switch {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 24px;
    input {
      opacity: 0;
      width: 0;
      height: 0;
    }
    .slider {
      position: absolute;
      cursor: pointer;
      border-radius: 34px;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      -webkit-transition: 0.4s;
      transition: 0.4s;
      &:before {
        position: absolute;
        content: '';
        height: 18px;
        width: 18px;
        border-radius: 50%;
        left: 4px;
        bottom: 3px;
        background-color: white;
        -webkit-transition: 0.4s;
        transition: 0.4s;
      }
    }
  }
  input:checked + .slider {
    background-color: var(--dflt-btn-color);
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #ccc;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(15px);
    -ms-transform: translateX(15px);
    transform: translateX(15px);
  }
}
</style>
