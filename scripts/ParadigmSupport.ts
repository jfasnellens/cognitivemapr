/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

/* eslint-disable camelcase */
import type { Node, NamedValue } from '../types/graph';
import { ScriptError } from '~/types/errors';
// !   assuming node.value can only be 0, 1 or -1   !
/**
 * Runs paradigm support script from Prof van Esch's R package on a node array
 * @param vertices Nodes to run script in
 * @param paradigm_a Paradigm to calculate with
 * @param paradigm_b Paradigm to calculate with
 * @returns Node array with paradigm support processed
 */
export function paradigm_supportScript(
  vertices: Array<Node>,
  paradigm_a: string,
  paradigm_b: string,
): Array<Node> {
  if (paradigm_a === paradigm_b) throw Error;
  let paradigm_a_value: number;
  let paradigm_b_value: number;
  vertices.forEach((node) => {
    if (node.evaluation.value === undefined) {
      throw new ScriptError({
        message:
          'One of the nodes was missing a value. Did something go wrong in the evaluate concepts script?',
        from: 'Analysis Scripts',
        subComponent: 'Paradigm Support',
      });
    }
    paradigm_a_value = Math.max(
      0,
      (Number(node.paradigm === paradigm_a) - // 1 if its paradigm a
        Number(node.paradigm === paradigm_b)) * // -1 if its paradigm b
        node.evaluation.value * // the value needs to be -1 if paradigm b and 1 if paradigm a
        node.weightedDegrees.all,
    );
    paradigm_b_value = Math.max(
      0,
      (Number(node.paradigm === paradigm_b) - // 1 if its paradigm b
        Number(node.paradigm === paradigm_a)) * // -1 if its paradigm a
        node.evaluation.value * // the value needs to be -1 if paradigm a and 1 if paradigm b
        node.weightedDegrees.all,
    );
    pushToNode(
      node,
      { name: paradigm_b, value: paradigm_b_value },
      { name: paradigm_a, value: paradigm_a_value },
    );
  });
  return vertices;

  /**
   * Pushes paradigm to nodes
   * @param node Node to set values on
   * @param paradigm_a_tuple Paradigm tuple of paradigm a
   * @param paradigm_a_tuple.name Name of paradigm
   * @param paradigm_a_tuple.value Value of paradigm support
   * @param paradigm_b_tuple Paradigm tuple of paradigm b
   * @param paradigm_b_tuple.name Name of paradigm
   * @param paradigm_b_tuple.value Value of paradigm support
   */
  function pushToNode(
    node: Node,
    paradigm_a_tuple: { name: string; value: number },
    paradigm_b_tuple: { name: string; value: number },
  ) {
    let leftParadigm: NamedValue;
    let rightParadigm: NamedValue;
    const comparison = paradigm_a_tuple.name.localeCompare(paradigm_b_tuple.name);
    if (comparison < 0) {
      // a is before b
      leftParadigm = paradigm_a_tuple;
      rightParadigm = paradigm_b_tuple;
    } else if (comparison > 0) {
      // b is before a
      leftParadigm = paradigm_b_tuple;
      rightParadigm = paradigm_a_tuple;
    } else throw Error;

    node.paradigmSupport = { paradigmA: leftParadigm, paradigmB: rightParadigm };
  }
}
