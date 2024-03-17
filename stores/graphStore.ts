/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

import { defineStore } from 'pinia';
import { DirectedGraph } from 'graphology';
import type Graphology from 'graphology';

/* eslint-disable-next-line import/default */
import SugiyamaWorker from 'assets/workers/sugiyama?worker';
import type { Graph, UUID } from '@/types/graph';
import type { DefaultSugiyama, MutGraph } from 'd3-dag';
import SugiyamaWorker from 'assets/workers/sugiyama?worker'; // eslint-disable-line

import type { Graph, UUID } from '@/types/graph';

export const useGraphStore = defineStore('graphStore', () => {
  const activeTab: Ref<number> = ref(0);

  /**
   * Calculate positions according to Sugiyama layout
   * @param inputGraph Graph to build sugiyama layout on
   * @returns Node record of node positions
   */
  async function layoutSugiyama(
    inputGraph: Graph,
  ): Promise<Record<number | UUID, { x: number; y: number }>> {
    const { grf } = await new Promise<{ grf: MutGraph<string, never>; layout: DefaultSugiyama }>(
      (resolve) => {
        const worker = new SugiyamaWorker();
        // Remove unneeded data for layout graph
        const layoutGraph = {
          nodes: inputGraph.nodes,
          edges: inputGraph.edges,
          nodeArray: inputGraph.nodeArray,
          edgeArray: inputGraph.edgeArray,
        };
        worker.postMessage(JSON.stringify(layoutGraph));
        worker.addEventListener(
          'message',
          (e) => {
            if (e.data) {
              const { grf, layout } = JSON.parse(e.data);
              resolve({ grf, layout });
              worker.terminate();
            } else {
              throw new Error('Error in sugiyama script');
            }
          },
          false,
        );
      },
    );

    const record: Record<number | UUID, { x: number; y: number }> = {};
    for (const node of grf.nodes) {
      record[node.data as number | UUID] = { x: node.x, y: node.y };
    }

    // Small fix for lonely nodes
    inputGraph.nodeArray.forEach((node, index) => {
      if (record[node.id]) return;
      record[node.id] = { x: 3 - index, y: 3 };
    });

    return record;
  }

  /**
   * Convert Graph object into a displayable graph
   * @param inputGraph graph that sould be displayed
   * @returns           graph object to be used by sigma/graphology
   */
  async function createGraph(inputGraph: Graph): Promise<Graphology> {
    const positions: Record<number | UUID, { x: number; y: number }> | undefined =
      await layoutSugiyama(inputGraph);
    const graph = new DirectedGraph();
    inputGraph.nodeArray.forEach(
      ({ id, nodeName, evaluation, paradigmSupport, instr, weightedDegrees }) => {
        graph.addNode(id, {
          label: nodeName,
          value: evaluation.value,
          paradigmA: paradigmSupport ? paradigmSupport.paradigmA.value : null,
          paradigmB: paradigmSupport ? paradigmSupport.paradigmB.value : null,
          instrument: instr,
          degrees: weightedDegrees.all,
          size: 5,
          x: positions![id].y * 13,
          y: -positions![id].x,
          type: 'border',
        });
      },
    );

    const allWeights = inputGraph.edgeArray.map((edge) => edge.weight);
    const maxWeight = Math.max(...allWeights);
    const minWeight = Math.min(...allWeights);

    inputGraph.edgeArray.forEach(({ from, to, weight, edgeValue }) => {
      graph.mergeEdge(from, to, { type: 'arrow', weight, maxWeight, minWeight, value: edgeValue });
    });
    return graph;
  }

  /**
   * Function that serves as a labelRenderer within sigma. This one extends the default renderer by adding a second line where the instrument support data will be shown
   * @param context sigma will use to draw the labels
   * @param data node data from sigma. includes label text and instrument values (No type defined in sigma library)
   * @param settings sigma will use to draw the labels (No type defined in sigma library)
   */
  function drawLabelWithAttributes(context: CanvasRenderingContext2D, data, settings) {
    if (data.label) {
      const size = settings.labelSize;
      const font = settings.labelFont;
      const weight = settings.labelWeight;
      const color = settings.labelColor.attribute
        ? data[settings.labelColor.attribute] || settings.labelColor.color || '#000'
        : settings.labelColor.color;
      context.fillStyle = color;
      context.font = ''.concat(weight, ' ').concat(size, 'px ').concat(font);
      if (useGlobalStore().scriptSettings.instrumentSupport.enabled && data.instrument) {
        context.fillText(data.label, data.x + data.size + 3, data.y + size / 3 - 5);
        context.fillText(
          '> ' + data.instrument.name + ' (' + data.instrument.value + ')',
          data.x + data.size + 3,
          data.y + size / 3 + 5,
        );
      } else {
        context.fillText(data.label, data.x + data.size + 3, data.y + size / 3);
      }

      if (useGlobalStore().visualSettings.showDegreeValues.enabled) {
        context.font = ''.concat(weight, ' ').concat(data.size, 'px ').concat('Consolas');
        context.fillStyle = '#fff';
        // set baseline to middle to center text vertically
        context.textBaseline = 'middle';
        const value = data.degrees.toString();
        const textWidth = context.measureText(value).width;
        context.fillText(value, data.x - textWidth / 2, data.y + data.size / 20);
        // reset baseline for other texts
        context.textBaseline = 'alphabetic';
      }
    }
  }

  /**
   * Function that serves as a hoverRenderer within sigma. This one extends the default renderer by making the hover background bigger
   * @param context from the canvas where graph is drawn
   * @param data from the node, like instrument text and value
   * @param settings sigma will use to draw the nodes
   */
  function drawHoverWithAttributes(context: CanvasRenderingContext2D, data, settings) {
    const size = settings.labelSize;
    const font = settings.labelFont;
    const weight = settings.labelWeight;
    const backgroundColor = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue('--background-color');
    const textColor = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue('--txt-color');
    context.font = ''.concat(weight, ' ').concat(size, 'px ').concat(font);
    // Then we draw the label background
    context.fillStyle = backgroundColor;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.shadowBlur = 8;
    context.shadowColor = textColor;
    const PADDING = 2;
    if (typeof data.label === 'string') {
      const textWidth =
        data.instrument && useGlobalStore().scriptSettings.instrumentSupport.enabled
          ? Math.max(
              context.measureText(data.label).width,
              context.measureText('> ' + data.instrument.name + ' (' + data.instrument.value + ')')
                .width,
            )
          : context.measureText(data.label).width;
      const boxWidth = Math.round(textWidth + 5);
      const boxHeight =
        data.instrument && useGlobalStore().scriptSettings.instrumentSupport.enabled
          ? Math.round(size + 6 * PADDING)
          : Math.round(size + 2 * PADDING);
      const radius = Math.max(data.size, size / 2) + PADDING;
      const angleRadian = Math.asin(boxHeight / 2 / radius);
      const xDeltaCoord = Math.sqrt(Math.abs(Math.pow(radius, 2) - Math.pow(boxHeight / 2, 2)));
      context.beginPath();
      context.moveTo(data.x + xDeltaCoord, data.y + boxHeight / 2);
      context.lineTo(data.x + radius + boxWidth, data.y + boxHeight / 2);
      context.lineTo(data.x + radius + boxWidth, data.y - boxHeight / 2);
      context.lineTo(data.x + xDeltaCoord, data.y - boxHeight / 2);
      context.arc(data.x, data.y, radius, angleRadian, -angleRadian);
      context.closePath();
      context.fill();
    } else {
      context.beginPath();
      context.arc(data.x, data.y, data.size + PADDING, 0, Math.PI * 2);
      context.closePath();
      context.fill();
    }
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.shadowBlur = 0;
    // And finally we draw the label
    drawLabelWithAttributes(context, data, settings);
  }

  return {
    createGraph,
    drawLabelWithInstruments: drawLabelWithAttributes,
    drawHoverWithInstruments: drawHoverWithAttributes,
    activeTab,
  };
});
