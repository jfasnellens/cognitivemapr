<!--This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
It is distributed under the GPL 3.0 open source license.-->

<template lang="pug">
.container(ref='container')

GraphLegend(
  v-if='globalStore.visualSettings.showLegend.enabled',
  :tab='props.tab',
  @color-changed='refresh()'
) 

.searchFunctionDiv
  input.searchBar(
    ref='searchBar',
    type='search',
    list='suggestions',
    placeholder='Search for node',
    @input='(e) => setSearchQuery(e.target.value || "")',
    @keydown=`(e) => { 
      if (e.code === "Enter") { 
        setSearchQuery(e.target.value || ""); 
        e.target.blur(); 
      }; 
    }`
  )
  datalist#suggestions(ref='suggestions')

.weightDisplayDiv(ref='weightDisplayDiv') {{ weightToShow }}
GraphAttributes.attributes(
  v-if='showAttributeDisplay && globalStore.visualSettings.showAttributesOnHover.enabled',
  :position='attributePos',
  :values='attributeValues'
)

.zoomBtnWrapper
  Defaultbutton.zoomIn(
    btn-type='zoomIn',
    @click='sigma.getCamera().animatedZoom({ duration: 500 })'
  )
  Defaultbutton.zoomOut(
    btn-type='zoomOut',
    @click='sigma.getCamera().animatedUnzoom({ duration: 500 })'
  )
.edgeWeights
  .edgeWeightDiv(
    v-for='({ weight, color, x, y }, k) in edgeWeights',
    :key=k,
    :style='{ top: y + "px", left: x + "px", color: color }'
  ) {{ weight }}
</template>
<script setup lang="ts">
import Sigma from 'sigma';
import type { NodeDisplayData } from 'sigma/types';
import type Graphology from 'graphology';
import chroma from 'chroma-js';
import NodeProgram from 'sigma/rendering/webgl/programs/node.js';
import { createNodeCompoundProgram } from 'sigma/rendering/webgl/programs/common/node';
import type { NodeBorderDisplayData } from '@/types/display';

// baked-in node and edgelist from rutte/testingutils
import { edges } from '@/assets/json/edges';
import { nodes } from '@/assets/json/nodes';

// program for rendering nodes
import NodeBorderProgram from '@/assets/programs/node.border';

// pinia stores
import { useScriptStore } from '@/stores/scriptStore';
import { useGraphStore } from '@/stores/graphStore';
import type { Graph } from '~/types/graph';
import {
  paradigmsToNodeColor,
  edgeValueToEdgeColor,
  calcEdgeSize,
  calcNodeSize,
  signSymbol,
} from '~/scripts/utils';

const props = defineProps({
  tab: { type: Number, default: 0 },
});

const scriptStore = useScriptStore();
const graphStore = useGraphStore();
const globalStore = useGlobalStore();

// refs for attribute display
const showAttributeDisplay = ref(false);
const attributePos = ref([0, 0]);
const attributeValues = ref({});

// watcher for refreshing the graph to a new graph
watch(
  () => props.tab,
  async () => {
    globalStore.loading = true;
    sigma.value?.kill();
    await makeGraph().finally(() => {
      edgeWeights.value = {};
      fillSuggestions();
      sigma.value?.refresh();
      globalStore.loading = false;
    });
    if (searchBar.value) searchBar.value.value = '';
  },
);

// watcher for enabled scripts that change graph display
watch(globalStore.scriptSettings, () => {
  edgeWeights.value = {};
  sigma.value?.refresh();
});

watch(globalStore.legendSettings, () => {
  sigma.value?.refresh();
});

const { darkMode } = storeToRefs(globalStore);
watch(darkMode, () => {
  sigma.value?.setSetting('labelColor', { color: darkMode.value === true ? 'white' : 'black' });
  sigma.value?.refresh();
});

window.addEventListener('resize', () => refresh());
// retrieve DOM element

// declare state
interface SigmaState {
  hoveredNode?: string;
  hoveredEdge?: string;
  draggedNode?: string;
  isDragging: boolean;
  hasDragged: boolean;
  clickedNode?: string;

  // State derived from clicked node:
  clickedNeighbors?: Set<[string, string]>;

  allSuggestions?: Set<string>;
}

const sigma: Ref<Sigma | undefined> = ref(undefined);
let state: SigmaState;
let graph: Graphology;

// retrieve DOM element
const container = ref();
const weightDisplayDiv = ref();
const weightToShow: Ref<string> = ref('');
const edgeWeights: Ref<Record<string, { weight: string; color: string; x: number; y: number }>> =
  ref({});
