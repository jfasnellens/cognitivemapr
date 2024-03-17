/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

import { graphConnect, sugiyama } from 'd3-dag';

const sugiyamaRunner = (inputGraph) => {
  const builder = graphConnect()
    .sourceId(({ from }) => from.toString())
    .targetId(({ to }) => to.toString());
  const grf = builder(inputGraph.edgeArray);
  const layout = sugiyama();
  layout(grf);
  return { grf, layout };
};

self.addEventListener(
  'message',
  (e) => {
    const graph = JSON.parse(e.data);
    let { grf, layout } = sugiyamaRunner(graph);
    self.postMessage(JSON.stringify({ grf, layout }));
  },
  false,
);
