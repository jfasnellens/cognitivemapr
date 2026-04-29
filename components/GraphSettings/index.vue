<template lang="pug">
.settings-panel-wrapper
  .header
    .left
      UButton.flex.end-5.top-5.z-10(
        color='gray',
        variant='ghost',
        size='sm',
        icon='i-heroicons-x-mark-20-solid',
        square,
        padded,
        @click='$emit("close")'
      )
    .middle
      h1 Settings
    .right
      label Open all
      UCheckbox(v-model='openAll')
  p(v-if='openAll', style='visibility: hidden')
  .content-wrapper
    UAccordion(
      :key='openAll',
      :items='items',
      :multiple='openAll',
      :default-open='openAll',
      variant='soft'
    )
      template(#AlgoritmSettings)
        GraphSettingsAlgorithmSettings(v-model='settings.algorithm')
      template(#InteractionSettings)
        GraphSettingsInteractionSettings(v-model='settings.interaction')
      template(#VisualSettings)
        GraphSettingsVisualSettings(v-model='settings.visual')
</template>

<script lang="ts" setup>
import type { graphSettings } from '~/types/graph';
const model = defineModel<graphSettings>();
defineEmits(['close']);

// Reactive combined model
const settings = reactive<graphSettings>({
  algorithm: {
    paradigmSupport: true,
    instrumentSupport: false,
    evaluateConcepts: true,
  },
  interaction: {
    showChildren: true,
    showAncestors: false,
  },
  visual: {
    showLegend: true,
    showEdgeWeights: false,
    scaleEdgesByWeight: true,
    scaleNodesByDegrees: false,
    showAttributesOnHover: true,
    showDegreeValues: false,
  },
});

// Watch the parent model and update the local settings accordingly
watch(
  model,
  (value) => {
    if (value) {
      if (value.algorithm) settings.algorithm = value.algorithm;
      if (value.interaction) settings.interaction = value.interaction;
      if (value.visual) settings.visual = value.visual;
    }
  },
  { deep: true },
);

// Watch local settings and propagate changes back to the parent model
watch(
  settings,
  () => {
    model.value!.algorithm = settings.algorithm;
    model.value!.interaction = settings.interaction;
    model.value!.visual = settings.visual;
  },
  { deep: true },
);

const openAll = ref(true);

// Accordion items
const items = [
  {
    label: 'Algorithm settings',
    icon: 'i-heroicons-wrench-screwdriver',
    slot: 'AlgoritmSettings',
  },
  {
    label: 'Interaction settings',
    icon: 'i-heroicons-cursor-arrow-ripple',
    slot: 'InteractionSettings',
  },
  {
    label: 'Visual settings',
    icon: 'i-heroicons-chart-bar',
    slot: 'VisualSettings',
    defaultOpen: true,
  },
];

settings.algorithm = model.value!.algorithm;
settings.interaction = model.value!.interaction;
settings.visual = model.value!.visual;
</script>

<style scoped>
.settings-panel-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .content-wrapper {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow-y: auto;
    scrollbar-width: thin;
    align-items: center;
  }
}
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .middle,
  .left {
    max-width: 33%;
    flex-grow: 1;
  }
  .right {
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;
    align-content: center;
    flex-grow: 1;
    max-width: 33%;
  }
}
h1 {
  text-align: center;
  font-size: 1rem;
}
</style>
