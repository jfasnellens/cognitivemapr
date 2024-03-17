<!--This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
It is distributed under the GPL 3.0 open source license.-->

<template lang="pug">
.export-wrapper
  .page-wrapper
    .popup-wrapper
      .header
        .text
          h1 Export Data
      .line
      .graphName
        .bold Graph:
        p {{ graphName }}
      .content
        .left
          .selectedScripts
            p Scripts selected:
            .scripts(v-for='script in scripts', :key='script.name')
              .script - {{ script.name }}
        .right
          .DocType
            p Select document Type:
            MultipleSelect(:options-list='optionList', @option-clicked='setOptionsList')
      .footer
        Defaultbutton.cancel(btn-type='back', @click='$emit("closeModal")') Back
        Defaultbutton.accept(v-if='exportTypes.length > 0', btn-type='next', @click='exportFile()') Export
        Defaultbutton.accept(v-else, btn-type='disabled') Export
</template>
<script setup lang="ts">
import { jsPDF as JSPDF } from 'jspdf';
import { useScriptStore } from '#imports';
import type { OptionType, UrlString } from '~/types/exporter';
import type { Graph } from '~/types/graph';

const props = defineProps({
  activeTab: { type: Number, default: 0 },
});

const emit = defineEmits(['closeModal']);

const scriptStore = useScriptStore();
const fileStore = useFileStore();

const graphId = scriptStore.graphIds[props.activeTab];
const graph: Ref<Graph> = ref(
  scriptStore.getGraphs()[graphId ?? Object.keys(scriptStore.getGraphs())[0]],
);
const graphName: Ref<string | undefined> = ref(fileStore.collections[props.activeTab].name);
const scripts: Ref<object[]> = ref([]);
const optionList: Ref<OptionType[]> = ref([
  { value: 'csv', name: 'csv' },
  { value: 'png', name: 'png' },
  { value: 'jpg', name: 'jpg' },
  { value: 'svg', name: 'svg' },
  { value: 'pdf', name: 'pdf' },
]);
const exportTypes: Ref<OptionType[]> = ref([]);

/**
 * export the graph to different files
 * @param types the options you can choose from
 */
function setOptionsList(types: OptionType[]) {
  exportTypes.value = types;
}
/**
 * export the graph to different files
 */
async function exportFile() {
  const exp = await scriptStore.exporter(graph.value, exportTypes.value);

  // setTimeout(() => downloadUrls(exp), 10000)
  downloadUrls(exp);
  emit('closeModal');
}
/**
 * download the urls as their corresponding type
 * @param urls urls with the data init to download.
 */
function downloadUrls(urls: UrlString[]): void {
  // download the files with custom properties like name and fileType.
  urls.forEach((url) => {
    let type: string = url.type;
    if (type === 'pdf') {
      // download pdf with custom properties like name and fileType.
      // l is for landscape
      const pdfLink: JSPDF = new JSPDF('l', 'mm', 'a4');
      // the 900 stands for width.
      // This means that the image is scaled to 300 width
      pdfLink.addImage(url.url, 'jpg', 0, 0, 300, 0);
      pdfLink.save(`${graphName.value}.pdf`);
      return;
    }
    // when type is nodelist or edgelist set it after the graphname.
    let csvType: string = '';
    if (type === 'Nodelist' || type === 'Edgelist') {
      csvType = '-' + type;
      type = 'csv';
    }
    const link = document.createElement('a');
    link.href = url.url;
    link.target = '_blank';
    link.download = `${graphName.value}${csvType}.${type}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}
</script>
<style lang="scss">
.button {
  position: absolute;
  top: 0;
  right: 1rem;
  height: 100%;
  display: flex;
}
.export-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  backdrop-filter: blur(5px);
  background-color: var(--overlay-model);
  z-index: 1000;
  .page-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    .popup-wrapper {
      background-color: var(--background-color);
      border-radius: 25px;
      .header {
        display: flex;
        font-size: 25px;
        font-weight: bold;
        position: relative;
        padding: 1rem;
        .text {
          width: 100%;
          display: flex;
          justify-content: center;
        }
      }
      .line {
        border-bottom: 1px solid var(--dflt-bor1-color);
        width: 100%;
      }
      .graphName {
        font-size: 25px;
        display: flex;
        justify-content: center;
        margin-top: 1rem;
        .bold {
          display: flex;
          justify-content: center;
          flex-direction: column;
          padding-right: 0.5rem;
          font-weight: bold;
        }
      }
      .content {
        padding: 1rem 10rem;
        display: flex;
        .left {
          padding-right: 7rem;
          .selectedScripts {
            font-size: 25px;
            p {
              font-weight: bold;
              margin-bottom: 0.5rem;
            }
          }
        }
        .right {
          .DocType {
            font-size: 25px;
            p {
              font-weight: bold;
              margin-bottom: 0;
            }
          }
        }
      }
      .footer {
        display: flex;
        justify-content: space-between;
        padding: 2rem 4rem;
      }
    }
  }
}
</style>
