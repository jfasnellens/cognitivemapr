/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/


import renderer from 'graphology-svg';
import Graphology from 'graphology';

//= ====================================================================================================================================================
// copy of graphology-svg/renderer.js with some changes/fixes
//= ====================================================================================================================================================

/**
 * Graphology SVG Renderer
 * =======================
 *
 * Function rendering the given graph.
 */
import isGraph from 'graphology-utils/is-graph';
import helpers from 'graphology-svg/helpers.js';
import defaults from 'graphology-svg/defaults.js';

//= ====================================================================================================================================================
// copy of graphology-svg/index.js with some changes/fixes
//= ====================================================================================================================================================

import resolveDefaults from 'graphology-utils/defaults';
// var renderer = require('graphology-svg/renderer.js');
import f from 'graphology-svg/defaults.js';
import {
  paradigmsToNodeColor,
  edgeValueToEdgeColor,
  normalize,
  calcEdgeSize,
  calcNodeSize,
  signSymbol,
} from '~/scripts/utils';
import type { Graph } from '~/types/graph';
import type { Exporter } from '~/types/exporter';
const globalStore = useGlobalStore();
const edgeWeightSVGText: globalThis.Ref<string> = ref('');
const svgViewboxSizeMargin = 1.1; // by increasing the size of the viewbox beyond the actual graph, we ensure objects aren't cut off as easily

export class ExportSVG implements Exporter {
  graphStore = useGraphStore();

  /**
   * Exports full graph to svg
   * @param graphData graph object of the graph being exported, this is required for information about the selected color scheme
   * @returns String an svg file which can be used to represent the graph
   */
  async export(graphData: Graph): Promise<string[]> {
    const graph = graphData.sigmaGraph;
    const graphology: Graphology = await graph!.getGraph();
    const settings = {
      width: 2048,
      height: 2048,
      nodes: {
        reducer: function reducer(_settings, node, attr) {
          const reduced = {
            type: attr.type || 'circle',
            labelType: attr.labelType || 'default',
            label: attr.label || node,
            x: attr.x,
            y: attr.y,
            size: attr.size * 0.2,
            color: paradigmsToNodeColor(graphData, attr.paradigmA, attr.paradigmB),
            borderColor: node.borderColor || undefined,
          };

          if (typeof reduced.x !== 'number' || typeof reduced.y !== 'number')
            throw new Error(
              'graphology-svg: the "' +
                node +
                '" node has no valid x or y position. Expecting a number.',
            );

          return reduced;
        },
      },
      edges: {
        reducer: function reducer(_settings, _node, attr) {
          const reduced = {
            type: attr.type || 'line',
            size: attr.weight || 1,
            color: edgeValueToEdgeColor(graphData, attr.value),
          };
          return reduced;
        },
      },
    };

    const originalString = await render(graphology, settings);
    const blob = await new Blob([originalString], { type: 'text/svg;charset=utf-8,' });
    const urls: string[] = [URL.createObjectURL(blob)];
    return urls;
  }
}
const canvasSize: Ref<number | undefined> = ref();
const canvasHeight: Ref<number | undefined> = ref();
const zoomFactor: Ref<number> = ref(1.6);
// values that determine how the rendering occurs, i've put them in one place so that they can be easily changed if they're found to be incorrect
/**
 * converts the y coordinate to be compatible with svg
 * @param y the original y coordinate
 * @returns the new flipped y coordinate
 */
const flipped: (y: number) => number = (y) => {
  return y * -1 + canvasHeight.value!;
};

