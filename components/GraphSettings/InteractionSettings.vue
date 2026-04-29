<template lang="pug">
.interaction-settings-wrapper
  p These settings change the way the graph reacts to you
  .interaction-settings
    ContentCheckbox(v-model='model.showChildren')
      template(#icon)
        IconForward
      template(#text)
        p Show Children
    ContentCheckbox(v-model='model.showAncestors')
      template(#icon)
        IconBackward
      template(#text)
        p Show Ancestors
</template>

<script lang="ts" setup>
import type { graphSettings } from '~/types/graph';

const model = defineModel<graphSettings['interaction']>();
</script>

<style scoped>
.interaction-settings-wrapper {
  padding-left: 1rem;
  p {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
}
.interaction-settings {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  flex-wrap: wrap;
}
</style>
