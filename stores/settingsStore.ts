import { defineStore } from 'pinia';

export const useSettingsStore = defineStore({
  id: 'SettingsStore',
  state: () => ({
    defaultSettings: readonly({
      algorithm: {
        paradigmSupport: true,
        instrumentSupport: false,
        evaluateConcepts: true,
      },
      interaction: {
        showChildren: false,
        showAncestors: true,
      },
      visual: {
        showLegend: true,
        showEdgeWeights: false,
        scaleEdgesByWeight: true,
        scaleNodesByDegrees: false,
        showAttributesOnHover: true,
        showDegreeValues: false,
      },
    }),
  }),
  actions: {}
});