const searchBar: Ref<HTMLInputElement | undefined> = ref();
const suggestions: Ref<HTMLDataListElement | undefined> = ref();

/**
 * Function to refresh sigma after new color is picked in colorpicker
 */
function refresh() {
  sigma.value?.refresh();
}
/**
 * Adds label data to datalist element
 */
function fillSuggestions() {
  if (suggestions.value)
    suggestions.value.innerHTML = graph
      .nodes()
      .map((node) => `<option value="${graph.getNodeAttribute(node, 'label')}"></option>`)
      .join('\n');
}
/**
 * fills allSuggestions in the state
 * @param query used to filter node labels
 */
function setSearchQuery(query: string) {
  if (query) {
    const lcQuery = query.toLowerCase();
    const suggestions = graph
      .nodes()
      .map((n) => ({ id: n, label: graph.getNodeAttribute(n, 'label') as string }))
      .filter(({ label }) => label.toLowerCase().includes(lcQuery));
    const perfectMatches = suggestions.filter(({ label }) => label === query);

    if (perfectMatches.length > 0)
      state.allSuggestions = new Set(perfectMatches.map(({ id }) => id));
    else state.allSuggestions = new Set(suggestions.map(({ id }) => id));
  }
  // If the query is empty, then we reset the clickedNode / suggestions state:
  else state.allSuggestions = undefined;

  sigma.value?.refresh();
}
/**
 * initialises the sigma instance
 */
