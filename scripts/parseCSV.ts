/*
 *  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
 * It is distributed under the GPL 3.0 open source license.
 */

import * as papa from 'papaparse';
import type { Edge, Node } from '../types/graph';
import { generateId, isNumeric } from './utils';
import { ScriptError } from '~/types/errors';

const dayjs = useDayjs();
/**
 * Takes an browser File as input and parses it into an object
 * @param csvFile File to parse
 * @returns Object from parsed file
 */
export async function readCSVScript(csvFile: File): Promise<Array<Record<string, string>>> {
  return await new Promise<Array<Array<string>>>((resolve) => {
    papa.parse<Array<string>>(csvFile, {
      complete: (results) => {
        resolve(results.data);
      },
      skipEmptyLines: true,
      delimitersToGuess: [';', ',', '#'],
    });
  }).then((data: Array<Array<string>>) => {
    const parsedObj = _convertArrayToObject(data);
    return parsedObj;
  });
}

/**
 * Helper function to convert array of array of string into a workable JS object
 * @param arr array to convert
 * @returns Array of objects with params assigned based on header
 */
function _convertArrayToObject(arr: Array<Array<string>>): Array<Record<string, string>> {
  const headers = arr.shift();
  if (headers === undefined)
    throw new ScriptError({
      from: 'Data parser',
      subComponent: 'File reader',
      message: 'No header row found in file!',
    });
  const parsedCSVObj = arr
    .map((row) => {
      return _processRow(row, headers);
    })
    .filter((item) => item) as Array<Record<string, string>>;
  return parsedCSVObj;
}

/**
 * Helper function to process one row into an object
 * @param row Row to process
 * @param headers Headers to use
 * @returns Object based on row data and headers
 */
function _processRow(
  row: Array<string>,
  headers: Array<string>,
): Record<string, string> | undefined {
  const rowObj: Record<string, string> = {};
  row.forEach((item, index) => {
    rowObj[headers[index]] = item;
  });

  if (
    Object.entries(rowObj).every((entry) => {
      // If an ID (or empty row) is filled, it shouldn't withold the empty row detector
      if (entry[0] === '') return true;
      if (entry[0] === 'id') return true;
      // If the entry value is empty, true it to empty.
      if (entry[1] === '') return true;
      return false;
    })
  ) {
    return undefined;
  }
  return rowObj;
}

/**
 * Converts Array of objects into a node array.
 * @param parsedObj Array of objects from parse
 * @returns Array of nodes
 */
export function convertObjToNodeList(parsedObj: Array<Record<string, string>>): Array<Node> {
  return parsedObj.map((row, index) => _convertRowToNode(row, index));
}
/**
 * Helper function that converts one row into a node
 * @param row Row object to convert
 * @param index Row index
 * @returns Node
 */
function _convertRowToNode(row: Record<string, string>, index: number): Node {
  const instrument = () => {
    const instr = row.instr || row.instrument || row.instruments;
    if (instr && instr !== 'NA') return { name: instr };
    return undefined;
  };
  const int = () => {
    if (row.int && row.int !== 'NA') {
      return row.int;
    }
    return undefined;
  };

  const nodeName = () => {
    const name = row.node_name || row.name || row.nodename;
    if (!name)
      throw new ScriptError({
        from: 'Data parser',
        subComponent: 'Row to node converter',
        message: 'No node name found!',
      });
    return name;
  };
  const nodeValue = () => {
    const parsedValue = parseInt(row.value);
    if (row.value === '' || row.value === 'NA') {
      return 0;
    } else if (isNaN(parsedValue)) {
      throw new ScriptError({
        from: 'Data parser',
        subComponent: 'Row to node converter',
        message: `Invalid node value found! \nNode values must be numbers. \nRow Nr: ${index + 2}`,
      });
    } else if (parsedValue > 1 || parsedValue < -1) {
      throw new ScriptError({
        from: 'Data parser',
        subComponent: 'Row to node converter',
        message: `Invalid node value found! \nNode values may not be larger than 1 or smaller than -1. \nRow Nr: ${
          index + 2
        }`,
      });
    } else {
      return parseInt(row.value);
    }
  };

  const paradigm = () => {
    const val = row.eco || row.paradigms || row.paradigm;
    if (val && val.toLowerCase() !== 'n/a' && val.toLowerCase() !== 'na') {
      return val;
    }
    return undefined;
  };

  const node: Node = {
    id: generateId(row.id),
    nodeName: nodeName(),
    evaluation: { inputValue: nodeValue() },
    instr: instrument(),
    int: int(),
    paradigm: paradigm(),
    degrees: { all: 0, in: 0, out: 0 },
    weightedDegrees: { all: 0, in: 0, out: 0 },
  };
  return node;
}

/**
 * Converts Array of objects into a edge array.
 * @param parsedObj Array of objects from parse
 * @returns Array of edges
 */
export function convertObjToEdgeList(
  parsedObj: Array<Record<string, string>>,
): Array<Partial<Edge>> {
  return parsedObj.map((row, index) => _convertRowToEdge(row, index));
}

/**
 * Converts one row object into an edge
 * @param row Row object to convert
 * @param index Row index
 * @returns Edge
 */
