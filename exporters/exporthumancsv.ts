/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

import _ from 'lodash';
import { isUUID, nodeIdToName } from '~/scripts/utils';
import type { Exporter } from '~/types/exporter';
import type { Graph, Edge, Node } from '~/types/graph';
import { useGlobalStore } from '#imports';

export class ExportHumanCSV implements Exporter {
  nodeNameIdMap = new Map<string, number>();
  nodeIdCounter = 0;
  edgeIdCounter = 0;
  graph!: Graph;
  constructor(graph: Graph) {
    this.graph = graph;
  }

  /**
   * Exports full graph to human readable CSV
   * @returns String array with edge and node array in base64 form
   */
  async export(): Promise<string[]> {
    return await new Promise((resolve) => {
      const csvnodes: string = this.nodesToCSV();
      const csvedges: string = this.edgesToCSV();

      const nodesblob = new Blob([csvnodes], { type: 'text/csv;charset=utf-8,' });
      const edgesblob = new Blob([csvedges], { type: 'text/csv;charset=utf-8,' });

      const urls: string[] = [URL.createObjectURL(nodesblob)];
      urls.push(URL.createObjectURL(edgesblob));

      resolve(urls);
    });
  }

  /**
   * Converts Nodes from the graph to a CSV
   * @returns Node array in CSV base64 form.
   */
  nodesToCSV(): string {
    // If paradigm support has not run, we don't want columns with NA, so we can't always add the columns
    // To let the columns be added only when paradigm support is present,
    // we keep the part of the string for the paradigm colums empty when there are no paradigms
    const globalStore = useGlobalStore();
    const paradigms: boolean = globalStore.scriptSettings.paradigmSupport.enabled;
    const instruments: boolean = globalStore.scriptSettings.instrumentSupport.enabled;
    let paradigmSupport = '';
    let instrumentSupport = '';
    if (this.graph.nodeArray[0].paradigmSupport && paradigms) {
      // Only set when paradigm support has run and is enabled
      paradigmSupport = `;${this.graph.paradigmPair![0]};${this.graph.paradigmPair![1]}`;
    }
    if (instruments) instrumentSupport = `;instr_support`; // Only when instrument support is enabled

    let csvcontent: string =
      `id;node_name;input_value;picked_value;value;paradigms${paradigmSupport};instr${instrumentSupport};int` +
      `;degrees;in_degrees;out_degrees;degrees_w;in_degrees_w;out_degrees_w;go;go_w`; // Column headers
    const exporterNodes = _.cloneDeep(this.graph.nodeArray);
    exporterNodes.forEach((node) => {
      // Rows
      csvcontent +=
        `\n${this.nodeId(node) ?? 'Unknown ID'}` + // Unfortunately, typescript converts undefined to "undefined", so they have to be checked
        `;${node.nodeName ?? 'NA'}` +
        `;${node.evaluation.inputValue ?? 'NA'}` +
        `;${node.evaluation.pickedValue ?? 'NA'}` +
        `;${node.evaluation.value ?? 'NA'}` +
        `;${node.paradigm ?? 'NA'}` +
        // Note that paradigm columns are optional, so the separator shouldn't be added by default
        `${
          paradigms && node.paradigmSupport
            ? ';' + (node.paradigmSupport.paradigmA.value ?? 'NA')
            : ''
        }` +
        `${
          paradigms && node.paradigmSupport
            ? ';' + (node.paradigmSupport.paradigmB.value ?? 'NA')
            : ''
        }` +
        `;${node.instr?.name ?? 'NA'}` +
        `${instruments ? ';' + (node.instr?.value ?? 'NA') : ''}` +
        `;${node.int ?? 'NA'}` +
        `;${node.degrees.all ?? 'NA'}` +
        `;${node.degrees.in ?? 'NA'}` +
        `;${node.degrees.out ?? 'NA'}` +
        `;${node.weightedDegrees.all ?? 'NA'}` +
        `;${node.weightedDegrees.in ?? 'NA'}` +
        `;${node.weightedDegrees.out ?? 'NA'}` +
        `;${node.go ?? 'NA'}` +
        `;${node.goW ?? 'NA'}`;
    });

    return csvcontent;
  }

  /**
   * Converts edges from graph to CSV
   * @returns Edge array in CSV Base64 form
   */
  edgesToCSV(): string {
    let csvcontent: string = 'from;to;edge_id;edge_value;weight;map_id;map_date;speaker'; // Column headers
    this.graph.edgeArray.forEach((edge) => {
      // Rows
      csvcontent +=
        `\n${nodeIdToName(this.graph, edge.from.toString())}` +
        `;${nodeIdToName(this.graph, edge.to.toString()) ?? ''}` +
        `;${this.edgeId(edge) ?? ''}` +
        `;${edge.edgeValue ?? ''}` +
        `;${edge.weight ?? ''}` +
        `;${edge.mapId ?? ''}` +
        `;${edge.mapDate ? this.dateToString(edge.mapDate) : ''}` +
        `;${edge.speaker ?? ''}`;
    });
    return csvcontent;
  }

  /**
   * Converts date to string in right format
   * @param date Date ISO string to convert
   * @returns Returns DD-MM-YYYY formatted date as string
   */
  dateToString(date: string): string {
    const dayjs = useDayjs();
    return dayjs(date).format('DD-MM-YYYY').toString();
  }

  /**
   * Retrieves node ID
   * @param node Node to retrieve ID from
   * @returns Node ID
   */
  nodeId(node: Node) {
    if (isUUID(node.id.toString())) {
      this.nodeNameIdMap.set(node.nodeName, this.nodeIdCounter);
      node.id = this.nodeIdCounter;
      this.nodeIdCounter++;
    }
    return node.id;
  }

  /**
   * Retrieves edge ID
   * @param edge edge to retrieve ID from
   * @returns edge ID
   */
  edgeId(edge: Edge) {
    if (isUUID(edge.id.toString())) {
      edge.id = this.edgeIdCounter;
      this.edgeIdCounter++;
    }
    return edge.id;
  }
}
