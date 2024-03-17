/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

import type { Graph } from '~/types/graph';

export interface Exporter {
  export(graph: Graph): Promise<string[]>; // Converts the graph and returns a download URL for the file
}

export interface OptionType {
  value: string;
  name: string;
}

export interface UrlString {
  url: string;
  type: string;
}