const components = {
  nodes: {
    circle: function drawNode(settings, data, borderColor, degrees) {
      return (
        (borderColor
          ? '<circle cx="' +
            data.x +
            '" ' +
            'cy="' +
            flipped(data.y) +
            '" ' +
            'r="' +
            data.size +
            '" ' +
            'fill="' +
            borderColor +
            '" />'
          : '') +
        '<circle cx="' +
        data.x +
        '" ' +
        'cy="' +
        flipped(data.y) +
        '" ' +
        'r="' +
        data.size * (borderColor ? 0.75 : 1) +
        '" ' +
        'fill="' +
        data.color +
        '" />' +
        (degrees && globalStore.visualSettings.showDegreeValues.enabled
          ? '<text x="' +
            (data.x - data.size * 0.34 * degrees.toString().length) +
            '" ' +
            'y="' +
            (flipped(data.y) + data.size * 0.39) +
            '" ' +
            'font-family="' +
            escape(settings.font || 'consolas') +
            '" ' +
            'fill="white" ' +
            'font-size="' +
            data.size * 1.2 +
            '" >' +
            degrees +
            '</text>'
          : '')
      );
    },
  },
  edges: {
    line: function drawEdge(
      _settings,
      data,
      sourceData,
      targetData,
      weight,
      minWeight,
      maxWeight,
      value,
    ) {
      const invertedNormalizedArrow = normalize([
        sourceData.x - targetData.x,
        flipped(sourceData.y) - flipped(targetData.y),
      ]);
      const targetX = targetData.x + invertedNormalizedArrow[0] * targetData.size;
      const targetY = flipped(targetData.y) + invertedNormalizedArrow[1] * targetData.size;
      const adjustedSize = calcEdgeSize(weight, maxWeight, minWeight) * zoomFactor.value! * 0.5;
      edgeWeightSVGText.value += globalStore.visualSettings.showEdgeWeights.enabled
        ? '<g transform="translate(' +
          (sourceData.x + targetX) / 2 +
          ' ' +
          (flipped(sourceData.y) + targetY) / 2 +
          ') scale(' +
          zoomFactor.value! * 0.5 +
          ') "> <text id="text"' +
          ' font-size="' +
          16 +
          '" font-family="sans-serif" fill="' +
          data.color +
          '" ' /* + '>' */ +
          'filter="url(#whiteOutlineEffect)" >' +
          signSymbol(value) +
          weight +
          '</text> </g>'
        : '';

      return (
        '<line x1="' +
        sourceData.x +
        '" y1="' +
        flipped(sourceData.y) +
        '" ' +
        'x2="' +
        targetX +
        '" y2="' +
        targetY +
        '" ' +
        'stroke="' +
        data.color +
        '" ' +
        'stroke-width="' +
        adjustedSize +
        '" />' +
        '<g transform=" translate(' +
        targetX +
        ',' +
        targetY +
        ') rotate(90) rotate(' +
        Math.atan2(flipped(targetData.y) - flipped(sourceData.y), targetData.x - sourceData.x) *
          (360 / (Math.PI * 2)) +
        ') scale(' +
        0.006 * adjustedSize +
        ',' +
        0.01 * adjustedSize +
        ') translate(' +
        '-250, 0' +
        ')">' +
        '<polygon ' +
        'points="0.866,460 265.87,1 530.874,460" ' +
        'style="fill:' +
        data.color +
        ';stroke:' +
        data.color +
        ';stroke-width:1"' +
        '/>' +
        '</g>'
      );
    },
  },
  nodeLabels: {
    default: function drawLabel(settings, data, instrName, instrValue) {
      return (
        '<text x="' +
        (data.x + data.size * 1.1) +
        '" ' +
        'y="' +
        (flipped(data.y) + zoomFactor.value * 2) +
        '" ' +
        'font-family="' +
        escape(settings.font || 'sans-serif') +
        '" ' +
        'font-size="' +
        zoomFactor.value * 5.5 +
        '" >' +
        data.label +
        '</text>' +
        (instrName && globalStore.scriptSettings.instrumentSupport.enabled
          ? '<text x="' +
            (data.x + data.size * 1.1) +
            '" ' +
            'y="' +
            (flipped(data.y) + zoomFactor.value * 7.5) +
            '" ' +
            'font-family="' +
            escape(settings.font || 'sans-serif') +
            '" ' +
            'font-size="' +
            zoomFactor.value * 5.5 +
            '" >' +
            '> ' +
            instrName +
            ' ( ' +
            instrValue +
            ' )' +
            '</text>'
          : '')
      );
    },
  },
};
/**
 * This function finds out how zoomed in the graph is, and sets the zoom factor for the svg export
 * @param nodedata data needed for export
 * @param degrees the ingoing degrees of this node
 */
function calcZoomFactor(nodedata, degrees) {
  const nodeDisplaySize = nodedata.size;
  const noderelativeSize = calcNodeSize(
    globalStore.visualSettings.scaleNodesByDegrees.enabled,
    degrees,
  );
  zoomFactor.value = nodeDisplaySize / noderelativeSize;
}
/**
 * turns a graph into an svg string
 * @param graph the graph to turn to svg
 * @param settings settings with which to alter the resulting svg
 * @returns an svg string
 */