async function makeGraph() {
  // initialize state and data
  state = { isDragging: false, hasDragged: false };
  let graphData: Graph;
  if (scriptStore.graphIds.length <= 0) {
    graphData = scriptStore.buildGraph(edges, nodes);
  } else {
    const id = scriptStore.graphIds[props.tab];
    graphData = scriptStore.getGraphs()[id];
  }

  graph = await graphStore.createGraph(graphData);
  sigma.value = new Sigma(graph, container.value as HTMLElement, {
    nodeProgramClasses: {
      border: createNodeCompoundProgram([NodeProgram, NodeBorderProgram]),
    },
    allowInvalidContainer: true,
    labelRenderedSizeThreshold: 0,
    labelDensity: 10,
    labelSize: 9,
    enableEdgeHoverEvents: true,
    renderEdgeLabels: false,
    labelRenderer: graphStore.drawLabelWithInstruments,
    hoverRenderer: graphStore.drawHoverWithInstruments,
    labelColor: { color: darkMode.value ? 'white' : 'black' },
  });

  graphData.sigmaGraph = sigma.value;

  // watcher for enabled scripts that change graph display
  watch(
    [
      globalStore.scriptSettings,
      globalStore.pathSettings,
      globalStore.visualSettings,
      graphData.settings,
    ],
    () => {
      if (state.clickedNode) updateClickedNeighbours(state.clickedNode);
      edgeWeights.value = {};
      sigma.value?.refresh();
    },
  );

  /**
   * @param node - node to find ancestors for
   * @returns set filled with the ancestors node ids
   */
  function ancestors(node: string): [string, string][] {
    const family: [string, string][] = [];
    const visited: Record<string, boolean> = {}; // keys are edges written as to:from
    visited[node] = true;

    const traverseTree = (n: string) => {
      graph.forEachInNeighbor(n, (neighbor: string) => {
        if (!visited[neighbor + ':' + n]) {
          family.push([neighbor, n]);
          visited[neighbor + ':' + n] = true;
          traverseTree(neighbor);
        }
      });
    };

    traverseTree(node);
    return family;
  }

  /**
   * @param node - node to find children for
   * @returns set filled with the childrens node ids
   */
  function children(node: string): [string, string][] {
    const family: [string, string][] = [];
    const visited: Record<string, boolean> = {};
    visited[node] = true;

    const traverseTree = (n: string) => {
      graph.forEachOutNeighbor(n, (neighbor: string) => {
        if (!visited[n + ':' + neighbor]) {
          family.push([n, neighbor]);
          visited[n + ':' + neighbor] = true;
          traverseTree(neighbor);
        }
      });
    };

    traverseTree(node);
    return family;
  }

  /**
   * finds relevant node pairs based on settings in the script store
   * is called when a node is clicked and when the scriptStore settings change
   * @param node - clicked node
   */
  function updateClickedNeighbours(node: string) {
    const nodeAncestors: [string, string][] = globalStore.pathSettings.showAncestorsOnClick.enabled
      ? ancestors(node)
      : [];
    const nodeChildren: [string, string][] = globalStore.pathSettings.showChildrenOnClick.enabled
      ? children(node)
      : [];

    state.clickedNeighbors = new Set([...nodeAncestors, ...nodeChildren]);
  }

  // On mouse down on a node
  //  - we enable the drag mode
  //  - save the dragged node in the state
  //  - hide the node
  //  - disable the camera so its state is not updated
  sigma.value.on('downNode', (e) => {
    // select the node
    state.isDragging = true;
    state.draggedNode = e.node;
    graph.setNodeAttribute(state.draggedNode, 'hideed', true);
  });
  sigma.value.on('clickNode', (e) => {
    if (!state.hasDragged) {
      state.clickedNode = e.node;
      updateClickedNeighbours(e.node);
    }
    state.hasDragged = false;
  });
  sigma.value.on('enterEdge', (e) => {
    state.hoveredEdge = e.edge;
    updateWeightDisplayDiv(e.event.x, e.event.y);
    bringEdgeToFront(e.edge); // hide the hovered edge
    sigma.value?.refresh();
  });

  sigma.value.on('enterNode', (e) => {
    state.hoveredNode = e.node;
    updateAttributeDisplay(e.event.x, e.event.y);
    showAttributeDisplay.value = true;
    sigma.value?.refresh();
  });

  sigma.value.on('leaveNode', () => {
    state.hoveredEdge = undefined;
    showAttributeDisplay.value = false;
    sigma.value?.refresh();
  });

  // leaveEdge executes when the mouse leaves the whole canves or leaves an edge,
  // all the same things should happen to the current hoveredEdge in both cases
  container.value?.addEventListener('mouseleave', () => {
    leaveEdge();
  });
  sigma.value.on('leaveEdge', () => {
    leaveEdge();
  });
  // On mouse move, if the drag mode is enabled, we change the position of the draggedNode
  sigma.value.getMouseCaptor().on('mousemovebody', (e) => {
    updateWeightDisplayDiv(e.x, e.y);
    if (!state.isDragging || !state.draggedNode) return;
    // Get new position of node
    const pos = sigma.value?.viewportToGraph(e) ?? { x: 0, y: 0 };

    if (
      // position changed, then don't select node
      pos.x !== graph.getNodeAttribute(state.draggedNode, 'x') &&
      pos.y !== graph.getNodeAttribute(state.draggedNode, 'y')
    )
      state.hasDragged = true;

    graph.setNodeAttribute(state.draggedNode, 'x', pos?.x);
    graph.setNodeAttribute(state.draggedNode, 'y', pos?.y);

    // Prevent sigma to move camera:
    e.preventSigmaDefault();
    e.original.preventDefault();
    e.original.stopPropagation();
  });

  // On mouse up, we reset the autoscale and the dragging mode
  sigma.value.getMouseCaptor().on('mouseup', () => {
    if (state.draggedNode) {
      graph.removeNodeAttribute(state.draggedNode, 'hideed');
    }
    state.isDragging = false;
    state.draggedNode = undefined;
  });

  // Disable the autoscale at the first down interaction
  sigma.value.getMouseCaptor().on('mousedown', () => {
    if (!sigma.value?.getCustomBBox()) sigma.value?.setCustomBBox(sigma.value.getBBox());
  });

  sigma.value.getCamera().on('updated', () => sigma.value?.refresh());

  sigma.value.on('clickStage', () => {
    if (!state.hasDragged) {
      state.clickedNode = undefined;
      state.clickedNeighbors = undefined;
    }
    state.hasDragged = false;
  });
  // Disable zoom on double click
  sigma.value.on('doubleClickStage', (event) => {
    event.event.preventSigmaDefault();
    if (state.clickedNode) {
      state.clickedNode = undefined;
      state.clickedNeighbors = undefined;
    }
  });
  sigma.value.on('doubleClickNode', (event) => {
    event.event.preventSigmaDefault();
  });

  // Determine rendering properties of nodes
  sigma.value.setSetting('nodeReducer', (node, data) => {
    const res: Partial<NodeBorderDisplayData> = { ...data };
    const nodeSize = calcNodeSize(
      globalStore.visualSettings.scaleNodesByDegrees.enabled,
      data.degrees,
    );
    // information needs to be put in graphology as well to enable exporting
    sigma.value?.getGraph().setNodeAttribute(node, 'instrName', data.instrument?.name);
    sigma.value?.getGraph().setNodeAttribute(node, 'instrValue', data.instrument?.value);
    sigma.value?.getGraph().setNodeAttribute(node, 'degrees', data.degrees);
    sigma.value?.getGraph().setNodeAttribute(node, 'size', nodeSize);
    res.size = nodeSize;

    // We want to color nodes by paradigm only if paradigm support is enabled
    res.color = paradigmsToNodeColor(graphData, data.paradigmA, data.paradigmB);

    // We want to color node borders by evaluate-concepts if it is enabled
    if (globalStore.scriptSettings.evaluateConcepts.enabled) {
      res.borderColor =
        data.value && data.value > 0
          ? graphData.settings.legend.positiveEdge.color
          : data.value && data.value < 0
            ? graphData.settings.legend.negativeEdge.color
            : undefined;
    } else {
      res.borderColor = undefined;
    }
    sigma.value
      ?.getGraph()
      .setNodeAttribute(
        node,
        'borderColor',
        globalStore.scriptSettings.evaluateConcepts.enabled ? res.borderColor : undefined,
      );
    const hasNode = state.clickedNeighbors
      ? [...state.clickedNeighbors].reduce(
          (pr, [from, to]) =>
            pr ||
            (from === node && globalStore.pathSettings.showAncestorsOnClick.enabled) ||
            (to === node && globalStore.pathSettings.showChildrenOnClick.enabled),
          false,
        )
      : true;

    // hide nodes if they or their neighbors are not clicked
    if (!hasNode && state.clickedNode !== node) {
      res.label = '';
      res.color = '#f6f6f6';
      res.borderColor = '#f6f6f6';
    }

    if (state.clickedNode === node) res.highlighted = true;

    // hide nodes not suggested
    if (state.allSuggestions && !state.allSuggestions.has(node) && !state.clickedNode) {
      res.label = '';
      res.color = '#f6f6f6';
      res.borderColor = undefined;
    }
    if (
      !res.hidden &&
      ((graphData.settings.highlight.paradigmA && data.paradigmA && data.paradigmA > 0) ||
        (graphData.settings.highlight.paradigmB && data.paradigmB && data.paradigmB > 0) ||
        (graphData.settings.highlight.paradigmNone &&
          !(data.paradigmA && data.paradigmA > 0) &&
          !(data.paradigmB && data.paradigmB > 0)))
    )
      res.highlighted = true;

    return res;
  });

  // Determine rendering properties of edges
  sigma.value.setSetting('edgeReducer', (edge, data) => {
    const weightString = signSymbol(data.value) + data.weight.toString();
    const res: Partial<NodeDisplayData> = { ...data };
    res.color = edgeValueToEdgeColor(graphData, data.value);
    const edgeSize: number = !globalStore.visualSettings.scaleEdgesByWeight.enabled
      ? 2
      : calcEdgeSize(data.weight, data.maxWeight, data.minWeight);
    // information needs to be in graphology for export functionality

    sigma.value?.getGraph().setEdgeAttribute(edge, 'value', data.value);
    sigma.value?.getGraph().setEdgeAttribute(edge, 'weight', data.weight);
    sigma.value?.getGraph().setEdgeAttribute(edge, 'minWeight', data.minWeight);
    sigma.value?.getGraph().setEdgeAttribute(edge, 'maxWeight', data.maxWeight);

    res.size = edgeSize;

    if (
      state.allSuggestions &&
      !state.clickedNode &&
      (!state.allSuggestions.has(graph.source(edge)) ||
        !state.allSuggestions.has(graph.target(edge)))
    ) {
      res.hidden = true;
    }
    if (state.clickedNode && state.clickedNeighbors) {
      const neighbors = [...state.clickedNeighbors];
      const hasEdge = neighbors.reduce(
        (pr, [from, to]) => pr || (from === graph.source(edge) && to === graph.target(edge)),
        false,
      );

      if (state.clickedNode && !hasEdge) {
        res.hidden = true;
      }
    }
    // darken edge if hovered
    if (state.hoveredEdge === edge) {
      weightToShow.value = weightString;
      res.color = chroma(res.color ? res.color : 'var(--dflt-bor1-color-d)fff')
        .darken(1.3)
        .hex();
      weightDisplayDiv.value.style.color = res.color;
    }
    // calculate middle off edge
    if (globalStore.visualSettings.showEdgeWeights.enabled && sigma.value) {
      const sourceX = graph.getNodeAttribute(graph.source(edge), 'x');
      const sourceY = graph.getNodeAttribute(graph.source(edge), 'y');
      const targetX = graph.getNodeAttribute(graph.target(edge), 'x');
      const targetY = graph.getNodeAttribute(graph.target(edge), 'y');

      const pos = sigma.value.graphToViewport({
        x: (sourceX + targetX) / 2,
        y: (sourceY + targetY) / 2,
      });

      edgeWeights.value[edge] = {
        weight: edge !== state.hoveredEdge && !res.hidden ? weightString : '',
        color: res.color,
        x: pos.x,
        y: pos.y,
      };
    }

    if (
      !(
        (graphData.settings.show.positiveEdges && data.value > 0) ||
        (graphData.settings.show.negativeEdges && data.value < 0) ||
        (graphData.settings.show.neutralEdges && data.value === 0)
      )
    )
      res.hidden = true;

    return res;
  });
  /**
   * places an edge on top
   * @param edge The edge to place on top
   */
  function bringEdgeToFront(edge: string) {
    const attribs = graph.getEdgeAttributes(edge);
    const source = graph.source(edge);
    const target = graph.target(edge);
    graph.dropEdge(edge);
    graph.addEdgeWithKey(edge, source, target, attribs);
  }
  /**
   * updates the text and positon of the weight display div
   * @param xMouse x coordinate of the mouse within the container
   * @param yMouse y coordinate of the mouse within the container
   */
  function updateWeightDisplayDiv(xMouse: number, yMouse: number) {
    if (state.hoveredEdge) {
      // if there is an edge being hovered over
      weightDisplayDiv.value.style.left = (xMouse - 20).toString() + 'px'; // adjust weightDisplayDiv's position
      weightDisplayDiv.value.style.top = (yMouse - 20).toString() + 'px';
      weightDisplayDiv.value.style.visibility = 'visible'; // make the weightDisplayDiv visible
    } else {
      hideWeightDisplay(); // make the weightDisplayDiv invisible
    }
  }
  /**
   * updates the text and positon of the instrument display div
   * @param xMouse position of the mouse
   * @param yMouse position of the mouse
   */
  function updateAttributeDisplay(xMouse: number, yMouse: number) {
    if (state.hoveredNode) {
      const attributes = graphData.nodes[state.hoveredNode];
      attributeValues.value = attributes;
      attributePos.value[0] = xMouse;
      attributePos.value[1] = yMouse;
    } else {
      showAttributeDisplay.value = false;
    }
  }
  /**
   * This function deselects an edge and hides the weight display
   */
  function leaveEdge() {
    state.hoveredEdge = undefined;
    hideWeightDisplay();
    sigma.value?.refresh();
  }
  /**
   * sets the weight display div's visibility to 'hidden'
   */
  function hideWeightDisplay() {
    if (weightDisplayDiv && weightDisplayDiv.value) {
      weightDisplayDiv.value.style.visibility = 'hidden';
    }
  }
}

