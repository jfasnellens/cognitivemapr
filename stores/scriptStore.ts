/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

/* eslint-disable camelcase */
import { defineStore, acceptHMRUpdate } from 'pinia';
import * as _ from 'lodash';
import { v4 as uuid } from 'uuid';
import { paradigm_supportScript } from '~/scripts/ParadigmSupport';
import {
  buildGraphScript,
  generateNodesBasedOnEdgesScript,
  replaceNodesScript,
} from '~/scripts/buildGraph';
import { evaluateConceptsScript } from '~/scripts/evaluateConcepts';
import { extractSpeakerScript, extractTimePeriodScript } from '~/scripts/filterGraph';
import { instrumentSupportScript } from '~/scripts/instrumentSupport';
import { ExportHumanCSV } from '~/exporters/exporthumancsv';
import { ExportPNG } from '~/exporters/exportPng';
import { ExportJPG } from '~/exporters/exportJpg';
import { ExportSVG } from '~/exporters/exportsvg';
import { ExportPDF } from '~/exporters/exportPdf';
import { readCSVScript, convertObjToEdgeList, convertObjToNodeList } from '~/scripts/parseCSV';
import type { Edge, Graph, GraphSettings, ISODateString, Node, UUID } from '~/types/graph';
import { ScriptError } from '~/types/errors';
import type { OptionType, UrlString } from '~/types/exporter';
import { EntryType } from '~/types/graph';

