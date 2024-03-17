/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

import type { Node } from '../types/graph';
import { ScriptError } from '~/types/errors';

/**
 * This function sets the instrument value
 * to the positive value of weighted degrees when the value of the node is positive
 * and to the negative value of weighted degrees when the value of the node is negative.
 * when the node value is 0 the instrument value is also 0.
 * When there is no instrument name, the value is not set.
 */

/**
 * This function sets the instrument value to a positive or negative value if instrument present, otherwise 0
 * @param vertices Vertices to calculate instrument value of.
 * @returns Array with processed Vertices
 */
export function instrumentSupportScript(vertices: Array<Node>): Array<Node> {
  vertices.forEach((node) => {
    if (node.evaluation.value === undefined) {
      throw new ScriptError({
        message:
          'One of the nodes was missing a value. Did something go wrong in the evaluate concepts script?',
        from: 'Analysis Scripts',
        subComponent: 'Paradigm Support',
      });
    }
    if (node.evaluation.value > 0 && node.instr) node.instr.value = node.weightedDegrees.all!;
    else if (node.evaluation.value < 0 && node.instr) node.instr.value = -node.weightedDegrees.all!;
    else if (node.evaluation.value === 0 && node.instr) node.instr.value = 0;
  });
  return vertices;
}
