import type { EdgeEntry, NodeEntry } from 'graphology-types';
import type { Exporter } from '~/types/exporter';
import type { Graph } from '~/types/graph';

const SVG_NS = 'http://www.w3.org/2000/svg';
const DEFAULT_WIDTH = 1920;
const DEFAULT_HEIGHT = 1080;
const DEFAULT_PADDING = 4;

export class ExportSVG implements Exporter {
  width: number = DEFAULT_WIDTH;
  height: number = DEFAULT_HEIGHT;
  padding: number = DEFAULT_PADDING;
  arrowSize: number = 1;
  nodeBorderRatio: number = 0.25;

  edgeStrings: string[] = [];
  nodeStrings: string[] = [];
  styleStrings: string[] = [
    '<style type="text/css">',
    '.node text { font-size: 1.5px; }',
    '</style>',
  ];

  constructor(options?: { width?: number; height?: number }) {
    this.width = options?.width || this.width;
    this.height = options?.height || this.height;
  }

  export(graph: Graph): Promise<string[]> {
    graph.graphologyGraph!.forEachEdge((edge, attr, src, tar, srcAttr, tarAttr, undirected) => {
      const edgeEntry: EdgeEntry = {
        edge,
        source: src,
        target: tar,
        attributes: attr,
        sourceAttributes: {
          ...srcAttr,
          y: srcAttr.y * -1,
        },
        targetAttributes: {
          ...tarAttr,
          y: tarAttr.y * -1,
        },
        undirected,
      };
      if (edgeEntry.attributes.type === 'curved') {
        this.edgeStrings.push(...this.curvedLine(edgeEntry));
      } else {
        this.edgeStrings.push(...this.line(edgeEntry));
      }
    });
    graph.graphologyGraph!.forEachNode((node, attr) => {
      const nodeEntry: NodeEntry = {
        node,
        attributes: {
          ...attr,
          y: attr.y * -1,
        },
      };
      if (nodeEntry.attributes.borderColorEval) {
        this.nodeStrings.push(...this.borderedCircle(nodeEntry));
      } else {
        this.nodeStrings.push(...this.circle(nodeEntry));
      }
    });
    const SVG: Array<string> = [];
    const SVGElem: SVGSVGElement = document.createElementNS(SVG_NS, 'svg');

    SVG.push(...this.styleStrings);
    SVG.push(...this.edgeStrings);
    SVG.push(...this.nodeStrings);
    SVGElem.innerHTML = SVG.join('');
    const hiddenDiv = document.createElement('div');
    hiddenDiv.style.position = 'absolute';
    hiddenDiv.style.left = '-9999px';
    hiddenDiv.style.visibility = 'hidden';
    document.body.appendChild(hiddenDiv);
    hiddenDiv.appendChild(SVGElem);
    const bbox = SVGElem.getBBox();

    // document.body.removeChild(hiddenDiv);
    SVGElem.setAttribute(
      'viewBox',
      `${bbox.x - this.padding} ${bbox.y - this.padding} ${bbox.width + this.padding} ${bbox.height + this.padding}`,
    );
    SVGElem.setAttribute('width', `${bbox.width * 4}`);
    SVGElem.setAttribute('height', `${bbox.height * 4}`);

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(SVGElem);

    return new Promise<string[]>((resolve) => {
      // Create a blob from the SVG string
      const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });

      // Generate a downloadable URL
      resolve([URL.createObjectURL(blob)]);
    });
  }

  // #region Helper functions
  private curvedLine(edge: EdgeEntry): Array<string> {
    const dx = edge.targetAttributes.x - edge.sourceAttributes.x;
    const dy = edge.targetAttributes.y - edge.sourceAttributes.y;
    const angle = Math.atan2(dy, dx);
    const arrowLength = this.arrowSize;
    const arrowAngle = Math.PI / 6; // 30 degrees for the arrowhead

    const targetRadius = edge.targetAttributes.size / 10;
    const sourceRadius = edge.sourceAttributes.size / 10;

    const targetX = edge.targetAttributes.x - targetRadius * Math.cos(angle);
    const targetY = edge.targetAttributes.y - targetRadius * Math.sin(angle);

    // Control point for the quadratic curve (midpoint offset for a basic curve)
    const controlX = (edge.sourceAttributes.x + edge.targetAttributes.x) / 2 + dy * 0.2; // Adjust 0.2 for curve sharpness
    const controlY = (edge.sourceAttributes.y + edge.targetAttributes.y) / 2 - dx * 0.2;

    // Arrowhead points
    const x1 = targetX - arrowLength * Math.cos(angle - arrowAngle);
    const y1 = targetY - arrowLength * Math.sin(angle - arrowAngle);
    const x2 = targetX - arrowLength * Math.cos(angle + arrowAngle);
    const y2 = targetY - arrowLength * Math.sin(angle + arrowAngle);

    return [
      `<g id="edge#${edge.source}#${edge.target}" class="edge">`,
      `<path d="
        M ${edge.sourceAttributes.x + sourceRadius * Math.cos(angle)} ${edge.sourceAttributes.y + sourceRadius * Math.sin(angle)} 
        Q ${controlX} ${controlY} ${targetX} ${targetY}"
        stroke="${edge.attributes.color}" stroke-width="${edge.attributes.sizeWeight * 0.1}" fill="none" />`,
      `<path d="
        M ${targetX} ${targetY} 
        L ${x1} ${y1}
        M ${targetX} ${targetY} 
        L ${x2} ${y2}"
        stroke="${edge.attributes.color}" stroke-width="${edge.attributes.sizeWeight * 0.1}" fill="none" />`,
      `</g>`,
    ];
  }

  private line(edge: EdgeEntry): Array<string> {
    const dx = edge.targetAttributes.x - edge.sourceAttributes.x;
    const dy = edge.targetAttributes.y - edge.sourceAttributes.y;
    const angle = Math.atan2(dy, dx);
    const arrowLength = this.arrowSize;
    const arrowAngle = Math.PI / 6; // 30 degrees for the arrowhead

    const targetRadius = edge.targetAttributes.size / 10;
    const sourceRadius = edge.sourceAttributes.size / 10;

    const targetX = edge.targetAttributes.x - targetRadius * Math.cos(angle);
    const targetY = edge.targetAttributes.y - targetRadius * Math.sin(angle);

    const x1 = targetX - arrowLength * Math.cos(angle - arrowAngle);
    const y1 = targetY - arrowLength * Math.sin(angle - arrowAngle);
    const x2 = targetX - arrowLength * Math.cos(angle + arrowAngle);
    const y2 = targetY - arrowLength * Math.sin(angle + arrowAngle);

    return [
      `<g id="edge#${edge.source}#${edge.target}" class="edge">`,
      `<path d="
      M ${edge.sourceAttributes.x + sourceRadius * Math.cos(angle)} ${edge.sourceAttributes.y + sourceRadius * Math.sin(angle)} 
      L ${targetX} ${targetY}"
      stroke="${edge.attributes.color}" stroke-width="${edge.attributes.sizeWeight * 0.1}" fill="none" />`,
      `<path d="
      M ${targetX} ${targetY} 
      L ${x1} ${y1}
      M ${targetX} ${targetY} 
      L ${x2} ${y2}"
      stroke="${edge.attributes.color}" stroke-width="${edge.attributes.sizeWeight * 0.1}" fill="none" />`,
      `</g>`,
    ];
  }

  private circle(node: NodeEntry): Array<string> {
    const nodeSize = node.attributes.size / 10;
    return [
      `<g id="node#${node.node}" class="node">`,
      `<circle cx="${node.attributes.x}" cy="${node.attributes.y}" r="${nodeSize}" fill="${node.attributes.colorEval}" />`,
      `<text x="${node.attributes.x + nodeSize + 0.5}" y="${node.attributes.y}" fill="black" text-anchor="left" alignment-baseline="middle">${node.attributes.label}</text>`,
      `</g>`,
    ];
  }

  private borderedCircle(node: NodeEntry): Array<string> {
    const nodeSize = node.attributes.size / 10;
    return [
      `<g id="node#${node.node}" class="node">`,
      `<circle cx="${node.attributes.x}" cy="${node.attributes.y}" r="${nodeSize}" fill="${node.attributes.borderColorEval}" />`,
      `<circle cx="${node.attributes.x}" cy="${node.attributes.y}" r="${nodeSize - nodeSize * this.nodeBorderRatio}" fill="${node.attributes.colorEval}" />`,
      `<text x="${node.attributes.x + nodeSize + 0.5}" y="${node.attributes.y}" fill="black" text-anchor="left" alignment-baseline="middle">${node.attributes.label}</text>`,
      `</g>`,
    ];
  }
  // #endregion
}