export const useScriptStore = defineStore('scriptStore', () => {
  // Record of graphs to remember
  const graphs: Ref<Record<string, Graph>> = ref({});
  const graphIds: Ref<string[]> = ref([]); // The graphs also have back-ups. So it is needed for getting the right graph based on the index of the tab.
  const globalStore = useGlobalStore();
  const graphsRequiringValues: Ref<Array<string>> = ref([]); // Used on the upload page for the cycle evaluation popup
  const nodesRequiringValues: Ref<Record<string, Array<{ node: Node; values: number[] }>>> = ref(
    {},
  );

  /**
   * Function to retrieve the graph storage in its entirety.
   * @returns Read only graph storage content.
   */
  function getGraphs() {
    return graphs.value;
  }

  /**
   * Resets the graph data
   */
  function resetGraph() {
    graphs.value = {} as Record<string, Graph>;
    graphIds.value = [] as string[];
    graphsRequiringValues.value = [];
    nodesRequiringValues.value = {};
  }

  /**
   * Build the graph based on the given nodeList and edgeList
   * @param edgeList EdgeList graph should be constructed with
   * @param nodeList NodeList graph should be constructed with
   * @returns Graph
   */
  function buildGraph(edgeList: Array<Partial<Edge>>, nodeList?: Array<Node>): Graph {
    try {
      const { graph, warnings } = buildGraphScript(edgeList, nodeList);
      const UUID = uuid();
      graph.id = UUID;
      graphIds.value.push(UUID);
      graph.settings = getDefaultSettings(graph.paradigmPair);
      graphs.value[UUID] = graph;
      if (warnings.length === 0)
        globalStore.logSuccess({ message: 'Graph successfully build!', who: 'Graph builder' });
      else
        warnings.forEach((warning) =>
          globalStore.logWarning({
            who: `${warning.from} - ${warning.subComponent}`,
            message: warning.message,
          }),
        );
      return graph;
    } catch (error) {
      if (error instanceof ScriptError) {
        globalStore.logError({
          who: `${error.from} - ${error.subComponent}`,
          message: error.message,
        });
      } else {
        const err = error as Error;
        globalStore.logError({ message: err.message, error: err });
      }
      // Return empty graph if an error occured to ensure program doesn't hang
      return { nodeArray: [], edgeArray: [], nodes: {}, edges: {}, settings: getDefaultSettings() };
    }
  }

  /**
   * return default display settings for a graph
   * @param paradigmPair pair of strings that indicate the paradigm names
   * @returns default settings object for in the graph object
   */
  function getDefaultSettings(paradigmPair?: [string, string]) {
    const colors = globalStore.colorBlindMode
      ? {
          paradigmA: '#D851E6',
          paradigmB: '#79E279',
          noParadigm: '#DCDCDC',
          positiveEdge: '#2097B7',
          neutralEdge: '#A2A2A2',
          negativeEdge: '#9C0A31',
        }
      : {
          paradigmA: '#FFC20A',
          paradigmB: '#0C7BDC',
          noParadigm: '#8b8b8b',
          positiveEdge: '#25EB36',
          neutralEdge: '#8b8b8b',
          negativeEdge: '#FC6666',
        };

    const defaultSettings: GraphSettings = {
      legend: {},
      show: {
        positiveEdges: true,
        negativeEdges: true,
        neutralEdges: true,
      },
      highlight: {
        paradigmA: false,
        paradigmB: false,
        paradigmNone: false,
      },
    };

    if (paradigmPair) {
      defaultSettings.legend.paradigmA = {
        text: paradigmPair ? paradigmPair[0] : '',
        color: colors.paradigmA,
        type: EntryType.Paradigm,
      };

      defaultSettings.legend.paradigmB = {
        text: paradigmPair ? paradigmPair[1] : '',
        color: colors.paradigmB,
        type: EntryType.Paradigm,
      };
    }

    defaultSettings.legend.noParadigm = {
      text: 'No paradigm',
      color: colors.noParadigm,
      type: EntryType.Paradigm,
    };
    defaultSettings.legend.positiveEdge = {
      text: 'Positive effect',
      color: colors.positiveEdge,
      type: EntryType.Arrow,
    };
    defaultSettings.legend.negativeEdge = {
      text: 'Negative effect',
      color: colors.negativeEdge,
      type: EntryType.Arrow,
    };
    defaultSettings.legend.neutralEdge = {
      text: 'Neutral effect',
      color: colors.neutralEdge,
      type: EntryType.Arrow,
    };

    return defaultSettings;
  }

  /**
   * This function runs the evaluate_concepts script found in the scripts folder
   * @param graphId GraphId to run the script in
   * @returns Graph with the concepts evaluated within the data.
   */
  function evaluateConcepts(graphId: string): Graph {
    const inputGraph = graphs.value[graphId];
    const graph = _.cloneDeep<Graph>(inputGraph); // Make sure the input graph is not modified, but a new one returned
    try {
      const backupGraph = _.cloneDeep<Graph>(graph); // Clone with no references
      graphs.value[`${graphId}_evaluateConcept_backup`] = backupGraph;
      const newGraph = evaluateConceptsScript(graph);
      graphs.value[graphId] = newGraph;
      return newGraph;
    } catch (error) {
      if (error instanceof ScriptError) {
        if (error.data) {
          // User values required error is the only one that passes along data
          graphsRequiringValues.value.push(graphId);
          nodesRequiringValues.value[graphId] = error.data as Array<{
            node: Node;
            values: number[];
          }>;
        } else {
          globalStore.logError({
            who: `${error.from} - ${error.subComponent}`,
            message: error.message,
          });
        }
      } else {
        const err = error as Error;
        globalStore.logError({ message: err.message, error: err });
      }
      // Return original graph if an error occured
      return graphs.value[graphId];
    }
  }

  /**
   * This function runs the extractSpeaker script found in the filterGraph script
   * @param graphId GraphId to run the script in
   * @param speaker Speaker to filter on
   * @returns Graph with the filtered data
   */
  function extractSpeaker(graphId: string, speaker: string): Graph {
    const graph = graphs.value[graphId];
    const backupGraph = _.cloneDeep<Graph>(graph); // Clone with no references
    graphs.value[`${graphId}_filterGraph_backup`] = backupGraph;
    const extract: { edges: Array<Edge>; nodes: Array<Node> } = extractSpeakerScript(
      graph,
      speaker,
    );
    const newGraph: Graph = buildGraph(extract.edges, extract.nodes);
    graphs.value[graphId] = newGraph;
    return newGraph;
  }

  /**
   * This function runs the extractSpeaker script found in the filterGraph script
   * @param graphId GraphId to run the script in
   * @param startdate ISO date string on where to start filtering
   * @param enddate ISO date string to stop filtering
   * @returns Graph with the filtered data
   */
  function extractTimePeriod(
    graphId: string,
    startdate: ISODateString,
    enddate: ISODateString,
  ): Graph {
    const graph = graphs.value[graphId];
    const backupGraph = _.cloneDeep<Graph>(graph); // Clone with no references
    graphs.value[`${graphId}_filterGraph_backup`] = backupGraph;
    const extract = extractTimePeriodScript(graph, startdate, enddate);
    const newGraph: Graph = buildGraph(extract.edges, extract.nodes);
    graphs.value[graphId] = newGraph;
    return newGraph;
  }

  /**
   * This function runs the paradigm_support script found in the scripts folder
   * @param graphId GraphId to run the script on
   * @returns New graph with paradigms embedded in nodes
   */
  function paradigmSupport(graphId: string): Graph {
    const inputGraph = graphs.value[graphId];
    const graph = _.cloneDeep<Graph>(inputGraph);
    const backupGraph = _.cloneDeep<Graph>(graph); // Clone with no references
    graphs.value[`${graphId}_paradigmSupport_backup`] = backupGraph;
    const newGraph = _replaceNodes(
      graph,
      paradigm_supportScript(graph.nodeArray, graph.paradigmPair![0], graph.paradigmPair![1]),
    );
    graphs.value[graphId] = newGraph;
    return newGraph; // used only for testing
  }

  /**
   * Converts a nodelist from a graph to CSV
   * @param graphId Graph to convert from
   * @returns CSV as string
   */
  function nodesToCSV(graphId: UUID) {
    const exporter = new ExportHumanCSV(getGraphs()[graphId]);
    return exporter.nodesToCSV();
  }

  /**
   * Converts a edgelist from a graph to CSV
   * @param graphId Graph to convert from
   * @returns CSV as string
   */
  function edgesToCSV(graphId: UUID) {
    const exporter = new ExportHumanCSV(getGraphs()[graphId]);
    return exporter.edgesToCSV();
  }

  /**
   * Exports graph as url string in the preffered formats.
   * @param graph Graph to export to URL
   * @param types The types of the exports
   * @returns URLs as strings
   */
  async function exporter(graph: Graph, types: OptionType[]): Promise<UrlString[]> {
    const urlList: UrlString[] = [];
    await Promise.all(
      types.map(async (type) => {
        let exporter;
        switch (type.value) {
          case 'csv': {
            exporter = new ExportHumanCSV(graph);
            const exp = await exporter.export();
            // this is a special case because you get 2 urls.
            urlList.push({ url: exp[0], type: 'Nodelist' });
            urlList.push({ url: exp[1], type: 'Edgelist' });
            break;
          }
          case 'png': {
            exporter = new ExportPNG();
            break;
          }
          case 'jpg': {
            exporter = new ExportJPG();
            break;
          }
          case 'svg': {
            exporter = new ExportSVG();
            break;
          }
          case 'pdf': {
            exporter = new ExportPDF();
            break;
          }
        }
        if (type.value !== 'csv') {
          const exp = await exporter!.export(graph);
          exp?.forEach((url) => {
            urlList.push({ url, type: type.value });
          });
        }
      }),
    );
    return urlList;
  }

  /**
   * This function runs the instrumentSupport script found in the scripts folder
   * @param graphId Graph to run the script on
   * @returns Updated graph
   */
  function instrumentSupport(graphId: string) {
    const inputGraph = graphs.value[graphId];
    const graph = _.cloneDeep<Graph>(inputGraph);
    const backupGraph = _.cloneDeep<Graph>(graph); // Clone with no references
    graphs.value[`${graphId}_instrumentSupport_backup`] = backupGraph;
    const newGraph = _replaceNodes(graph, instrumentSupportScript(graph.nodeArray));
    graphs.value[graphId] = newGraph;
    return newGraph;
  }
  /**
   * Reads the given CSV file and parses it into the right type. Fills the return object with the correct array
   * @param csvFile CSV file to parse
   * @param options Options to give to the parser, currently only contains possible types
   * @param options.type Type of file to parse file data into
   * @returns Object with possible a nodelist, edgelist or parseless file depending on the option type given.
   */
  async function readCSV(
    csvFile: File,
    options: { type: 'nodelist' | 'edgelist' | 'noparse' },
  ): Promise<{
    nodelist?: Array<Node>;
    edgelist?: Array<Partial<Edge>>;
    parseless?: Array<Record<string, string>>;
  }> {
    try {
      const fileObject = await readCSVScript(csvFile);
      switch (options.type) {
        case 'edgelist':
          return { edgelist: convertObjToEdgeList(fileObject) };
        case 'nodelist':
          return { nodelist: convertObjToNodeList(fileObject) };
        default:
          return { parseless: fileObject };
      }
    } catch (error) {
      if (error instanceof ScriptError) {
        globalStore.logError({
          message: error.message,
          who: `${error.from} - ${error.subComponent}`,
        });
      } else {
        const err = error as Error;
        globalStore.logError({ message: err.message, error: err });
      }
    }
    return {};
  }

  /**
   * Generates a node list based on the edge list provided
   * @param edges List of (partial) Edges to base the nodes on
   * @returns Node list with derived data
   */
  function generateNodesBasedOnEdges(edges: Array<Partial<Edge>>) {
    return generateNodesBasedOnEdgesScript(edges);
  }
  /**
   * Helper function for replacing the node array or dictionairy in a graph object.
   * @param graph graph the nodes should be replaced of
   * @param nodes nodes to replace it with
   * @returns Updated graph with new nodes
   */
  function _replaceNodes(graph: Graph, nodes: Array<Node>): Graph {
    return replaceNodesScript(graph, nodes);
  }

  return {
    buildGraph,
    evaluateConcepts,
    extractSpeaker,
    extractTimePeriod,
    paradigmSupport,
    getGraphs,
    instrumentSupport,
    nodesToCSV,
    edgesToCSV,
    exporter,
    readCSV,
    graphs,
    graphsRequiringValues,
    nodesRequiringValues,
    graphIds,
    generateNodesBasedOnEdges,
    resetGraph,
    getDefaultSettings,
  };
});

// make sure to pass the right store definition, `useAuth` in this case.
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useScriptStore, import.meta.hot));
}