function renderer(graph, settings) {
  if (!isGraph(graph))
    throw new Error('graphology-svg/renderer: expecting a valid graphology instance.');
  edgeWeightSVGText.value = '';
  canvasSize.value = Math.min(settings.height, settings.width);
  canvasHeight.value = settings.height;
  const nodeBorderColors = {};
  const nodeDegrees = {};
  const instrValues = {};
  const instrNames = {};
  // const instruments = {};
  graph.forEachNode(function (node, attr) {
    nodeBorderColors[node] = attr.borderColor;
    nodeDegrees[node] = attr.degrees;
    instrNames[node] = attr.instrName;
    instrValues[node] = attr.instrValue;
  });
  const nodeData = helpers.reduceNodes(graph, settings);

  // we use the displayed size of a single node, relative to it's absolute size, to determine how zoomed in we are. Graphology/Sigma seem not to have any official way of determining this
  const nodenames = Object.keys(nodeData);
  if (nodenames.length > 0) calcZoomFactor(nodeData[nodenames[0]], nodeDegrees[nodenames[0]]);
  // Drawing edges
  const edgesStrings = [];
  graph.forEachEdge(function (edge, attr, source, target) {
    // Reducing edge
    const weight = attr.weight;
    const minWeight = attr.minWeight;
    const maxWeight = attr.maxWeight;
    const value = attr.value;
    if (typeof settings.edges.reducer === 'function') {
      attr = settings.edges.reducer(settings, edge, attr);
    }
    attr = defaults.DEFAULT_EDGE_REDUCER(settings, edge, attr);
    edgesStrings.push(
      components.edges.line(
        settings,
        attr,
        nodeData[source],
        nodeData[target],
        weight,
        minWeight,
        maxWeight,
        value,
      ),
    );
  });

  // Drawing nodes and labels
  // TODO: should we draw in size order to avoid weird overlaps? Should we run noverlap?
  const nodesStrings = [];
  const nodeLabelsStrings = [];

  for (const k in nodeData) {
    nodesStrings.push(
      components.nodes.circle(settings, nodeData[k], nodeBorderColors[k], nodeDegrees[k]),
    );
    nodeLabelsStrings.push(
      components.nodeLabels.default(settings, nodeData[k], instrNames[k], instrValues[k]),
    );
  }

  return (
    '<?xml version="1.0" encoding="utf-8"?>' +
    '<svg width="' +
    settings.width +
    '" height=" ' +
    settings.height +
    '" ' +
    'viewBox="0 0 ' +
    settings.width * svgViewboxSizeMargin +
    ' ' +
    settings.height * svgViewboxSizeMargin +
    '" ' +
    'version="1.1" ' +
    'xmlns="http://www.w3.org/2000/svg">' +
    '<defs>' +
    '<filter id="whiteOutlineEffect" color-interpolation-filters="sRGB">' +
    '<feMorphology in="SourceAlpha" result="MORPH" operator="dilate" radius="2" />' +
    '<feColorMatrix in="MORPH" result="WHITENED" type="matrix" values="-1 0 0 0 1, 0 -1 0 0 1, 0 0 -1 0 1, 0 0 0 1 0"/>' +
    '<feMerge>' +
    '<feMergeNode in="WHITENED"/>' +
    '<feMergeNode in="SourceGraphic"/>' +
    '</feMerge>' +
    '</filter>' +
    '</defs>' +
    '<g>' +
    edgesStrings.join('') +
    '</g>' +
    '<g>' +
    nodesStrings.join('') +
    '</g>' +
    '<g>' +
    nodeLabelsStrings.join('') +
    '</g>' +
    '<g>' +
    edgeWeightSVGText.value +
    '</g>' +
    '</svg>'
  );
}
const DEFAULTS = f.DEFAULTS;

/**
 * converts the graph to an svg string
 * @param graph the graph to convert to svg
 * @param settings the settings to use in rendering, will apply default settings if left empty, unlike the renderer() function
 * @returns the output of the renderer() function, with default settings options if the settings field is left empty
 */
function render(graph, settings): string {
  settings = resolveDefaults(settings, DEFAULTS);
  return renderer(graph, settings);
}
