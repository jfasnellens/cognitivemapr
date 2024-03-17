<!--This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
It is distributed under the GPL 3.0 open source license.-->

<template lang="pug">
.wrapper
  .mainContent
    .infoTekst
      p Below you'll find the upload table. Here you can upload your edgelist and nodelist of a speech. It is also possible to only upload an edgelist of a speech. In this case, the nodelist will be generated automatically. When you have uploaded your data, you can press next. Your speech will now be analysed and a graph will be generated.
    DynamicUpload
    .belowTableButtons
      Defaultbutton.previousButton(
        btn-type='back',
        btn-font-size='25px',
        @click='router.push("/")'
      ) Back

      Defaultbutton.clearTable(btn-type='clear', btn-font-size='25px', @click='clearStore') Clear Table

      Defaultbutton.nextButton(
        :btn-type='fileStore.collections.length === 0 ? "disabled" : "next"',
        btn-font-size='25px',
        @click='validateCollections()'
      ) Next

    PopupComponentsUploadPopUp(
      v-if='showModal && !cycleEvaluation',
      :no-name='noName',
      :no-edge='noEdge',
      :no-node='noNode',
      @close-modal='showModal = !showModal',
      @ignore-warnings='createGraphs()'
    )

    PopupComponentsCycleEvaluation(
      v-if='cycleEvaluation',
      :graph-name='graphEvaluatedName',
      :values-required='nodesEvaluated',
      @close-popup='cycleEvaluation = !cycleEvaluation',
      @cancel-evaluation='skipScripts',
      @pick-values='pickValues'
    )
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useFileStore } from '@/stores/fileStore';
import { useScriptStore } from '@/stores/scriptStore';
import type { Graph, Node } from '~/types/graph';

const fileStore = useFileStore();
const scriptStore = useScriptStore();
const globalStore = useGlobalStore();

const { clearStore } = fileStore;
const { collections } = storeToRefs(fileStore);

const showModal: Ref<boolean> = ref(false);
const noName: Ref<number> = ref(0);
const noEdge: Ref<Array<string>> = ref([]);
const noNode: Ref<Array<string>> = ref([]);

const router = useRouter();

const cycleEvaluation: Ref<boolean> = ref(false);
const graphEvaluated: Ref<string | undefined> = ref(undefined);
const graphEvaluatedName: Ref<string | undefined> = ref(undefined);
const nodesEvaluated: Ref<Array<{ node: Node; values: number[] }> | undefined> = ref(undefined);

/**
 * Validates if collections are complete
 */
function validateCollections() {
  globalStore.errorVisible = false;
  noName.value = 0;
  noEdge.value = [];
  noNode.value = [];

  collections.value.forEach((collection) => {
    if (!collection.nodeList) {
      noNode.value.push(collection.name);
    }
    if (!collection.edgeList) {
      noEdge.value.push(collection.name);
    }
    if (collection.name === '') {
      noName.value++;
    }
  });

  if (noName.value > 0 || noEdge.value.length > 0 || noNode.value.length > 0) {
    showModal.value = true;
  } else if (collections.value.length > 0) {
    createGraphs();
  }
}

/**
 * Fills the graph storage in script store with the given collections. Then passes the first graph into the next page.
 */
async function createGraphs() {
  scriptStore.resetGraph();
  const ids = await Promise.all(
    collections.value.map(async (collection) => {
      const promises = [scriptStore.readCSV(collection.edgeList!, { type: 'edgelist' })];
      if (collection.nodeList)
        promises.push(scriptStore.readCSV(collection.nodeList, { type: 'nodelist' }));
      const [{ edgelist }, possibleNodeList] = await Promise.all(promises);
      const graph = scriptStore.buildGraph(edgelist ?? [], possibleNodeList?.nodelist);
      graph.name = collection.name;

      // Protection against unbuilt graphs due to errors.
      if (graph.edgeArray.length < 1) return;

      const analysedGraph: Graph = runScripts(graph);
      return analysedGraph.id;
    }),
  );
  const idToShow = ids.filter((id) => id !== undefined)[0];
  if (idToShow && !globalStore.errorVisible) tryNavigate();
}

/**
 * Runs evaluate concepts, instrument support and optionally paradigm support on a graph
 * @param graph The graph on which to run the scripts
 * @returns The graph with analyses applied to it
 */
function runScripts(graph: Graph): Graph {
  const prevLength = scriptStore.graphsRequiringValues.length;
  let newGraph = scriptStore.evaluateConcepts(graph.id!);
  if (scriptStore.graphsRequiringValues.length <= prevLength) {
    // i.e. the graph does not require user input, otherwise the list would have become longer
    newGraph = scriptStore.instrumentSupport(graph.id!);
    if (newGraph.paradigmPair) {
      newGraph = scriptStore.paradigmSupport(graph.id!);
    }
  }
  return newGraph;
}

/**
 * Allows the graph to be visualized without running any scripts
 */
function skipScripts(): void {
  cycleEvaluation.value = false;
  scriptStore.graphsRequiringValues.shift(); // This graph is no longer evaluated, so throw it out of the list
  tryNavigate();
}

/**
 * Puts the values chosen by the user into the graph and reruns the scripts
 * @param iteration The iteration of the cycle evaluation of which the values have been selected
 */
function pickValues(iteration: number): void {
  cycleEvaluation.value = false;
  // The popup evaluates the first graph in the array of those requiring values, so it can be retrieved by again getting the first graph of the array
  const graphId = scriptStore.graphsRequiringValues.shift(); // There is at least one in the array, otherwise this function wouldn't be called
  const graph = scriptStore.graphs[graphId!];
  scriptStore.nodesRequiringValues[graphId!].forEach(
    (nodeObj: { node: Node; values: number[] }) => {
      const actualNode: Node = graph.nodes[nodeObj.node.id];
      actualNode.evaluation.pickedValue = nodeObj.values[iteration - 1];
    },
  );
  runScripts(graph);
  tryNavigate();
}

/**
 * Checks whether user values are required for any graph. If so, sets the data for correct popup display. If not, navigates to the graph page
 */
function tryNavigate() {
  if (scriptStore.graphsRequiringValues.length > 0) {
    // i.e. if there's at least one graph that requires user input
    graphEvaluated.value = scriptStore.graphsRequiringValues[0];
    nodesEvaluated.value = scriptStore.nodesRequiringValues[graphEvaluated.value];
    graphEvaluatedName.value = scriptStore.graphs[graphEvaluated.value].name;
    cycleEvaluation.value = true;
  } else {
    navigateTo({
      path: '/graph',
    });
  }
}

onMounted(() => {
  scriptStore.resetGraph();
});
</script>

<style lang="scss">
#nuxt-test {
  height: 100%;
}
.wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.mainContent {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  .infoTekst {
    margin-bottom: 2rem;
    width: 70%;
    p {
      line-height: 1.3rem;
      font-size: 1.25rem;
      text-align: center;
    }
  }
}
.belowTableButtons {
  margin-top: 2em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70%;
}
</style>
