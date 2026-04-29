/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

export const fragmentShaderSource = `precision mediump float;

//these are imported from vertex shader
varying vec4 v_color;
varying float v_border;

//decide thickness of border by adjusting these two params
const float radius = 0.505;
const float halfRadius = 0.4;

void main(void) {
  vec4 transparent = vec4(0.0, 0.0, 0.0, 0.0);
  vec4 white = vec4(1.0, 1.0, 1.0, 1.0);
  float distToCenter = length(gl_PointCoord - vec2(0.5, 0.5));

  float t = 0.0;
  //center of node
  if (distToCenter < halfRadius - v_border)
    gl_FragColor = transparent;
  //border
  else if (distToCenter <= radius)
    gl_FragColor = v_color;
  //outside of border
  else
    gl_FragColor = transparent;
}`;
