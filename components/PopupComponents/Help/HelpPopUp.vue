<!--This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
It is distributed under the GPL 3.0 open source license.-->

<template lang="pug">
.helpPopupWrapper
  .content
    .left
      .options(v-for='(option, index) in options', :key='index')
        .option(@click='optionClicked(index)') {{ option }}
    .right
      .component
        ScrollBar
          PopupComponentsHelpGeneral(
            v-if='optionChoosen === "General"',
            title='General Explanations',
            text='CognitiveMapr is here to assist you in creating and comparing cognitive maps. Simply upload a node list and an edge list in .csv format and Cognitive Mapr will create a visualisation and perform data analysis for you. \n\nPressing the start button on the first page will take you to the upload page. Here you can upload your edgelist and nodelist of a speech. It is also possible to only upload an edgelist of a speech. In this case, the nodelist will be generated automatically. When you have uploaded your data, you can press next. Your speech will now be analysed and a graph will be generated. \n\nThe last page is the graph page. Here you can see the visualisation based on the scripts you have choosen. At the end you can export your graph\'s data to export formats of your choosing. \n \nSee the other explanatory pages for more detailed explanations about the pages and the export pop-up.'
          )
          PopupComponentsHelpGeneral(
            v-if='optionChoosen === "Home Page"',
            title='Home Page Explanations',
            :image='`Home${colorMode}.png`',
            text='A. Help button: click here to get explanations about the website. \nB. Settings button: click here if you want to change the settings of the website. \nC. Start button: click here to go to the upload page.'
          )
          PopupComponentsHelpGeneral(
            v-if='optionChoosen === "Upload Page"',
            title='Upload Page Explanations',
            :image='`Upload${colorMode}.png`',
            text='A. Website name: click here to go to the home page. \nB. Remove graph button: click here to remove the entire row. \nC. Remove file button: click here to remove the file. \nD. The file: the file is draggable. So it could be moved to another cell. \nE. Graph name: click here to change the graph name. \nF. Drag and Drop box: Drag here a file from your file explorer to add it to the table. \nG. Upload edge lists button: click here to add a edge list file to the table. \nH. Upload node lists button: click here to add a node list file to the table. \nI. Back button: click here to go to the previous page. \nJ. Clear table button: click here to remove all the files from the table. \nK. Next button: click here to go to the graph page.'
          )
          PopupComponentsHelpGeneral(
            v-if='optionChoosen === "Graph Page"',
            title='Graph Page Explanations',
            :image='`Graph${colorMode}.png`',
            text='A. Tab: click here to show the corresponding graph. \nB. Move legend button: drag to move the legend to another place inside the graph. \nC. legend color button: click here to change the color of the paradigm or effect. \nD. legend option: click here to highlight the corresponding paradigm or effect. \nE. Search bar: Type here a node name to highlight it. \nF. Edge: hover to see the weight of the edge. \nG. Attribute option: click here to enable or disable the corresponding functionality. \nH. Node: hover to see all the information about the corresponding node; click to see its children and/or anestors. \nI. Zoom buttons: click here to zoom in or out in the graph. \nJ. Display dropdown: click here to change the display to the node or edge table. \nK. Export button: click here to go to the export pop-up.'
          )
          PopupComponentsHelpGeneral(
            v-if='optionChoosen === "Choose Evaluation Values Pop-up"',
            title='Choose Evaluation Values Pop-up',
            :image='`Cycle${colorMode}.png`',
            text='A. Option evaluation values: click here to select this set of values for the evaluate concept calculations. \nB. Don\'t run scripts button: click here to go to the graph page without running any scripts. \nC. Use selected values button: click here to go to the graph page with the choosen values.'
          )
          PopupComponentsHelpGeneral(
            v-if='optionChoosen === "Export Pop-up"',
            title='Export Pop-up Explanations',
            :image='`Export${colorMode}.png`',
            text='A. Export option: click here to select this document type for the export. \nB. Export button: click here to download the document(s).'
          )
          PopupComponentsHelpContact(v-if='optionChoosen === "Contact"', title='Contact')
      .closeWrapper
        Defaultbutton(btn-type='close', @click='$emit("closePopup")')
</template>

<script setup lang="ts">
defineEmits(['closePopup']);
const globalStore = useGlobalStore();
const options: Ref<string[]> = ref([
  'General',
  'Home Page',
  'Upload Page',
  'Graph Page',
  'Choose Evaluation Values Pop-up',
  'Export Pop-up',
  'Contact',
]);
const optionChoosen: Ref<string> = ref('General');
const colorMode = computed(() => {
  return globalStore.colorBlindMode ? 'Colorblind' : 'Light';
});

/**
 * Changes the content according to the current active tab
 * @param index The index number of the chosen tab
 */
function optionClicked(index: number) {
  optionChoosen.value = options.value[index];
}
</script>

<style lang="scss" scoped>
.helpPopupWrapper {
  background-color: var(--overlay-model);
  z-index: 999;
  height: 100vh;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px);
  .content {
    width: 75vw;
    height: 70vh;
    display: flex;
    .left {
      width: 15%;
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
      width: 85%;
      background-color: var(--background-color);
      height: 100%;
      border-radius: 0 1.3rem 1.3rem 1.3rem;
      display: flex;
      .component {
        width: 99%;
        :deep(.scrollBarYTrack) {
          top: 1.3rem;
          bottom: 1.3rem;
          right: -3.5rem;
        }
      }
      .closeWrapper {
        margin: 1rem 1rem 0rem 0rem;
      }
    }
  }
}
.line:last-of-type {
  border: none;
}
</style>
