/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

import type Sigma from 'sigma';
export type UUID = `${string}-${string}-${string}-${string}-${string}`;
export type ISODateString = string;

export interface Evaluation {
  [index: string]: number | undefined;
  inputValue: number; // Value that was already present in the uploaded CSV
  pickedValue?: number; // Value that is used for user input in determining the value of nodes in cycles
  value?: number; // The value from the evaluate concepts script
}

export interface NamedValue {
  [index: string]: string | number;
  name: string;
  value: number;
}
export interface ParadigmSupport {
  [index: string]: NamedValue;
  paradigmA: NamedValue;
  paradigmB: NamedValue;
}
export interface Degrees {
  [index: string]: number;
  all: number;
  in: number;
  out: number;
}

export interface Node {
  [index: string]:
    | string
    | ISODateString
    | number
    | Date
    | UUID
    | ParadigmSupport
    | NamedValue
    | Partial<NamedValue>
    | Degrees
    | Evaluation
    | undefined;

  id: number | UUID;
  nodeName: string;
  evaluation: Evaluation;
  paradigm?: string;
  paradigmSupport?: ParadigmSupport;
  instr?: Partial<NamedValue>;
  int?: string;
  degrees: Degrees;
  weightedDegrees: Degrees;
  go?: number;
  goW?: number;
}

/**
 * Edge in the graph
 */
export interface Edge {
  [index: string]: string | ISODateString | number | Date | UUID | undefined;
  /** ID the Edge is connected from */
  from: number | UUID;
  /** ID the Edge is going to */
  to: number | UUID;
  /** Node name the edge is connected from */
  fromName?: string;
  /** Node name the edge is going to */
  toName?: string;

  weight: number;
  edgeValue: number;

  /** Either an premade ID from the edge list or an generated UUID */
  id: number | UUID;
  mapId?: string;
  mapDate?: ISODateString;
  speaker?: string;

  /** @deprecated support for old format; Value now comes from the from Node */
  valueX: number;
  /** @deprecated support for old format; Value now comes from the to Node  */
  valueY: number;
}

export enum EntryType {
  Paradigm,
  Instrument,
  Arrow,
}

export type LegendEntry = {
  text: string;
  color: string;
  type: EntryType;
};

export interface GraphSettings {
  legend: { [key: string]: LegendEntry };
  show: {
    positiveEdges: boolean;
    negativeEdges: boolean;
    neutralEdges: boolean;
  };
  highlight: {
    paradigmA: boolean;
    paradigmB: boolean;
    paradigmNone: boolean;
  };
}

export interface Graph {
  nodes: Record<string, Node>;
  edges: Record<number | UUID, Edge>;
  nodeArray: Array<Node>;
  edgeArray: Array<Edge>;
  name?: string;
  id?: UUID; // UUID
  paradigmPair?: [string, string];
  settings: GraphSettings;
  legend?: { canvas: HTMLCanvasElement; x: number; y: number; width: number; height: number };
  sigmaGraph?: Sigma;
}

export interface RelevantKeys {
  key: string;
  subKeys?: RelevantKeys[];
}
