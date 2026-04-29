<!--This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
It is distributed under the GPL 3.0 open source license.-->

<template lang="pug">
.wrapper(v-if='scriptStore.graphIds.length > 0')
  .midContent
    .tabs
      .tab(v-for='(tab, index) in graphFiles', :key='index', @click='changeTab(index)')
        GraphTab(:selected='localTab === index', :name='tab.name')
    .mainGraphContent.border(v-if='currentVisual === "graph"')
      ClientOnly
        GraphDisplay(ref='GraphDisplayComponentRef', :tab='localTab')
    GraphEdges(v-if='currentVisual === "edgeTable"', :tab='localTab')
    GraphNodes(v-if='currentVisual === "nodeTable"', :tab='localTab')
    GraphCausalPower(v-if='currentVisual === "causalPower"', :tab='localTab', :effectConcept='effectConcept')
  .rightContent
    USlideover(v-model='settingsPanel', :overlay='false', :ui='{ width: "w-screen max-w-lg" }')
      .slide-over-wrapper
        GraphSettings(v-model='currentSettings', @close='settingsPanel = false')
    .visualMenu
      .display-dropdown
        p Display:
        DropDown(ref="DisplayDropdown", :options-list='visualOptions', @change-option='onChange')
      .effect-concept-dropdown(v-if='currentVisual === "causalPower"')
        p Effect-concept:
        DropDown(ref="CausalPowerDropdown", :options-list='visualCausalPowerOptions', @change-option='onChangeCausalPower')
    .buttons
      Defaultbutton(btn-type='export', btn-font-size='25px', @click='fitGraph()') Fit to screen
      Defaultbutton(
        btn-type='export',
        btn-font-size='25px',
        @click='settingsPanel = !settingsPanel'
      ) Settings
      Defaultbutton(btn-type='export', btn-font-size='25px', @click='openExportModal = true') Export
      Defaultbutton(btn-type='back', btn-font-size='25px', @click='router.push("/upload")') Back
  PopupComponentsExport(
    v-if='openExportModal',
    :active-tab='localTab',
    :effect-concept='effectConcept'
    @close-modal='openExportModal = false'
  )
</template>

<script setup lang="ts">
import type { OptionType } from '~/types/exporter';
import type { graphSettings, UUID } from '~/types/graph';
import Display from '@/components/Graph/Display.vue';
import DropDown from '~/components/DropDown.vue';
import { isUUID } from '~/scripts/utils';

const router = useRouter();
const fileStore = useFileStore();
const tableStore = useTableStore();
const scriptStore = useScriptStore();
const graphStore = useGraphStore();

const openExportModal: Ref<boolean> = ref(false);

const settingsStore = useSettingsStore();
const defaultSettings = toRaw(settingsStore.defaultSettings);
const currentSettings = ref<graphSettings>(structuredClone(defaultSettings));
const settingsPanel: Ref<boolean> = ref(false);

const graphFiles = computed(() => {
  return fileStore.collections;
});

const localTab: Ref<number> = ref(0);
const id: Ref<string> = ref(scriptStore.graphIds[localTab.value]);
const GraphDisplayComponentRef: Ref<InstanceType<typeof Display>|null> = ref(null);
const CausalPowerDropdown: Ref<InstanceType<typeof DropDown>|null> = ref(null);
const DisplayDropdown: Ref<InstanceType<typeof DropDown>|null> = ref(null);
const effectConcept: Ref<string> = ref("");

/**
 * Changes the current tab value and set the graphId of the tableStore to the new id
 * @param index The new tab number
 */
function changeTab(index: number) {
  if (index === graphStore.activeTab) {
    return;
  }

  if (currentVisual.value === 'causalPower' && scriptStore.graphs[scriptStore.graphIds[index]].hasCycle) {
    globalStore.logError({
      who: `Analysis Scripts - Causal Power`,
      message: `This graph has a cycle in it, which is not supported in our current method for calculating causal power.`,
    });
    DisplayDropdown.value?.setOptionTypeValue('graph');
    onChange('graph');
  }

  graphStore.activeTab = index;
  if (globalStore.loading) return;
  localTab.value = index;
  const id = scriptStore.graphIds[index];
  tableStore.graphId = id;
  scriptStore.causalPowerNodes = [];
  scriptStore.graphNodesValueName = [];
  GraphDisplayComponentRef.value?.switchTab(index);
  scriptStore.updateGraphNodeValueNames(id);
  resetDropdownValue();

  effectConcept.value = "";
}

