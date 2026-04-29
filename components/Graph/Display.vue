<!--This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
It is distributed under the GPL 3.0 open source license.-->

<template lang="pug">
.graphDisplayContainer
  .graphContainer(ref='container')

GraphLegend(
  v-if='globalStore.visualSettings.showLegend.enabled',
  :tab='props.tab',
  @color-changed='processColorChange'
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

// baked-in node and edgelist from rutte/testingutils
import { createNodeBorderProgram } from '@sigma/node-border';
import _ from 'lodash';
import { DirectedGraph } from 'graphology';
import { createEdgeCurveProgram } from '@sigma/edge-curve';
import { edges } from '@/assets/json/edges';
import { nodes } from '@/assets/json/nodes';

// pinia stores
import type { Graph } from '~/types/graph';
import {
  paradigmsToNodeColor,
  edgeValueToEdgeColor,
  signSymbol,
  evaluateConceptValueToColor,
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
defineExpose({
  forceReload: async () => {
    globalStore.loading = true;
    await makeGraph().finally(() => {
      edgeWeights.value = {};
      globalStore.loading = false;
    });
  },
  cancelRender: () => {
    // TODO: Currently not implemented, should be implemented in the future
    // graphStore.cancelRender();
    globalStore.loading = false;
  },
  switchTab: async (tabIndex: number) => {
    globalStore.loading = true;
    scriptStore.graphs[graph.getAttribute('graphId')].graphologyGraph = graph;

    // Unbind sigma in the data set.
    scriptStore.graphs[graph.getAttribute('graphId')].sigmaGraph = undefined;

    state = { isDragging: false, hasDragged: false };

    const id = scriptStore.graphIds[tabIndex];
    const graphData = scriptStore.getGraphs()[id];
    if (graphData.graphologyGraph) {
      graph = graphData.graphologyGraph;
      sigma.setGraph(graph);
      graphData.graphologyGraph = graph;
      graphData.sigmaGraph = sigma;
    } else {
      graph = await graphStore.createGraph(graphData);
      sigma.setGraph(graph);
      graph.setAttribute('graphId', graphData.id);
      graphData.graphologyGraph = graph;
      graphData.sigmaGraph = sigma;
    }
    fillSuggestions();
    if (searchBar.value) searchBar.value.value = '';
    globalStore.loading = false;
  },
  fitGraph: () => {
    const graph = sigma.getGraph();
    const camera = sigma.getCamera();

    // Compute graph bounds manually
    let xMin = Infinity;
    let xMax = -Infinity;
    let yMin = Infinity;
    let yMax = -Infinity;

    graph.forEachNode((nodeKey) => {
      const { x, y } = sigma.getNodeDisplayData(nodeKey)!;
      xMin = Math.min(xMin, x);
      xMax = Math.max(xMax, x);
      yMin = Math.min(yMin, y);
      yMax = Math.max(yMax, y);
    });

    // Compute the center of the graph
    const centerX = (xMin + xMax) / 2;
    const centerY = (yMin + yMax) / 2;

    // Set the camera state to fit the graph
    camera.setState({
      x: centerX,
      y: centerY,
      ratio: 1.2,
    });
  },
});

const { darkMode } = storeToRefs(globalStore);
watch(darkMode, () => {
  sigma.setSetting('labelColor', { color: darkMode.value === true ? 'white' : 'black' });
  sigma.refresh();
});

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

// Sigma3 uses a watcher on the grapholgy opject so no need to create a new one every time.
let graph: Graphology = new DirectedGraph();
let sigma: Sigma;
let state: SigmaState;

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
  sigma.refresh();
}

/**
 * Refreshes the color data for the graph, will auto refresh sigma.
 * @param colors Event prop with new colors
 */
function processColorChange(colors: Record<string, { color: string }>) {
  graph.mapEdges((edge) => {
    const edgeData = graph.getEdgeAttributes(edge);
    const color = edgeValueToEdgeColor(
      {
        positiveEdgeColor: colors.positiveEdge?.color,
        negativeEdgeColor: colors.negativeEdge?.color,
        neutralEdgeColor: colors.neutralEdge?.color,
      },
      edgeData.value,
    );

    graph.setEdgeAttribute(edge, 'color', color);
  });
  graph.mapNodes((node) => {
    const nodeData = graph.getNodeAttributes(node);
    const color = evaluateConceptValueToColor(nodeData.evaluation.value ?? 0, {
      positive: colors.positiveEdge?.color,
      negative: colors.negativeEdge?.color,
      neutral: colors.neutralEdge?.color,
    });
    const paradigmColor = paradigmsToNodeColor(
      {
        paradigmA: colors.paradigmA?.color,
        paradigmB: colors.paradigmB?.color,
        noParadigm: colors.noParadigm?.color,
      },
      nodeData.paradigmA,
      nodeData.paradigmB,
    );

    graph.setNodeAttribute(node, 'borderColorEval', color);
    graph.setNodeAttribute(node, 'colorEval', paradigmColor);
  });

  sigma.scheduleRefresh({
    layoutUnchange: true,
  });
}
/**
 * Adds label data to datalist element
 */
function fillSuggestions() {
  suggestions.value!.innerHTML = '';
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

  sigma.refresh();
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
  graph.setAttribute('graphId', graphData.id);
  sigma.setGraph(graph);
  graphData.graphologyGraph = graph;
  graphData.sigmaGraph = sigma;

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
      sigma.refresh();
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
  sigma.on('downNode', (e) => {
    // select the node
    state.isDragging = true;
    state.draggedNode = e.node;
    graph.setNodeAttribute(state.draggedNode, 'hideed', true);
  });
  sigma.on('clickNode', (e) => {
    if (!state.hasDragged) {
      state.clickedNode = e.node;
      updateClickedNeighbours(e.node);
      sigma.scheduleRefresh({ layoutUnchange: true });
    }
    state.hasDragged = false;
  });
  sigma.on('enterEdge', (e) => {
    state.hoveredEdge = e.edge;
    updateWeightDisplayDiv(e.event.x, e.event.y);
    bringEdgeToFront(e.edge); // hide the hovered edge
    sigma.refresh();
  });

  sigma.on('enterNode', (e) => {
    state.hoveredNode = e.node;
    updateAttributeDisplay(e.event.x, e.event.y);
    showAttributeDisplay.value = true;
    sigma.refresh();
  });

  sigma.on('leaveNode', () => {
    state.hoveredEdge = undefined;
    showAttributeDisplay.value = false;
    sigma.refresh();
  });

  // leaveEdge executes when the mouse leaves the whole canves or leaves an edge,
  // all the same things should happen to the current hoveredEdge in both cases
  container.value?.addEventListener('mouseleave', () => {
    leaveEdge();
  });
  sigma.on('leaveEdge', () => {
    leaveEdge();
  });
  // On mouse move, if the drag mode is enabled, we change the position of the draggedNode
  sigma.getMouseCaptor().on('mousemovebody', (e) => {
    updateWeightDisplayDiv(e.x, e.y);
    if (!state.isDragging || !state.draggedNode) return;
    // Get new position of node
    const pos = sigma.viewportToGraph(e) ?? { x: 0, y: 0 };

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
  sigma.getMouseCaptor().on('mouseup', () => {
    if (state.draggedNode) {
      graph.removeNodeAttribute(state.draggedNode, 'hideed');
    }
    state.isDragging = false;
    state.draggedNode = undefined;
  });

  // Disable the autoscale at the first down interaction
  sigma.getMouseCaptor().on('mousedown', () => {
    if (!sigma.getCustomBBox()) sigma.setCustomBBox(sigma.getBBox());
  });

  sigma.on('clickStage', () => {
    if (!state.hasDragged) {
      state.clickedNode = undefined;
      state.clickedNeighbors = undefined;
      sigma.scheduleRefresh({ layoutUnchange: true });
    }
    state.hasDragged = false;
  });
  // Disable zoom on double click
  sigma.on('doubleClickStage', (event) => {
    event.event.preventSigmaDefault();
    if (state.clickedNode) {
      state.clickedNode = undefined;
      state.clickedNeighbors = undefined;
    }
  });
  sigma.on('doubleClickNode', (event) => {
    event.event.preventSigmaDefault();
  });

  // Determine rendering properties of nodes
  sigma.setSetting('nodeReducer', (node, data) => {
    const res = { ...data };

    if (globalStore.visualSettings.scaleNodesByDegrees.enabled) {
      res.size = data.sizeDegree;
    }

    // We want to color node borders by evaluate-concepts if it is enabled
    if (globalStore.scriptSettings.evaluateConcepts.enabled) {
      res.borderColor = data.borderColorEval;
    } else {
      res.borderColor = undefined;
    }

    // We want to color node by paradigm support if it is enabled
    if (globalStore.scriptSettings.paradigmSupport.enabled) {
      res.color = data.colorEval;
    } else {
      res.color = undefined;
    }

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
  sigma.setSetting('edgeReducer', (edge, data) => {
    const res: Partial<NodeDisplayData> = { ...data };

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
    const weightString = "W: " + data.weight.toString() + "  S: " + data.summedWeight.toString();
    // darken edge if hovered
    if (state.hoveredEdge === edge) {
      weightToShow.value = weightString;
      res.color = chroma(res.color ? res.color : 'var(--dflt-bor1-color-d)fff')
        .darken(1.3)
        .hex();
      weightDisplayDiv.value.style.color = res.color;
    }

    if (globalStore.visualSettings.scaleEdgesByWeight.enabled) {
      res.size = data.sizeWeight;
    }
    // calculate middle off edge
    if (globalStore.visualSettings.showEdgeWeights.enabled) {
      const sourceX = graph.getNodeAttribute(graph.source(edge), 'x');
      const sourceY = graph.getNodeAttribute(graph.source(edge), 'y');
      const targetX = graph.getNodeAttribute(graph.target(edge), 'x');
      const targetY = graph.getNodeAttribute(graph.target(edge), 'y');

      const pos = sigma.graphToViewport({
        x: (sourceX + targetX) / 2,
        y: (sourceY + targetY) / 2,
      });

      edgeWeights.value[edge] = {
        weight: edge !== state.hoveredEdge && !res.hidden ? weightString : '',
        color: data.color,
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
   * This function deselects an edge and hides the weight display
   */
  function leaveEdge() {
    state.hoveredEdge = undefined;
    hideWeightDisplay();
    sigma.refresh();
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

/**
 * updates the text and positon of the instrument display div
 * @param xMouse position of the mouse
 * @param yMouse position of the mouse
 */
function updateAttributeDisplay(xMouse: number, yMouse: number) {
  if (state.hoveredNode) {
    const graphId = graph.getAttribute('graphId');
    const graphData = scriptStore.getGraphs()[graphId];

    const attributes = graphData.nodes[state.hoveredNode];
    attributeValues.value = attributes;
    attributePos.value[0] = xMouse;
    attributePos.value[1] = yMouse;
  } else {
    showAttributeDisplay.value = false;
  }
}

const borderProgram = createNodeBorderProgram({
  borders: [
    {
      size: {
        attribute: 'borderSize',
        defaultValue: 0.3,
        mode: 'relative',
      },
      color: {
        attribute: 'borderColor',
        defaultValue: 'gray',
      },
    },
    {
      size: {
        attribute: 'size',
        defaultValue: 1,
        mode: 'relative',
      },
      color: {
        attribute: 'color',
        defaultValue: 'gray',
      },
    },
  ],
});
onMounted(async () => {
  globalStore.loading = true;
  sigma = new Sigma(graph, container.value as HTMLElement, {
    nodeProgramClasses: {
      bordered: borderProgram,
    },
    edgeProgramClasses: {
      curved: createEdgeCurveProgram({
        curvatureAttribute: 'curvature',
        defaultCurvature: 0.02,
        arrowHead: {
          lengthToThicknessRatio: 2.5,
          widenessToThicknessRatio: 2,
        },
      }),
    },
    allowInvalidContainer: true,
    labelRenderedSizeThreshold: 0,
    labelDensity: 8,
    labelSize: 12,
    labelGridCellSize: 25,
    enableEdgeEvents: true,
    renderEdgeLabels: false,
    defaultDrawNodeLabel: graphStore.drawLabelWithInstruments, // graphStore.drawLabelWithWrapping,
    defaultDrawNodeHover: graphStore.drawHoverWithInstruments,
    labelColor: {
      color: darkMode.value ? 'white' : 'black',
    },
  });
  await makeGraph().then(() => {
    sigma.setGraph(graph);
    globalStore.loading = false;
    // HACK: Changes order of sigma canvasses to make sure weighted degree values are drawn on top of hover nodes
    const graphContent: HTMLElement | null = document.querySelector('.mainGraphContent');
    const container: HTMLElement | undefined | null =
      graphContent?.querySelector('.graphContainer');
    const labelCanvas: HTMLCanvasElement | undefined | null =
      container?.querySelector('.sigma-labels');
    const mouseCanvas: HTMLCanvasElement | undefined | null =
      container?.querySelector('.sigma-mouse');

    if (labelCanvas && mouseCanvas) container?.insertBefore(labelCanvas, mouseCanvas);

    fillSuggestions();
    window.addEventListener('resize', () => refresh());
  });
});

onBeforeUnmount(() => {
  sigma.kill();
  window.removeEventListener('resize', () => refresh());
});
</script>
<style lang="scss">
.graphContainer {
  width: 80vw;
  height: 80vh;
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
