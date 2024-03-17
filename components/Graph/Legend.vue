<!--This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
It is distributed under the GPL 3.0 open source license.-->

<template lang="pug">
#legendWrapper(ref='legendWrapper', :style='{ top: positionY + "px", left: positionX + "px" }')
  #header(ref='legendHeader')
    | Legend
    #ignoreForCanvas
      svgo-move
  .legend
    .entry(v-for='(entry, id) in graph.settings.legend', :key='id')
      .paradigmEntry(
        v-if='entry.type === EntryType.Paradigm && scriptSettings.paradigmSupport.enabled'
      )
        .circle(
          :style='`background-color: ${entry.color}`',
          @click.stop='openColorPicker($event, id)'
        )
        .entryText(
          ref='nodeText',
          @click='(e) => { highLightNodes(id); e.target.classList.toggle("active"); }'
        ) {{ entry.text }}
      .edgeEntry(v-if='entry.type == EntryType.Arrow')
        .arrow(@click.stop='openColorPicker($event, id)')
          svgo-arrowRight(:style='`color: ${entry.color}`')
        .entryText(
          ref='edgeText',
          @click=`(e) => { 
          if(e.target.classList.contains("active")){
            hideEdges("none");
            e.target.classList.remove("active");
          }
          else {
            hideEdges(id); 
            edgeText.forEach(el => el.classList.remove("active"));
            e.target.classList.toggle("active"); 
          }
        }`
        ) {{ entry.text }}
    GraphColorPicker(
      v-show='colorPicker.show',
      :style='{ top: colorPicker.position }',
      @color-selected='(color) => changeColor(color)'
    )
</template>

<script setup lang="ts">
// Provides the right names for paradigms in the legend
import { storeToRefs } from 'pinia';
import { useScriptStore } from '@/stores/scriptStore';
import type { Graph } from '~/types/graph';
import { EntryType } from '~/types/graph';

const props = defineProps({
  tab: { type: Number, default: 0 },
});

watch(
  () => props.tab,
  () => {
    // reset show edge and highlight node settings
    edgeText.value.forEach((e) => e.classList.remove('active'));
    graph.value.settings.show.positiveEdges = true;
    graph.value.settings.show.negativeEdges = true;
    graph.value.settings.show.neutralEdges = true;
    graph.value.settings.highlight.paradigmA = false;
    graph.value.settings.highlight.paradigmB = false;
    graph.value.settings.highlight.paradigmNone = false;

    makeLegend();
  },
);

const scriptStore = useScriptStore();
const globalStore = useGlobalStore();

const emit = defineEmits(['color-changed']);

const edgeText = ref<HTMLElement[]>([]);
const nodeText = ref<HTMLElement[]>([]);
const graph: Ref<Graph> = ref(
  scriptStore.getGraphs()[
    scriptStore.graphIds[props.tab] ?? Object.keys(scriptStore.getGraphs())[0]
  ],
);

const { scriptSettings } = storeToRefs(globalStore);

/**
 * Open/close color picker when a color circle is clicked
 * @param e event from the eventhandler
 * @param id clicked entry's identifier to select correct color to change
 */
function openColorPicker(e: MouseEvent, id: string) {
  colorPicker.value.show = !colorPicker.value.show;
  colorPicker.value.position = 26 + e.target?.offsetTop + 'px';
  colorPicker.value.parent = id;
}

/**
 * Toggles edge hide settings in the globalStore
 * @param id type of edge to hide
 */
function hideEdges(id: string) {
  switch (id) {
    case 'positiveEdge':
      graph.value.settings.show.positiveEdges = true;
      graph.value.settings.show.negativeEdges = false;
      graph.value.settings.show.neutralEdges = false;
      break;
    case 'negativeEdge':
      graph.value.settings.show.negativeEdges = true;
      graph.value.settings.show.positiveEdges = false;
      graph.value.settings.show.neutralEdges = false;
      break;
    case 'neutralEdge':
      graph.value.settings.show.neutralEdges = true;
      graph.value.settings.show.negativeEdges = false;
      graph.value.settings.show.positiveEdges = false;
      break;
    case 'none':
      graph.value.settings.show.neutralEdges = true;
      graph.value.settings.show.negativeEdges = true;
      graph.value.settings.show.positiveEdges = true;
  }
}
/**
 * Toggles settings in the globalStore
 * @param id paradigm type to highlight
 */
function highLightNodes(id: string) {
  switch (id) {
    case 'paradigmA':
      graph.value.settings.highlight.paradigmA = !graph.value.settings.highlight.paradigmA;
      break;
    case 'paradigmB':
      graph.value.settings.highlight.paradigmB = !graph.value.settings.highlight.paradigmB;
      break;
    case 'noParadigm':
      graph.value.settings.highlight.paradigmNone = !graph.value.settings.highlight.paradigmNone;

      break;
  }
}

window.addEventListener('click', (e) => {
  if (colorPicker.value.show) {
    if (
      document.querySelector('.colorPickerWrapper') &&
      !document.querySelector('.colorPickerWrapper').contains(e.target)
    ) {
      colorPicker.value.show = false;
    }
  }
});

/**
 * Function to change the associated color in the graph settings object
 * @param color new color to set the value to
 */