onMounted(async () => {
  globalStore.loading = true;
  await makeGraph().then(() => {
    globalStore.loading = false;
    // HACK: Changes order of sigma canvasses to make sure weighted degree values are drawn on top of hover nodes
    const graphContent: HTMLElement | null = document.querySelector('.mainGraphContent');
    const container: HTMLElement | undefined | null = graphContent?.querySelector('.container');
    const labelCanvas: HTMLCanvasElement | undefined | null =
      container?.querySelector('.sigma-labels');
    const mouseCanvas: HTMLCanvasElement | undefined | null =
      container?.querySelector('.sigma-mouse');

    if (labelCanvas && mouseCanvas) container?.insertBefore(labelCanvas, mouseCanvas);

    fillSuggestions();
  });
});
</script>
<style lang="scss">
.container {
  width: 100%;
  height: 100%;
}
.attributes,
.searchFunctionDiv,
.zoomBtnWrapper {
  z-index: 10;
}
.searchFunctionDiv {
  position: absolute;
  border: 2px solid black;
  border-radius: 10px;
  overflow: hidden;
  right: 1em;
  top: 1em;
}
.searchBar {
  padding: 5px;
}
.searchBar:focus {
  outline: none;
}
.searchBar::placeholder {
  padding-left: 5px;
}
.zoomBtnWrapper {
  position: absolute;
  bottom: 10px;
  right: 10px;

  .zoomIn,
  .zoomOut {
    padding: 0.1em;
  }
}
.weightDisplayDiv {
  visibility: hidden;
  z-index: 5;
}
.weightDisplayDiv,
.edgeWeightDiv {
  position: absolute;
  top: 10px;
  left: 10px;
  user-select: none;
  pointer-events: none;
  text-shadow:
    1px 0 var(--dflt-bor1-color-d),
    -1px 0 var(--dflt-bor1-color-d),
    0 1px var(--dflt-bor1-color-d),
    0 -1px var(--dflt-bor1-color-d),
    1px 1px var(--dflt-bor1-color-d),
    -1px -1px var(--dflt-bor1-color-d),
    1px -1px var(--dflt-bor1-color-d),
    -1px 1px var(--dflt-bor1-color-d);
}
</style>
