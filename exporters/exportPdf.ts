/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

import { Sigma } from 'sigma';
import { toCanvas } from 'html-to-image';
import type { Exporter } from '~/types/exporter';
import type { Graph } from '~/types/graph';

export class ExportPDF implements Exporter {
  graphStore = useGraphStore();
  /**
   * Exports full graph to pdf
   * @param graphObject  the graph to export.
   * @returns String array with pdf in base64 form
   */
  async export(graphObject: Graph): Promise<string[]> {
    const graph = graphObject.sigmaGraph;
    const { width, height } = graph!.getDimensions();

    // create a new div for the new sigma graph
    const root = document.createElement('div');
    root.style.width = `${width}px`;
    root.style.height = `${height}px`;
    root.style.position = 'absolute';
    root.style.right = '101%';
    root.style.bottom = '101%';
    document.body.appendChild(root);

    // make a new sigma graph
    const settings = graph!.getSettings();
    settings.labelColor = { color: 'black' };
    const newGraph = new Sigma(graph!.getGraph(), root, settings);
    newGraph.getCamera().setState(graph!.getCamera().getState());
    newGraph.refresh();

    // make a new canvas element
    const canvas = document.createElement('canvas');
    canvas.setAttribute('width', width + '');
    canvas.setAttribute('height', height + '');
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    // set the basic settings of the canvas element
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, width, height);

    // draw all data on the new canvas
    const canvases = newGraph.getCanvases();
    const layers = ['edges', 'edgeLabels', 'nodes', 'labels', 'hovers', 'hoverNodes'];
    layers.forEach((item) => {
      ctx.drawImage(canvases[item], 0, 0, width, height);
    });

    const mainGraphContent = document.body.getElementsByClassName(
      'mainGraphContent',
    )[0] as HTMLElement;

    if (mainGraphContent) {
      mainGraphContent.classList.toggle('border');

      const mainCanvas = await toCanvas(mainGraphContent, {
        // ignore the sigma graph
        filter: (el) =>
          el.className !== 'container' &&
          el.className !== 'zoomBtnWrapper' &&
          el.className !== 'searchFunctionDiv',
      });

      mainGraphContent.classList.toggle('border');

      ctx.drawImage(mainCanvas, 0, 0, mainGraphContent.offsetWidth, mainGraphContent.offsetHeight);
    }

    newGraph.clear();
    newGraph.kill();
    return [canvas.toDataURL('image/jpg')];
  }
}
