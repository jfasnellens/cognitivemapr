/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

/**
 * This class copies sigma/rendering/webgl/programs/node.fast, but with a tiny
 * difference: The fragment shader ("./node.border.frag.glsl") draws a white
 * disc with a colored border.
 */
import { floatColor } from 'sigma/utils';
import type { NodeBorderDisplayData } from '~/types/display';
import { AbstractNodeProgram } from 'sigma/rendering/webgl/programs/common/node';
import type { RenderParams } from 'sigma/rendering/webgl/programs/common/program';

import { vertexShaderSource } from './node.border.vert';
import { fragmentShaderSource } from './node.border.frag';

const POINTS = 1,
  ATTRIBUTES = 4;

export default class NodeProgramBorder extends AbstractNodeProgram {
  constructor(gl: WebGLRenderingContext) {
    super(gl, vertexShaderSource, fragmentShaderSource, POINTS, ATTRIBUTES);
    this.bind();
  }

  process(data: NodeBorderDisplayData, hidden: boolean, offset: number): void {
    const array = this.array;
    let i = offset * POINTS * ATTRIBUTES;

    if (hidden) {
      array[i++] = 0;
      array[i++] = 0;
      array[i++] = 0;
      array[i++] = 0;
      return;
    }

    let color = 0;
    if (data.borderColor) {
      color = floatColor(data.borderColor);
    }

    array[i++] = data.x;
    array[i++] = data.y;
    array[i++] = data.size;
    array[i] = color;
  }

  render(params: RenderParams): void {
    const gl = this.gl;

    const program = this.program;
    gl.useProgram(program);

    gl.uniform1f(this.ratioLocation, 1 / Math.sqrt(params.ratio));
    gl.uniform1f(this.scaleLocation, params.scalingRatio);
    gl.uniformMatrix3fv(this.matrixLocation, false, params.matrix);

    gl.drawArrays(gl.POINTS, 0, this.array.length / ATTRIBUTES);
  }
}
