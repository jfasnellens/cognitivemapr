/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

export const nodes = [
  {
    id: 10,
    nodeName: 'Ability to deal with problems',
    value: 1,
    degrees: {
      all: 1,
      in: 1,
      out: 0,
    },
    weightedDegrees: {
      all: 1,
      in: 1,
      out: 0,
    },
    go: 1,
    goW: 1,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 22,
    nodeName: 'austerity programme problemstates',
    value: 1,
    instr: {
      name: 'Stronger EU fiscal regulation',
    },
    int: 'Intergovernmental',
    paradigm: 'Ordoliberal',
    degrees: {
      all: 2,
      in: 0,
      out: 2,
    },
    weightedDegrees: {
      all: 2,
      in: 0,
      out: 2,
    },
    go: -1,
    goW: -1,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 2,
        },
      ],
    ],
  },
  {
    id: 39,
    nodeName: 'benefit of all',
    value: 1,
    degrees: {
      all: 23,
      in: 23,
      out: 0,
    },
    weightedDegrees: {
      all: 25,
      in: 25,
      out: 0,
    },
    go: 1,
    goW: 1,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 42,
    nodeName: 'Benefit of market parties',
    value: 1,
    degrees: {
      all: 1,
      in: 1,
      out: 0,
    },
    weightedDegrees: {
      all: 1,
      in: 1,
      out: 0,
    },
    go: 1,
    goW: 1,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 44,
    nodeName: 'Benefit of our state',
    value: 1,
    int: 'Intergovernmental',
    degrees: {
      all: 10,
      in: 10,
      out: 0,
    },
    weightedDegrees: {
      all: 10,
      in: 10,
      out: 0,
    },
    go: 1,
    goW: 1,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 47,
    nodeName: 'Benefit of the MS',
    value: 1,
    int: 'Intergovernmental',
    degrees: {
      all: 3,
      in: 3,
      out: 0,
    },
    weightedDegrees: {
      all: 3,
      in: 3,
      out: 0,
    },
    go: 1,
    goW: 1,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 55,
    nodeName: 'budgetary convergence',
    value: 1,
    degrees: {
      all: 2,
      in: 2,
      out: 0,
    },
    weightedDegrees: {
      all: 2,
      in: 2,
      out: 0,
    },
    go: 1,
    goW: 1,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 56,
    nodeName: 'Budgetary deficits',
    value: 1,
    paradigm: 'Keynesian',
    degrees: {
      all: 11,
      in: 8,
      out: 3,
    },
    weightedDegrees: {
      all: 11,
      in: 8,
      out: 3,
    },
    go: 0.45454545454545453,
    goW: 0.45454545454545453,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 11,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 78,
    nodeName: 'competitiveness',
    value: 1,
    degrees: {
      all: 6,
      in: 5,
      out: 1,
    },
    weightedDegrees: {
      all: 7,
      in: 6,
      out: 1,
    },
    go: 0.6666666666666666,
    goW: 0.7142857142857143,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 86,
    nodeName: 'constitutional debt-brake',
    value: 1,
    int: 'Intergovernmental',
    paradigm: 'Ordoliberal',
    degrees: {
      all: 4,
      in: 1,
      out: 3,
    },
    weightedDegrees: {
      all: 4,
      in: 1,
      out: 3,
    },
    go: -0.5,
    goW: -0.5,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 4,
        },
      ],
    ],
  },
  {
    id: 90,
    nodeName: 'convergence in competitiveness',
    value: 1,
    paradigm: 'Ordoliberal',
    degrees: {
      all: 3,
      in: 1,
      out: 2,
    },
    weightedDegrees: {
      all: 3,
      in: 1,
      out: 2,
    },
    go: -0.3333333333333333,
    goW: -0.3333333333333333,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 3,
        },
      ],
    ],
  },
  {
    id: 100,
    nodeName: 'credibility of emu',
    value: 1,
    int: 'Supranational',
    degrees: {
      all: 2,
      in: 2,
      out: 0,
    },
    weightedDegrees: {
      all: 2,
      in: 2,
      out: 0,
    },
    go: 1,
    goW: 1,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 101,
    nodeName: 'Credibility of SGP',
    value: 1,
    int: 'Intergovernmental',
    degrees: {
      all: 3,
      in: 1,
      out: 2,
    },
    weightedDegrees: {
      all: 3,
      in: 1,
      out: 2,
    },
    go: -0.3333333333333333,
    goW: -0.3333333333333333,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 107,
    nodeName: 'crisis',
    value: -1,
    degrees: {
      all: 1,
      in: 1,
      out: 0,
    },
    weightedDegrees: {
      all: 1,
      in: 1,
      out: 0,
    },
    go: 1,
    goW: 1,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 109,
    nodeName: 'Crisis in Spain and Italy',
    value: -1,
    degrees: {
      all: 2,
      in: 2,
      out: 0,
    },
    weightedDegrees: {
      all: 2,
      in: 2,
      out: 0,
    },
    go: 1,
    goW: 1,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 122,
    nodeName: 'decline in fiscal revenue',
    value: 1,
    degrees: {
      all: 5,
      in: 4,
      out: 1,
    },
    weightedDegrees: {
      all: 6,
      in: 5,
      out: 1,
    },
    go: 0.6,
    goW: 0.6666666666666666,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 138,
    nodeName: 'Different mentality',
    value: 1,
    degrees: {
      all: 1,
      in: 0,
      out: 1,
    },
    weightedDegrees: {
      all: 1,
      in: 0,
      out: 1,
    },
    go: -1,
    goW: -1,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 144,
    nodeName: 'Divergent interests',
    value: 1,
    int: 'Intergovernmental',
    degrees: {
      all: 3,
      in: 0,
      out: 3,
    },
    weightedDegrees: {
      all: 3,
      in: 0,
      out: 3,
    },
    go: -1,
    goW: -1,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 167,
    nodeName: 'economic convergence',
    value: 1,
    degrees: {
      all: 3,
      in: 1,
      out: 2,
    },
    weightedDegrees: {
      all: 3,
      in: 1,
      out: 2,
    },
    go: -0.3333333333333333,
    goW: -0.3333333333333333,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 168,
    nodeName: 'Economic depression',
    value: -1,
    degrees: {
      all: 4,
      in: 2,
      out: 2,
    },
    weightedDegrees: {
      all: 5,
      in: 3,
      out: 2,
    },
    go: 0,
    goW: 0.2,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 170,
    nodeName: 'economic growth',
    value: 1,
    paradigm: 'Keynesian',
    degrees: {
      all: 10,
      in: 5,
      out: 5,
    },
    weightedDegrees: {
      all: 10,
      in: 5,
      out: 5,
    },
    go: 0,
    goW: 0,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 10,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 172,
    nodeName: 'economic policy harmonisation',
    value: 1,
    int: 'Intergovernmental',
    degrees: {
      all: 1,
      in: 0,
      out: 1,
    },
    weightedDegrees: {
      all: 2,
      in: 0,
      out: 2,
    },
    go: -1,
    goW: -1,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 173,
    nodeName: 'economic recovery',
    value: 1,
    degrees: {
      all: 1,
      in: 1,
      out: 0,
    },
    weightedDegrees: {
      all: 1,
      in: 1,
      out: 0,
    },
    go: 1,
    goW: 1,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 175,
    nodeName: 'economic stimulation',
    value: 1,
    instr: {
      name: 'Economic Stimulation',
    },
    paradigm: 'Keynesian',
    degrees: {
      all: 1,
      in: 1,
      out: 0,
    },
    weightedDegrees: {
      all: 1,
      in: 1,
      out: 0,
    },
    go: 1,
    goW: 1,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 1,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 176,
    nodeName: 'Economic strong Europe',
    value: 1,
    degrees: {
      all: 3,
      in: 2,
      out: 1,
    },
    weightedDegrees: {
      all: 3,
      in: 2,
      out: 1,
    },
    go: 0.3333333333333333,
    goW: 0.3333333333333333,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 181,
    nodeName: 'Effectiveness',
    value: 1,
    degrees: {
      all: 4,
      in: 3,
      out: 1,
    },
    weightedDegrees: {
      all: 4,
      in: 3,
      out: 1,
    },
    go: 0.5,
    goW: 0.5,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 184,
    nodeName: 'EMF',
    value: 1,
    instr: {
      name: 'Fiscal Support',
    },
    int: 'Supranational',
    paradigm: 'Keynesian',
    degrees: {
      all: 3,
      in: 1,
      out: 2,
    },
    weightedDegrees: {
      all: 3,
      in: 1,
      out: 2,
    },
    go: -0.3333333333333333,
    goW: -0.3333333333333333,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 3,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 186,
    nodeName: 'Employment',
    value: 1,
    paradigm: 'Keynesian',
    degrees: {
      all: 5,
      in: 4,
      out: 1,
    },
    weightedDegrees: {
      all: 5,
      in: 4,
      out: 1,
    },
    go: 0.6,
    goW: 0.6,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 5,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 189,
    nodeName: 'EMU',
    value: 1,
    degrees: {
      all: 4,
      in: 0,
      out: 4,
    },
    weightedDegrees: {
      all: 4,
      in: 0,
      out: 4,
    },
    go: -1,
    goW: -1,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 190,
    nodeName: 'EMU split-off',
    value: 1,
    int: 'Intergovernmental',
    paradigm: 'Ordoliberal',
    degrees: {
      all: 1,
      in: 0,
      out: 1,
    },
    weightedDegrees: {
      all: 1,
      in: 0,
      out: 1,
    },
    go: -1,
    goW: -1,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 1,
        },
      ],
    ],
  },
  {
    id: 198,
    nodeName: 'Environmental protection',
    value: 1,
    degrees: {
      all: 1,
      in: 1,
      out: 0,
    },
    weightedDegrees: {
      all: 1,
      in: 1,
      out: 0,
    },
    go: 1,
    goW: 1,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 207,
    nodeName: 'Euro as international [reserve] currency',
    value: 1,
    int: 'Supranational',
    degrees: {
      all: 7,
      in: 1,
      out: 6,
    },
    weightedDegrees: {
      all: 7,
      in: 1,
      out: 6,
    },
    go: -0.7142857142857143,
    goW: -0.7142857142857143,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 209,
    nodeName: 'Euro-crisis',
    value: -1,
    degrees: {
      all: 8,
      in: 5,
      out: 3,
    },
    weightedDegrees: {
      all: 9,
      in: 6,
      out: 3,
    },
    go: 0.25,
    goW: 0.3333333333333333,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 211,
    nodeName: 'Europe as worldpower',
    value: 1,
    degrees: {
      all: 1,
      in: 1,
      out: 0,
    },
    weightedDegrees: {
      all: 1,
      in: 1,
      out: 0,
    },
    go: 1,
    goW: 1,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 215,
    nodeName: 'European budgetary coordination',
    value: 1,
    instr: {
      name: 'Stronger EU fiscal regulation',
    },
    int: 'Intergovernmental',
    degrees: {
      all: 1,
      in: 0,
      out: 1,
    },
    weightedDegrees: {
      all: 1,
      in: 0,
      out: 1,
    },
    go: -1,
    goW: -1,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 217,
    nodeName: 'European cohesion',
    value: 1,
    degrees: {
      all: 1,
      in: 0,
      out: 1,
    },
    weightedDegrees: {
      all: 1,
      in: 0,
      out: 1,
    },
    go: -1,
    goW: -1,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 227,
    nodeName: 'European economic cooperation',
    value: 1,
    int: 'Intergovernmental',
    degrees: {
      all: 1,
      in: 1,
      out: 0,
    },
    weightedDegrees: {
      all: 1,
      in: 1,
      out: 0,
    },
    go: 1,
    goW: 1,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 228,
    nodeName: 'European economic government [FR]',
    value: 1,
    instr: {
      name: 'E M U Reforms',
    },
    int: 'Intergovernmental',
    degrees: {
      all: 8,
      in: 3,
      out: 5,
    },
    weightedDegrees: {
      all: 8,
      in: 3,
      out: 5,
    },
    go: -0.25,
    goW: -0.25,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 229,
    nodeName: 'European economic integration',
    value: 1,
    degrees: {
      all: 4,
      in: 2,
      out: 2,
    },
    weightedDegrees: {
      all: 4,
      in: 2,
      out: 2,
    },
    go: 0,
    goW: 0,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 236,
    nodeName: 'European integration',
    value: 1,
    degrees: {
      all: 1,
      in: 1,
      out: 0,
    },
    weightedDegrees: {
      all: 1,
      in: 1,
      out: 0,
    },
    go: 1,
    goW: 1,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 247,
    nodeName: 'European security',
    value: 1,
    degrees: {
      all: 2,
      in: 1,
      out: 1,
    },
    weightedDegrees: {
      all: 2,
      in: 1,
      out: 1,
    },
    go: 0,
    goW: 0,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 257,
    nodeName: 'Euro-plus-pact',
    value: 1,
    instr: {
      name: 'Economic Stimulation',
    },
    int: 'Intergovernmental',
    paradigm: 'Keynesian',
    degrees: {
      all: 3,
      in: 0,
      out: 3,
    },
    weightedDegrees: {
      all: 3,
      in: 0,
      out: 3,
    },
    go: -1,
    goW: -1,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 3,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 264,
    nodeName: 'excessive debt',
    value: 1,
    paradigm: 'Keynesian',
    degrees: {
      all: 1,
      in: 0,
      out: 1,
    },
    weightedDegrees: {
      all: 1,
      in: 0,
      out: 1,
    },
    go: -1,
    goW: -1,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 1,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 276,
    nodeName: 'export-level',
    value: 1,
    paradigm: 'Keynesian',
    degrees: {
      all: 3,
      in: 3,
      out: 0,
    },
    weightedDegrees: {
      all: 4,
      in: 4,
      out: 0,
    },
    go: 1,
    goW: 1,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 4,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 282,
    nodeName: 'fast and efficient decisionmaking',
    value: 1,
    degrees: {
      all: 6,
      in: 5,
      out: 1,
    },
    weightedDegrees: {
      all: 6,
      in: 5,
      out: 1,
    },
    go: 0.6666666666666666,
    goW: 0.6666666666666666,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 284,
    nodeName: 'financial crisis [2008-]',
    value: -1,
    degrees: {
      all: 6,
      in: 0,
      out: 6,
    },
    weightedDegrees: {
      all: 8,
      in: 0,
      out: 8,
    },
    go: -1,
    goW: -1,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 295,
    nodeName: 'Fiscal convergence',
    value: 1,
    degrees: {
      all: 4,
      in: 1,
      out: 3,
    },
    weightedDegrees: {
      all: 4,
      in: 1,
      out: 3,
    },
    go: -0.5,
    goW: -0.5,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 296,
    nodeName: 'Fiscal discipline',
    value: 1,
    int: 'Intergovernmental',
    paradigm: 'Ordoliberal',
    degrees: {
      all: 5,
      in: 2,
      out: 3,
    },
    weightedDegrees: {
      all: 6,
      in: 2,
      out: 4,
    },
    go: -0.2,
    goW: -0.3333333333333333,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 6,
        },
      ],
    ],
  },
  {
    id: 297,
    nodeName: 'Fiscal expansionary policy',
    value: 1,
    instr: {
      name: 'Economic Stimulation',
    },
    int: 'Intergovernmental',
    paradigm: 'Keynesian',
    degrees: {
      all: 1,
      in: 0,
      out: 1,
    },
    weightedDegrees: {
      all: 1,
      in: 0,
      out: 1,
    },
    go: -1,
    goW: -1,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 1,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 300,
    nodeName: 'Fiscal support package',
    value: 1,
    instr: {
      name: 'Fiscal Support',
    },
    int: 'Intergovernmental',
    paradigm: 'Keynesian',
    degrees: {
      all: 5,
      in: 2,
      out: 3,
    },
    weightedDegrees: {
      all: 6,
      in: 2,
      out: 4,
    },
    go: -0.2,
    goW: -0.3333333333333333,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 6,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 318,
    nodeName: 'French German cooperation',
    value: 1,
    int: 'Intergovernmental',
    degrees: {
      all: 11,
      in: 0,
      out: 11,
    },
    weightedDegrees: {
      all: 12,
      in: 0,
      out: 12,
    },
    go: -1,
    goW: -1,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 324,
    nodeName: 'Generous social security system',
    value: 1,
    instr: {
      name: 'Structural Reforms',
    },
    paradigm: 'Keynesian',
    degrees: {
      all: 1,
      in: 0,
      out: 1,
    },
    weightedDegrees: {
      all: 1,
      in: 0,
      out: 1,
    },
    go: -1,
    goW: -1,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 1,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 329,
    nodeName: 'Government and ECB crisis measures',
    value: 1,
    degrees: {
      all: 5,
      in: 0,
      out: 5,
    },
    weightedDegrees: {
      all: 5,
      in: 0,
      out: 5,
    },
    go: -1,
    goW: -1,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 330,
    nodeName: 'Government expenditure',
    value: 1,
    instr: {
      name: 'Economic Stimulation',
    },
    int: 'Intergovernmental',
    paradigm: 'Keynesian',
    degrees: {
      all: 5,
      in: 2,
      out: 3,
    },
    weightedDegrees: {
      all: 5,
      in: 2,
      out: 3,
    },
    go: -0.2,
    goW: -0.2,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 5,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 331,
    nodeName: 'Government investment',
    value: 1,
    instr: {
      name: 'Economic Stimulation',
    },
    int: 'Intergovernmental',
    paradigm: 'Keynesian',
    degrees: {
      all: 15,
      in: 3,
      out: 12,
    },
    weightedDegrees: {
      all: 17,
      in: 3,
      out: 14,
    },
    go: -0.6,
    goW: -0.6470588235294118,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 17,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 332,
    nodeName: 'Greek fiscal crisis',
    value: -1,
    degrees: {
      all: 2,
      in: 0,
      out: 2,
    },
    weightedDegrees: {
      all: 2,
      in: 0,
      out: 2,
    },
    go: -1,
    goW: -1,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 340,
    nodeName: 'High exchange rate',
    value: 1,
    degrees: {
      all: 8,
      in: 0,
      out: 8,
    },
    weightedDegrees: {
      all: 10,
      in: 0,
      out: 10,
    },
    go: -1,
    goW: -1,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 341,
    nodeName: 'high public debt ratio',
    value: 1,
    paradigm: 'Keynesian',
    degrees: {
      all: 1,
      in: 1,
      out: 0,
    },
    weightedDegrees: {
      all: 1,
      in: 1,
      out: 0,
    },
    go: 1,
    goW: 1,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 1,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 359,
    nodeName: 'increase in sovereign bond yields',
    value: 1,
    degrees: {
      all: 1,
      in: 1,
      out: 0,
    },
    weightedDegrees: {
      all: 2,
      in: 2,
      out: 0,
    },
    go: 1,
    goW: 1,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 360,
    nodeName: 'Increase in tax revenues',
    value: 1,
    instr: {
      name: 'Structural Reforms',
    },
    degrees: {
      all: 5,
      in: 2,
      out: 3,
    },
    weightedDegrees: {
      all: 5,
      in: 2,
      out: 3,
    },
    go: -0.2,
    goW: -0.2,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 370,
    nodeName: 'innovation',
    value: 1,
    instr: {
      name: 'Structural Reforms',
    },
    degrees: {
      all: 2,
      in: 2,
      out: 0,
    },
    weightedDegrees: {
      all: 3,
      in: 3,
      out: 0,
    },
    go: 1,
    goW: 1,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 372,
    nodeName: 'Institutional reform of EMU',
    value: 1,
    instr: {
      name: 'E M U Reforms',
    },
    int: 'Supranational',
    degrees: {
      all: 1,
      in: 0,
      out: 1,
    },
    weightedDegrees: {
      all: 1,
      in: 0,
      out: 1,
    },
    go: -1,
    goW: -1,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 395,
    nodeName: 'longer term presidency EU',
    value: 1,
    instr: {
      name: 'E M U Reforms',
    },
    int: 'Supranational',
    degrees: {
      all: 2,
      in: 1,
      out: 1,
    },
    weightedDegrees: {
      all: 2,
      in: 1,
      out: 1,
    },
    go: 0,
    goW: 0,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 401,
    nodeName: 'Macroeconomic imbalances',
    value: 1,
    degrees: {
      all: 1,
      in: 0,
      out: 1,
    },
    weightedDegrees: {
      all: 1,
      in: 0,
      out: 1,
    },
    go: -1,
    goW: -1,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 416,
    nodeName: 'monetary dumping by US',
    value: 1,
    paradigm: 'Keynesian',
    degrees: {
      all: 1,
      in: 0,
      out: 1,
    },
    weightedDegrees: {
      all: 1,
      in: 0,
      out: 1,
    },
    go: -1,
    goW: -1,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 1,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 419,
    nodeName: 'monetary stability',
    value: 1,
    degrees: {
      all: 2,
      in: 1,
      out: 1,
    },
    weightedDegrees: {
      all: 2,
      in: 1,
      out: 1,
    },
    go: 0,
    goW: 0,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 426,
    nodeName: 'MS problems with refinancing debt',
    value: 1,
    int: 'Intergovernmental',
    degrees: {
      all: 2,
      in: 1,
      out: 1,
    },
    weightedDegrees: {
      all: 2,
      in: 1,
      out: 1,
    },
    go: 0,
    goW: 0,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 429,
    nodeName: 'Mutual European effort',
    value: 1,
    int: 'Intergovernmental',
    degrees: {
      all: 2,
      in: 0,
      out: 2,
    },
    weightedDegrees: {
      all: 2,
      in: 0,
      out: 2,
    },
    go: -1,
    goW: -1,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 435,
    nodeName: 'national independence',
    value: 1,
    int: 'Intergovernmental',
    degrees: {
      all: 3,
      in: 3,
      out: 0,
    },
    weightedDegrees: {
      all: 3,
      in: 3,
      out: 0,
    },
    go: 1,
    goW: 1,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 448,
    nodeName: 'Our national policies',
    value: 1,
    int: 'Intergovernmental',
    degrees: {
      all: 7,
      in: 0,
      out: 7,
    },
    weightedDegrees: {
      all: 7,
      in: 0,
      out: 7,
    },
    go: -1,
    goW: -1,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 455,
    nodeName: 'Peoples purchasing power',
    value: 1,
    paradigm: 'Keynesian',
    degrees: {
      all: 1,
      in: 1,
      out: 0,
    },
    weightedDegrees: {
      all: 1,
      in: 1,
      out: 0,
    },
    go: 1,
    goW: 1,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 1,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 457,
    nodeName: 'permanent credible crisismanagement mechanism',
    value: 1,
    instr: {
      name: 'Fiscal Support',
    },
    degrees: {
      all: 2,
      in: 1,
      out: 1,
    },
    weightedDegrees: {
      all: 2,
      in: 1,
      out: 1,
    },
    go: 0,
    goW: 0,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 460,
    nodeName: 'Political and economic strong Europe',
    value: 1,
    degrees: {
      all: 1,
      in: 1,
      out: 0,
    },
    weightedDegrees: {
      all: 1,
      in: 1,
      out: 0,
    },
    go: 1,
    goW: 1,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 477,
    nodeName: 'private investment and consumption',
    value: 1,
    degrees: {
      all: 2,
      in: 1,
      out: 1,
    },
    weightedDegrees: {
      all: 2,
      in: 1,
      out: 1,
    },
    go: 0,
    goW: 0,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 492,
    nodeName: 'Public debt',
    value: 1,
    paradigm: 'Keynesian',
    degrees: {
      all: 4,
      in: 3,
      out: 1,
    },
    weightedDegrees: {
      all: 4,
      in: 3,
      out: 1,
    },
    go: 0.5,
    goW: 0.5,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 4,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 493,
    nodeName: 'Public support',
    value: 1,
    degrees: {
      all: 3,
      in: 3,
      out: 0,
    },
    weightedDegrees: {
      all: 3,
      in: 3,
      out: 0,
    },
    go: 1,
    goW: 1,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 512,
    nodeName: 'reform of the international monetary system',
    value: 1,
    degrees: {
      all: 4,
      in: 0,
      out: 4,
    },
    weightedDegrees: {
      all: 4,
      in: 0,
      out: 4,
    },
    go: -1,
    goW: -1,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 520,
    nodeName: 'Repayment of debt',
    value: 1,
    paradigm: 'Ordoliberal',
    degrees: {
      all: 3,
      in: 2,
      out: 1,
    },
    weightedDegrees: {
      all: 3,
      in: 2,
      out: 1,
    },
    go: 0.3333333333333333,
    goW: 0.3333333333333333,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 3,
        },
      ],
    ],
  },
  {
    id: 530,
    nodeName: 'revealing of problems',
    value: 1,
    degrees: {
      all: 1,
      in: 1,
      out: 0,
    },
    weightedDegrees: {
      all: 1,
      in: 1,
      out: 0,
    },
    go: 1,
    goW: 1,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 543,
    nodeName: 'SGP',
    value: 1,
    degrees: {
      all: 4,
      in: 0,
      out: 4,
    },
    weightedDegrees: {
      all: 4,
      in: 0,
      out: 4,
    },
    go: -1,
    goW: -1,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 552,
    nodeName: 'single currency',
    value: 1,
    degrees: {
      all: 4,
      in: 0,
      out: 4,
    },
    weightedDegrees: {
      all: 5,
      in: 0,
      out: 5,
    },
    go: -1,
    goW: -1,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 566,
    nodeName: 'solidarity',
    value: 1,
    degrees: {
      all: 2,
      in: 1,
      out: 1,
    },
    weightedDegrees: {
      all: 2,
      in: 1,
      out: 1,
    },
    go: 0,
    goW: 0,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 567,
    nodeName: 'Solvency',
    value: 1,
    paradigm: 'Ordoliberal',
    degrees: {
      all: 1,
      in: 0,
      out: 1,
    },
    weightedDegrees: {
      all: 1,
      in: 0,
      out: 1,
    },
    go: -1,
    goW: -1,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 1,
        },
      ],
    ],
  },
  {
    id: 569,
    nodeName: 'solving the crisis',
    value: 1,
    degrees: {
      all: 6,
      in: 5,
      out: 1,
    },
    weightedDegrees: {
      all: 7,
      in: 6,
      out: 1,
    },
    go: 0.6666666666666666,
    goW: 0.7142857142857143,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 574,
    nodeName: 'Sound public finances',
    value: 1,
    int: 'Intergovernmental',
    paradigm: 'Ordoliberal',
    degrees: {
      all: 6,
      in: 1,
      out: 5,
    },
    weightedDegrees: {
      all: 7,
      in: 1,
      out: 6,
    },
    go: -0.6666666666666666,
    goW: -0.7142857142857143,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 7,
        },
      ],
    ],
  },
  {
    id: 577,
    nodeName: 'Sovereignty',
    value: 1,
    int: 'Intergovernmental',
    degrees: {
      all: 1,
      in: 0,
      out: 1,
    },
    weightedDegrees: {
      all: 1,
      in: 0,
      out: 1,
    },
    go: -1,
    goW: -1,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 578,
    nodeName: 'speculation',
    value: 1,
    degrees: {
      all: 6,
      in: 3,
      out: 3,
    },
    weightedDegrees: {
      all: 6,
      in: 3,
      out: 3,
    },
    go: 0,
    goW: 0,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 581,
    nodeName: 'Stability of Eurozone',
    value: 1,
    degrees: {
      all: 2,
      in: 2,
      out: 0,
    },
    weightedDegrees: {
      all: 2,
      in: 2,
      out: 0,
    },
    go: 1,
    goW: 1,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 582,
    nodeName: 'stability of financial system',
    value: 1,
    degrees: {
      all: 1,
      in: 1,
      out: 0,
    },
    weightedDegrees: {
      all: 1,
      in: 1,
      out: 0,
    },
    go: 1,
    goW: 1,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 583,
    nodeName: 'Stability of single currency',
    value: 1,
    int: 'Supranational',
    degrees: {
      all: 1,
      in: 1,
      out: 0,
    },
    weightedDegrees: {
      all: 1,
      in: 1,
      out: 0,
    },
    go: 1,
    goW: 1,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 586,
    nodeName: 'Stimulation of education and research',
    value: 1,
    instr: {
      name: 'Structural Reforms',
    },
    paradigm: 'Keynesian',
    degrees: {
      all: 1,
      in: 1,
      out: 0,
    },
    weightedDegrees: {
      all: 2,
      in: 2,
      out: 0,
    },
    go: 1,
    goW: 1,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 2,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 590,
    nodeName: 'Strength of our economy',
    value: 1,
    degrees: {
      all: 1,
      in: 1,
      out: 0,
    },
    weightedDegrees: {
      all: 1,
      in: 1,
      out: 0,
    },
    go: 1,
    goW: 1,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 593,
    nodeName: 'Strengthened SGP',
    value: 1,
    instr: {
      name: 'Stronger EU fiscal regulation',
    },
    int: 'Intergovernmental',
    paradigm: 'Ordoliberal',
    degrees: {
      all: 2,
      in: 0,
      out: 2,
    },
    weightedDegrees: {
      all: 2,
      in: 0,
      out: 2,
    },
    go: -1,
    goW: -1,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 2,
        },
      ],
    ],
  },
  {
    id: 599,
    nodeName: 'Strong industrial sector',
    value: 1,
    degrees: {
      all: 2,
      in: 2,
      out: 0,
    },
    weightedDegrees: {
      all: 2,
      in: 2,
      out: 0,
    },
    go: 1,
    goW: 1,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 601,
    nodeName: 'stronger economic governance of eurozone',
    value: 1,
    instr: {
      name: 'E M U Reforms',
    },
    int: 'Intergovernmental',
    degrees: {
      all: 6,
      in: 4,
      out: 2,
    },
    weightedDegrees: {
      all: 6,
      in: 4,
      out: 2,
    },
    go: 0.3333333333333333,
    goW: 0.3333333333333333,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 606,
    nodeName: 'Successful EMU',
    value: 1,
    int: 'Supranational',
    degrees: {
      all: 6,
      in: 6,
      out: 0,
    },
    weightedDegrees: {
      all: 7,
      in: 7,
      out: 0,
    },
    go: 1,
    goW: 1,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 614,
    nodeName: 'Survival of EMU',
    value: 1,
    int: 'Supranational',
    degrees: {
      all: 4,
      in: 0,
      out: 4,
    },
    weightedDegrees: {
      all: 4,
      in: 0,
      out: 4,
    },
    go: -1,
    goW: -1,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 615,
    nodeName: 'Survival of EU',
    value: 1,
    degrees: {
      all: 3,
      in: 2,
      out: 1,
    },
    weightedDegrees: {
      all: 3,
      in: 2,
      out: 1,
    },
    go: 0.3333333333333333,
    goW: 0.3333333333333333,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 617,
    nodeName: 'Sustainable social security system',
    value: 1,
    instr: {
      name: 'Structural Reforms',
    },
    int: 'Intergovernmental',
    degrees: {
      all: 1,
      in: 1,
      out: 0,
    },
    weightedDegrees: {
      all: 1,
      in: 1,
      out: 0,
    },
    go: 1,
    goW: 1,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 621,
    nodeName: 'taking your own responsibility',
    value: 1,
    degrees: {
      all: 1,
      in: 1,
      out: 0,
    },
    weightedDegrees: {
      all: 1,
      in: 1,
      out: 0,
    },
    go: 1,
    goW: 1,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 623,
    nodeName: 'Tax harmonization',
    value: 1,
    instr: {
      name: 'Structural Reforms',
    },
    int: 'Intergovernmental',
    degrees: {
      all: 3,
      in: 1,
      out: 2,
    },
    weightedDegrees: {
      all: 3,
      in: 1,
      out: 2,
    },
    go: -0.3333333333333333,
    goW: -0.3333333333333333,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 624,
    nodeName: 'Tax raise',
    value: 1,
    instr: {
      name: 'Structural Reforms',
    },
    int: 'Intergovernmental',
    degrees: {
      all: 8,
      in: 2,
      out: 6,
    },
    weightedDegrees: {
      all: 8,
      in: 2,
      out: 6,
    },
    go: -0.5,
    goW: -0.5,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 631,
    nodeName: 'Transparency',
    value: 1,
    degrees: {
      all: 1,
      in: 0,
      out: 1,
    },
    weightedDegrees: {
      all: 1,
      in: 0,
      out: 1,
    },
    go: -1,
    goW: -1,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
  {
    id: 645,
    nodeName: 'Welfare',
    value: 1,
    degrees: {
      all: 5,
      in: 5,
      out: 0,
    },
    weightedDegrees: {
      all: 5,
      in: 5,
      out: 0,
    },
    go: 1,
    goW: 1,
    paradigmValues: [
      [
        {
          name: 'Keynesian',
          value: 0,
        },
        {
          name: 'Ordoliberal',
          value: 0,
        },
      ],
    ],
  },
];