function changeColor(color: string) {
  graph.value.settings.legend[colorPicker.value.parent].color = color;
  colorPicker.value.parent = '';
  colorPicker.value.show = false;
  emit('color-changed');
}

// The code below concerns positioning of the legend
const positionX: Ref<number> = ref(10);
const positionY: Ref<number> = ref(10);
const offsetX: Ref<number> = ref(0);
const offsetY: Ref<number> = ref(0);
const legendWrapper = ref<HTMLElement | undefined>();
const legendHeader = ref();
const colorPicker = ref({
  position: '0px',
  show: false,
  parent: '',
});

/**
 *
 */
function makeLegend() {
  if (scriptStore.graphIds.length <= 0) {
    graph.value = scriptStore.getGraphs()[Object.keys(scriptStore.getGraphs())[0]];
  } else {
    const id = scriptStore.graphIds[props.tab];
    graph.value = scriptStore.getGraphs()[id];
  }
}

onMounted(() => {
  makeLegend();
  dragElement();
  let legendBB: DOMRect;
  if (legendWrapper && legendWrapper.value) {
    legendBB = legendWrapper.value.getBoundingClientRect();
    legendWrapper.value.style.minWidth = legendBB?.width + 'px';
  }

  window.addEventListener('resize', () => updatePosition(positionX.value, positionY.value));
});

onUnmounted(() => {
  window.removeEventListener('resize', () => updatePosition(positionX.value, positionY.value));
});

onUpdated(() => {
  updatePosition(positionX.value, positionY.value);
});

/**
 * function is used for dragging the legend and to keep the legend within its parent
 * @param x - new vertical position
 * @param y - new horizontal position
 */
function updatePosition(x: number, y: number) {
  // calculate the new cursor position:
  if (legendWrapper.value) {
    const graphDisplay = legendWrapper.value.parentElement;

    if (graphDisplay) {
      const graphBB = graphDisplay.getBoundingClientRect();
      const legendBB = legendWrapper.value.getBoundingClientRect();
      const maxX = graphBB.width - legendBB?.width - 10;
      const maxY = graphBB.height - legendBB?.height - 10;

      // set the element's new position:
      positionX.value = Math.min(Math.max(10, x), maxX);
      positionY.value = Math.min(Math.max(10, y), maxY);
    }
  }
}

/**
 * Function that allows draging an element with the mouse.
 */
function dragElement() {
  legendHeader.value.onmousedown = dragMouseDown;

  /**
   * Function that activates when holding the mouse button down.
   * @param e The mouse event
   */
  function dragMouseDown(e: MouseEvent) {
    e.preventDefault();

    // get the offset of the mouse position compared to the legend position
    if (legendWrapper.value) {
      const graphDisplay = legendWrapper.value.parentElement;

      if (graphDisplay) {
        const graphBB = graphDisplay.getBoundingClientRect();
        offsetX.value = e.clientX - positionX.value - graphBB.x;
        offsetY.value = e.clientY - positionY.value - graphBB.y;

        // get the mouse cursor position at startup:
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
      }
    }
  }

  /**
   * Function that allows draging an element with the mouse.
   * @param e The mouse event
   */
  function elementDrag(e: MouseEvent) {
    e.preventDefault();
    if (legendWrapper.value) {
      const graphDisplay = legendWrapper.value.parentElement;

      if (graphDisplay) {
        const graphBB = graphDisplay.getBoundingClientRect();

        const legendPosX = e.clientX - graphBB.x - offsetX.value;
        const legendPosY = e.clientY - graphBB.y - offsetY.value;

        updatePosition(legendPosX, legendPosY);
      }
    }
  }

  /**
   * Function that stops movement when mouse button is released.
   */
  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
</script>

<style lang="scss">
.hidden {
  display: none;
}
#legendWrapper {
  position: absolute;
  z-index: 2;
  border: 1px solid var(--disabled-color);
  background: var(--background-color);
  border-radius: 0.5em;
  user-select: none;
  #header {
    background-color: var(--disabled-color);
    color: #ffffff;
    cursor: move;
    width: 100%;
    border-radius: 0.4em 0.4em 0 0;
    text-align: center;
    height: 1.6em;
    svg {
      position: absolute;
      left: 0.2em;
      top: 0.25em;
      path {
        stroke: white;
      }
    }
  }
  .legend {
    padding-top: 0.3em;
    padding-left: 0.75em;
    padding-right: 0.75em;
    padding-bottom: 0.4em;
  }
}

.entry {
  .paradigmEntry {
    display: flex;
    flex-direction: row;
    align-items: center;
    .circle {
      cursor: pointer;
      box-sizing: border-box;
      height: 1em;
      width: 1em;
      border: 1px solid rgb(60, 60, 60);
      border-radius: 1em;
      margin-right: 0.3em;
      &:hover {
        border: 2px solid rgb(60, 60, 60);
      }
    }

    .entryText {
      cursor: pointer;
    }
    .active {
      background-color: grey;
    }
  }
  .edgeEntry {
    display: flex;
    flex-direction: row;
    align-items: center;
    .arrow {
      cursor: pointer;
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 1em;
      svg {
        width: 1em;
        height: 1em;
        margin-right: 0.3em;
        pointer-events: none;
        path {
          pointer-events: none;
        }
      }
    }
    .entryText {
      cursor: pointer;
    }
    .active {
      background-color: grey;
    }
  }
}
</style>