const visualOptions: OptionType[] = [
  { value: 'graph', name: 'Graph' },
  { value: 'edgeTable', name: 'Edge Table' },
  { value: 'nodeTable', name: 'Node Table' },
  { value: 'causalPower', name: 'Causal Power' },
];
const currentVisual: Ref<string> = ref('graph');
const visualCausalPowerOptions: Ref<Array<OptionType>> = computed(() => scriptStore.graphNodesValueName);

/**
 * Changes the selected value when using the dropdown menu
 * @param newValue The new value
 */
function onChange(newValue: string) {
  const currentGraphId = scriptStore.graphIds[localTab.value];
  const currentGraph = scriptStore.graphs[currentGraphId];
  if (newValue === 'causalPower' && currentGraph.hasCycle) {
    globalStore.logError({
      who: `Analysis Scripts - Causal Power`,
      message: `This graph has a cycle in it, which is not supported in our current method for calculating causal power.`,
    });
    DisplayDropdown.value?.setOptionTypeValue(currentVisual.value);
  }
  else {
    scriptStore.updateGraphNodeValueNames(currentGraphId);
    currentVisual.value = newValue;
    scriptStore.causalPowerNodes = [];
  }
  effectConcept.value = "";
}

function onChangeCausalPower(newValue: string) {
  const currentGraph = scriptStore.graphIds[localTab.value];
  let nodeId: number|UUID = 0;
  if (isUUID(newValue)) {
    nodeId = newValue as UUID;
  }
  else {
    nodeId = parseInt(newValue, 10);
  }
  scriptStore.updateCausalPowerNodes(currentGraph, nodeId);

  effectConcept.value = scriptStore.graphs[currentGraph].nodes[nodeId].nodeName;
}

function resetDropdownValue() {
  CausalPowerDropdown.value?.resetOptionTypeValue();
}

watch(
  currentSettings,
  (value) => {
    handleSettingChange(value);
  },
  { deep: true },
);

/**
 * Sends a fitGraph call to the graph display component
 */
function fitGraph() {
  GraphDisplayComponentRef.value!.fitGraph();
}

/**
 * Handles any change in graph settings from the settings panel
 * @param event Graph settings object
 */
function handleSettingChange(event: graphSettings) {
  const { algorithm, interaction, visual } = event;
  scriptSettings.evaluateConcepts.enabled = algorithm.evaluateConcepts;
  scriptSettings.instrumentSupport.enabled = algorithm.instrumentSupport;
  scriptSettings.paradigmSupport.enabled = algorithm.paradigmSupport;
  pathSettings.showAncestorsOnClick.enabled = interaction.showAncestors;
  pathSettings.showChildrenOnClick.enabled = interaction.showChildren;
  visualSettings.showAttributesOnHover.enabled = visual.showAttributesOnHover;
  visualSettings.showDegreeValues.enabled = visual.showDegreeValues;
  visualSettings.showEdgeWeights.enabled = visual.showEdgeWeights;
  visualSettings.showLegend.enabled = visual.showLegend;
  visualSettings.scaleEdgesByWeight.enabled = visual.scaleEdgesByWeight;
  visualSettings.scaleNodesByDegrees.enabled = visual.scaleNodesByDegrees;
}
const globalStore = useGlobalStore();
const scriptSettings = globalStore.scriptSettings;
const pathSettings = globalStore.pathSettings;
const visualSettings = globalStore.visualSettings;

onMounted(() => {
  tableStore.graphId = id.value;
  if (scriptStore.graphIds.length === 0) router.push('/');
  scriptStore.causalPowerNodes = [];
});
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: row;
  max-height: calc(100vh - 100px);
  .midContent {
    display: flex;
    flex-shrink: 1;
    flex-direction: column;
    width: 85vw;
    margin: 2em;
    .tabs {
      display: flex;
      flex-direction: row;
    }
    .mainGraphContent {
      position: relative;
      display: flex;
      overflow: hidden;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex-grow: 1;
      min-height: 95%;
    }
    .border {
      border: 1px solid var(--dflt-bor1-color);
      border-radius: 0px 10px 10px 10px;
    }
  }
  .rightContent {
    display: flex;
    flex-shrink: 1;
    flex-direction: column;
    padding-top: 4vh;
    margin: 2rem 2rem 2rem 0rem;
    row-gap: 1rem;
    width: 15vw;

    .visualMenu {
      .dropdown-wrapper {
        margin-top: .3rem;
      }
    }

    .effect-concept-dropdown {
      margin-top: 1rem;
    }

    .buttons {
      margin-top: auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      row-gap: 1rem;
      .btn-wrapper {
        min-width: 75%;
        max-width: 100%;
      }
    }
  }
}
.slide-over-wrapper {
  padding: 0.25rem 0.25rem;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
</style>