function _convertRowToEdge(row: Record<string, string>, index: number): Partial<Edge> {
  const from = () => {
    if (!row.from)
      throw new ScriptError({
        from: 'Data parser',
        subComponent: 'Edge builder',
        message: `No start of edge found. Missing 'from' header \nRow Nr: ${
          index + 2
        }, \nFrom: Unknown, \nTo: ${row.to ?? 'Unknown'}`,
      });
    return row.from;
  };

  const to = () => {
    if (!row.to)
      throw new ScriptError({
        from: 'Data parser',
        subComponent: 'Edge builder',
        message: `No end of edge found. Missing 'to' header \nRow Nr: ${index + 2}, \nFrom: ${
          row.from ?? 'Unknown'
        }, \nTo: Unknown`,
      });
    return row.to;
  };

  const value = () => {
    const value = row.edge_value || row.edgeValue || row.value;

    if (value !== "-1" && value !== "0" && value !== "1")
      throw new ScriptError({
        from: 'Data parser',
        subComponent: 'Edge builder',
        message: `Edge value is not a valid number. Make sure it is -1, 0 or 1 \nRow Nr: ${
          index + 2
        }, \nFrom: ${row.from}, \nTo: ${row.to}`,
      });

    return parseInt(value);
  };

  const weight = () => {
    let value = row.weight;

    // If any character is not a digit, the match will return "null".
    // This also includes the separator of a float and the - sign of negative numbers.
    // The value "0" is also removed by limiting the first character to 1-9.
    if (!value.match("^[1-9]([0-9]*)$"))
      throw new ScriptError({
        from: 'Data parser',
        subComponent: 'Edge builder',
        message: `Edge weight is not a valid number. Make sure it is a positive integer. \nRow Nr: ${
          index + 2
        }, \nFrom: ${row.from}, \nTo: ${row.to}`,
      });

    return parseInt(value);
  };

  // This is commented out because we do no import of exported files.

  // const posWeight = () => {
  //   let value = row.positive_weight;
  //   if (!value) return undefined;

  //   // If any character is not a digit, the match will return "null".
  //   // This also includes the separator of a float and the - sign of negative numbers.
  //   // The value "0" is also removed by limiting the first character to 1-9.
  //   if (!value.match("^[1-9]([0-9]*)$"))
  //     throw new ScriptError({
  //       from: 'Data parser',
  //       subComponent: 'Edge builder',
  //       message: `Edge positive weight is not a valid number. Make sure it is a positive integer. \nRow Nr: ${
  //         index + 2
  //       }, \nFrom: ${row.from}, \nTo: ${row.to}`,
  //     });

  //   return parseInt(value);
  // };

  // const neutWeight = () => {
  //   let value = row.neutWeight;
  //   if (!value) return undefined;

  //   // If any character is not a digit, the match will return "null".
  //   // This also includes the separator of a float and the - sign of negative numbers.
  //   // The value "0" is also removed by limiting the first character to 1-9.
  //   if (!value.match("^[1-9]([0-9]*)$"))
  //     throw new ScriptError({
  //       from: 'Data parser',
  //       subComponent: 'Edge builder',
  //       message: `Edge neightral weight is not a valid number. Make sure it is a positive integer. \nRow Nr: ${
  //         index + 2
  //       }, \nFrom: ${row.from}, \nTo: ${row.to}`,
  //     });

  //   return parseInt(value);
  // };

  // const negWeight = () => {
  //   let value = row.negative_weight;
  //   if (!value) return undefined;

  //   // If any character is not a digit, the match will return "null".
  //   // This also includes the separator of a float and the - sign of negative numbers.
  //   // The value "0" is also removed by limiting the first character to 1-9.
  //   if (!value.match("^[1-9]([0-9]*)$"))
  //     throw new ScriptError({
  //       from: 'Data parser',
  //       subComponent: 'Edge builder',
  //       message: `Edge negative weight is not a valid number. Make sure it is a positive integer. \nRow Nr: ${
  //         index + 2
  //       }, \nFrom: ${row.from}, \nTo: ${row.to}`,
  //     });

  //   return parseInt(value);
  // };

  //   const summedWeight = () => {
  //   let value = row.weighted_value;
  //   if (!value) return undefined;
  //   // @TODO: verplaats alle errors naar utils en roep dan de bijbehorende functie hier weer aan. Blijven we consistent in benaming.

  //   // If any character is not a digit, the match will return "null".
  //   // This also includes the separator of a float and the - sign of negative numbers.
  //   // The value "0" is also removed by limiting the first character to 1-9.
  //   if (!value.match("^-?\d+$"))
  //     throw new ScriptError({
  //       from: 'Data parser',
  //       subComponent: 'Edge builder',
  //       message: `Weighted value is not a valid number. Make sure it is an integer. \nRow Nr: ${
  //         index + 2
  //       }, \nFrom: ${row.from}, \nTo: ${row.to}`,
  //     });

  //   return parseInt(value);
  // };

  const mapDate = () => {
    const mdate = row.map_date || row.mapdate || row.date;
    if (!mdate) return undefined;
    try {
      if (mdate.split('-')[0].length > 2) {
        return dayjs(row.map_date, 'YYYY-MM-DD').toISOString();
      } else {
        return dayjs(row.map_date, 'DD-MM-YYYY').toISOString();
      }
    } catch (error) {
      throw new ScriptError({
        from: 'Data parser',
        subComponent: 'Edge builder',
        message: 'Invalid date format, be sure to use YYYY-MM-DD or DD-MM-YYYY',
      });
    }
  };

  const edge: Partial<Edge> = {
    from: isNumeric(from()) ? parseInt(row.from) : undefined,
    to: isNumeric(to()) ? parseInt(row.to) : undefined,
    fromName: from(),
    toName: to(),
    edgeValue: value(),
    weight: weight(),
    id: generateId(row.edge_id),
    mapId: row.map_id,
    mapDate: mapDate(),
    speaker: row.speaker,
  };

  edge.posWeight = (edge.edgeValue === 1) ? edge.weight : 0;
  edge.neutWeight = (edge.edgeValue === 0) ? edge.weight : 0;
  edge.negWeight = (edge.edgeValue === -1) ? edge.weight : 0;
  edge.summedWeight = edge.posWeight! - edge.negWeight!; // Because nothing is aggregated yet.
  
  return edge;
}
