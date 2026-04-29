<template lang="pug">
.visual-settings-wrapper
  p These settings change the way the graph looks
  .visual-settings
    ContentCheckbox(v-model='model.showLegend')
      template(#icon)
        IconWindow
      template(#text)
        p Show Legend
    ContentCheckbox(v-model='model.showEdgeWeights')
      template(#icon)
        IconPlus
      template(#text)
        p Show Edge weights
    ContentCheckbox(v-model='model.scaleEdgesByWeight')
      template(#icon)
        IconGrow
        IconArrow-right-left
      template(#text)
        p Scale edges by weight
    ContentCheckbox(v-model='model.scaleNodesByDegrees')
      template(#icon)
        IconGrow
        IconGlobe
      template(#text)
        p Scale nodes by degrees
    ContentCheckbox(v-model='model.showAttributesOnHover')
      template(#icon)
        IconDocumenttext
      template(#text)
        p Show attributes on hover
    ContentCheckbox(v-model='model.showDegreeValues')
      template(#icon)
        IconCircleinfo
      template(#text)
        p Show degree values
</template>

<script lang="ts" setup>
import type { graphSettings } from '~/types/graph';

const model = defineModel<graphSettings['visual']>();
</script>

<style scoped>
.visual-settings-wrapper {
  padding-left: 1rem;
  p {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
}
.visual-settings {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  flex-wrap: wrap;
}
</style>
