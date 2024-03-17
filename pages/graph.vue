<!--This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
It is distributed under the GPL 3.0 open source license.-->

<template lang="pug">
.wrapper
  .midContent
    .tabs
      .tab(v-for='(tab, index) in graphFiles', :key='index', @click='changeTab(index)')
        GraphTab(:selected='localTab === index', :name='tab.name')
    .mainGraphContent.border(v-if='currentVisual === "graph"')
      GraphDisplay(:tab='localTab')
    GraphEdges(v-if='currentVisual === "edgeTable"', :tab='localTab')
    GraphNodes(v-if='currentVisual === "nodeTable"', :tab='localTab')
  .rightContent
    .scripts
      .menu
        ScrollBar
          ToggleList(:header-text='"Analysis Scripts"', :toggle-options='scriptSettings')
          ToggleList(:header-text='"Path Settings"', :toggle-options='pathSettings')
          ToggleList(:header-text='"Visuals"', :toggle-options='visualSettings')
      .visualMenu
        p Display:
        DropDown(:options-list='visualOptions', @change-option='onChange')
    .buttons
      Defaultbutton(btn-type='export', btn-font-size='25px', @click='openExportModal = true') Export
      Defaultbutton(btn-type='back', btn-font-size='25px', @click='router.push("/upload")') Back
  PopupComponentsExport(
    v-if='openExportModal',
    :active-tab='localTab',
    @close-modal='openExportModal = false'
  )
</template>

<script setup lang="ts">
import { useFileStore } from '@/stores/fileStore';
import type { OptionType } from '~/types/exporter';
const router = useRouter();
const fileStore = useFileStore();
const tableStore = useTableStore();
const scriptStore = useScriptStore();
const graphStore = useGraphStore();

const openExportModal: Ref<boolean> = ref(false);

const graphFiles = computed(() => {
  return fileStore.collections;
});

const localTab: Ref<number> = ref(0);
const id = scriptStore.graphIds[localTab.value];
tableStore.graphId = id;

/**
 * Changes the current tab value and set the graphId of the tableStore to the new id
 * @param index The new tab number
 */
function changeTab(index: number) {
  graphStore.activeTab = index;
  if (globalStore.loading) return;
  localTab.value = index;
  const id = scriptStore.graphIds[index];
  tableStore.graphId = id;
}

const visualOptions: OptionType[] = [
  { value: 'graph', name: 'Graph' },
  { value: 'edgeTable', name: 'Edge Table' },
  { value: 'nodeTable', name: 'Node Table' },
];
const currentVisual: Ref<string> = ref('graph');
/**
 * Changes the selected value when using the dropdown menu
 * @param newValue The new value
 */
function onChange(newValue: string) {
  currentVisual.value = newValue;
}
const globalStore = useGlobalStore();
const scriptSettings = globalStore.scriptSettings;
const pathSettings = globalStore.pathSettings;
const visualSettings = globalStore.visualSettings;
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

    .scripts {
      :deep(.toggleWrapper) {
        border-bottom: 1px solid var(--txt-color);
      }
      :deep(.toggleWrapper):last-of-type {
        border-bottom: none;
      }
      :deep(.scrollWrapper) {
        border: 1px solid var(--dflt-bor1-color);
        border-radius: 10px 0px 0px 0px;
        max-height: 51vh;
      }
      :deep(.positionWrapper) {
        max-height: 51vh;
      }

      .visualMenu {
        border: 1px solid var(--dflt-bor1-color);
        border-top: none;
        border-radius: 0px 0px 10px 10px;
        padding: 5px 2px 5px 2px;
        display: flex;
        justify-content: center;

        p {
          margin-right: 8px;
        }
      }
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
</style>
