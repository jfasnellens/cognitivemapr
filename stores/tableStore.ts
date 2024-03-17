/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

// auth.js
import { defineStore, acceptHMRUpdate } from 'pinia';
import { nodeIdToName } from '~/scripts/utils';
import type {
  Node,
  Edge,
  RelevantKeys,
  Degrees,
  NamedValue,
  ParadigmSupport,
  Evaluation,
} from '~/types/graph';
import {
  dfltEdgeAliases,
  dfltNodeAliases,
  dfltEdgeKeys,
  dfltNodeKeys,
} from '~/assets/json/defaultGraphColumns';

export const useTableStore = defineStore('tableStore', () => {
  type Allowed =
    | Node
    | Edge
    | Degrees
    | NamedValue
    | Partial<NamedValue>
    | ParadigmSupport
    | Evaluation;

  const graphId = ref<string | undefined>(undefined);

  const relevantNodeKeys = ref<RelevantKeys[]>(dfltNodeKeys);
  const relevantEdgeKeys = ref<RelevantKeys[]>(dfltEdgeKeys);

  const nodeKeyAliases = ref<Record<string, string>>(dfltNodeAliases);
  const edgeKeyAliases = ref<Record<string, string>>(dfltEdgeAliases);

  /**
   * @param relevantColumns - key value pair matching either node or edge keys with their header title
   * @param keys - Keys to make a header for, order of this array is the order of the returned header array
   * @returns - An array with arrays for each header row, a header row holds tuples with the titel and the colSpan
   */
  function relevantOrderedHeader(
    relevantColumns: Record<string, string>,
    keys: RelevantKeys[],
  ): [string, number][][] {
    // finds the deepest child
    // is used to instantiate the returned array
    const getDepth = (currentKeys: RelevantKeys[]) => {
      const currentDepths: number[] = [];

      currentKeys.forEach((k) => {
        const depth = k.subKeys !== undefined ? 1 + getDepth(k.subKeys) : 1;
        currentDepths.push(depth);
      });

      return Math.max(...currentDepths);
    };

    const maxDepth = getDepth(keys);
    const orderedHeader: [string, number][][] = [];
    for (let i = 0; i < maxDepth; i++) orderedHeader.push([]);

    // counts all child keys recursively
    const colSpan = (key: RelevantKeys) => {
      let sumSpan = 0;
      key.subKeys?.forEach((sk) => (sumSpan = sumSpan + colSpan(sk)));
      return key.subKeys !== undefined ? sumSpan : 1;
    };

    // Recursively flattens RelavantKeys array
    // Gets header alias for a given key
    // Calculates the colSpan the header should be displayed with
    const fillHeader = (currentKeys: RelevantKeys[], depth: number) => {
      currentKeys.forEach((k) => {
        const alias = relevantColumns[k.key];
        const span = colSpan(k);
        orderedHeader[depth].push([alias, span]);

        if (k.subKeys !== undefined) fillHeader(k.subKeys, depth + 1);
        else for (let i = depth + 1; i < maxDepth; i++) orderedHeader[i].push(['', span]);
      });
    };

    fillHeader(keys, 0);

    return orderedHeader;
  }

  /**
   * @param edgeOrnode - object to turn into a string array
   * @param keys - determins the values that should be returned and their order
   * @returns - returns an array of strings that is meant to represent a row in the Body.Vue component
   */
  function relevantOrderedStrings(edgeOrnode: Allowed, keys: RelevantKeys[]): string[] {
    let ordered: string[] = [];

    keys.forEach((k) => {
      const value = edgeOrnode ? edgeOrnode[k.key] : undefined;

      const scriptStore = useScriptStore();

      if (
        (k.key === 'fromName' || k.key === 'toName') &&
        value?.toString() !== undefined &&
        graphId.value
      ) {
        ordered.push(nodeIdToName(scriptStore.graphs[graphId.value], value.toString()));
      } else if (k.subKeys)
        ordered = ordered.concat(relevantOrderedStrings(value as Allowed, k.subKeys!));
      else if (value !== undefined) ordered.push(value!.toString());
      else ordered.push('-');
    });

    return ordered;
  }

  return {
    graphId,
    nodeKeyAliases,
    edgeKeyAliases,
    relevantNodeKeys,
    relevantEdgeKeys,
    relevantOrderedHeader,
    relevantOrderedStrings,
  };
});
// make sure to pass the right store definition, `useAuth` in this case.
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTableStore, import.meta.hot));
}
