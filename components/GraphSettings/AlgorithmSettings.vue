<template lang="pug">
.algorithm-settings-wrapper
  p These settings change the way the graph is calculated
  .algorithm-settings
    ContentCheckbox(v-model='model.paradigmSupport')
      template(#icon)
        IconSpeech
      template(#text)
        p Paradigm Support
    ContentCheckbox(v-model='model.instrumentSupport')
      template(#text)
        p Instrument Support
    ContentCheckbox(v-model='model.evaluateConcepts')
      template(#icon)
        IconNetwork
      template(#text)
        p Evaluate Concepts
</template>

<script lang="ts" setup>
import type { graphSettings } from '~/types/graph';
const model = defineModel<graphSettings['algorithm']>();
</script>

<style scoped>
.algorithm-settings-wrapper {
  padding-left: 1rem;
  p {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
}
.algorithm-settings {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}
</style>
