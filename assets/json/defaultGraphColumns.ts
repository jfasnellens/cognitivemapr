/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

export const dfltNodeKeys = [
  { key: 'id' },
  { key: 'nodeName' },
  { key: 'evaluation', subKeys: [{ key: 'inputValue' }, { key: 'pickedValue' }, { key: 'value' }] },
  { key: 'paradigm' },
  {
    key: 'paradigmSupport',
    subKeys: [
      { key: 'paradigmA', subKeys: [{ key: 'name' }, { key: 'value' }] },
      { key: 'paradigmB', subKeys: [{ key: 'name' }, { key: 'value' }] },
    ],
  },
  { key: 'instr', subKeys: [{ key: 'name' }, { key: 'value' }] },
  { key: 'int' },
  { key: 'degrees', subKeys: [{ key: 'all' }, { key: 'in' }, { key: 'out' }] },
  { key: 'weightedDegrees', subKeys: [{ key: 'all' }, { key: 'in' }, { key: 'out' }] },
  { key: 'go' },
  { key: 'goW' },
];

export const dfltEdgeKeys = [
  { key: 'from' },
  { key: 'to' },
  { key: 'fromName' },
  { key: 'toName' },
  { key: 'id' },
  { key: 'weight' },
  { key: 'edgeValue' },
  { key: 'mapId' },
  { key: 'mapData' },
  { key: 'speaker' },
];

export const dfltNodeAliases = {
  id: 'id',
  nodeName: 'node name',
  evaluation: 'evaluation',
  inputValue: 'input Value',
  pickedValue: 'picked Value',
  value: 'value',
  paradigm: 'paradigm',
  paradigmSupport: 'paradigm Support',
  paradigmA: 'paradigm A',
  paradigmB: 'paradigm B',
  instr: 'instrument',
  name: 'name',
  int: 'int',
  degrees: 'degrees',
  weightedDegrees: 'weighted Degrees',
  all: 'all',
  in: 'in',
  out: 'out',
  go: 'go',
  goW: 'goW',
};

export const dfltEdgeAliases = {
  from: 'from',
  to: 'to',
  fromName: 'from Name',
  toName: 'to Name',
  id: 'id',
  edgeValue: 'edge Value',
  weight: 'weight',
  mapId: 'map Id',
  mapData: 'map Data',
  speaker: 'speaker',
};
