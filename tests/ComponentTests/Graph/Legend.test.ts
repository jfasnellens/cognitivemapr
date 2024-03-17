/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import Legend from '../components/Graph/Legend.vue';
import { EntryType } from '~/types/graph';

describe('Legend', () => {
  const mockRoute = {
    params: {
      graphId: '1',
    },
  };

  it.each([
    '#legendWrapper',
    '#header',
    '.legend',
    '.entry',
    '.paradigmEntry',
    '.circle',
    '.edgeEntry',
    '.arrow',
    '.colorPickerWrapper',
  ])('renders the %s element when Paradigm Support is enabled', (element) => {
    const wrapper = mount(Legend, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            stubActions: false,
            initialState: {
              globalStore: {
                scriptSettings: { paradigmSupport: { name: 'Paradigm Support', enabled: true } },
              },
              scriptStore: {
                graphs: {
                  '1': {
                    paradigmPair: ['Paradigm A', 'Paradigm B'],
                    settings: {
                      legend: {
                        noParadigm: {
                          text: 'No paradigm',
                          color: '#8b8b8b',
                          type: EntryType.Paradigm,
                        },
                        positiveEdge: {
                          text: 'Positive effect',
                          color: '#FC6666',
                          type: EntryType.Arrow,
                        },
                      },
                    },
                  },
                },
              },
            },
          }),
        ],
        mocks: {
          $route: mockRoute,
        },
      },
    });
    const div = wrapper.find(element);
    expect(div.exists()).toBeTruthy();
  });

  it.each(['.circle', '.paradigmEntry'])(
    "doesn't render the %s element when Paradigm Support is disabled",
    (element) => {
      const wrapper = mount(Legend, {
        global: {
          plugins: [
            createTestingPinia({
              createSpy: vi.fn,
              stubActions: false,
              initialState: {
                globalStore: {
                  scriptSettings: { paradigmSupport: { name: 'Paradigm Support', enabled: false } },
                },
                scriptStore: {
                  graphs: {
                    '1': {
                      paradigmPair: ['Paradigm A', 'Paradigm B'],
                      settings: {
                        legend: {
                          noParadigm: {
                            text: 'No paradigm',
                            color: '#8b8b8b',
                            type: EntryType.Paradigm,
                          },
                          positiveEdge: {
                            text: 'Positive effect',
                            color: '#FC6666',
                            type: EntryType.Arrow,
                          },
                        },
                      },
                    },
                  },
                },
              },
            }),
          ],
          mocks: {
            $route: mockRoute,
          },
        },
      });
      const div = wrapper.find(element);
      expect(div.exists()).toBeFalsy();
    },
  );

  it('header is rendered with correct texts', () => {
    const wrapper = mount(Legend, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            stubActions: false,
            initialState: {
              globalStore: {
                scriptSettings: { paradigmSupport: { name: 'Paradigm Support', enabled: true } },
              },
              scriptStore: {
                graphs: {
                  '1': {
                    paradigmPair: ['Paradigm A', 'Paradigm B'],
                    settings: {
                      legend: {
                        noParadigm: {
                          text: 'No paradigm',
                          color: '#8b8b8b',
                          type: EntryType.Paradigm,
                        },
                        positiveEdge: {
                          text: 'Positive effect',
                          color: '#FC6666',
                          type: EntryType.Arrow,
                        },
                      },
                    },
                  },
                },
              },
            },
          }),
        ],
        mocks: {
          $route: mockRoute,
        },
      },
    });
    const header = wrapper.find('#header');
    expect(header.exists()).toBeTruthy();
    expect(header.text()).toBe('Legend');
  });

  it('right number of entries with correct texts when Paradigm Support is enabled', () => {
    const wrapper = mount(Legend, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            stubActions: false,
            initialState: {
              globalStore: {
                scriptSettings: { paradigmSupport: { name: 'Paradigm Support', enabled: true } },
              },
              scriptStore: {
                graphs: {
                  '1': {
                    paradigmPair: ['Paradigm A', 'Paradigm B'],
                    settings: {
                      legend: {
                        paradigmA: {
                          text: 'Paradigm A',
                          color: '#FFC94A',
                          type: EntryType.Paradigm,
                        },
                        paradigmB: {
                          text: 'Paradigm B',
                          color: '#64A5FA',
                          type: EntryType.Paradigm,
                        },
                        noParadigm: {
                          text: 'No paradigm',
                          color: '#8b8b8b',
                          type: EntryType.Paradigm,
                        },
                        positiveEdge: {
                          text: 'Positive effect',
                          color: '#FC6666',
                          type: EntryType.Arrow,
                        },
                        negativeEdge: {
                          text: 'Negative effect',
                          color: '#25EB36',
                          type: EntryType.Arrow,
                        },
                        neutralEdge: {
                          text: 'Neutral effect',
                          color: '#8b8b8b',
                          type: EntryType.Arrow,
                        },
                      },
                    },
                  },
                },
              },
            },
          }),
        ],
        mocks: {
          $route: mockRoute,
        },
      },
    });
    const entries = wrapper.findAll('.entry');
    expect(entries).toHaveLength(6);
    expect(entries.at(0)?.text()).toBe('Paradigm A');
    expect(entries.at(1)?.text()).toBe('Paradigm B');
    expect(entries.at(2)?.text()).toBe('No paradigm');
    expect(entries.at(3)?.text()).toBe('Positive effect');
    expect(entries.at(4)?.text()).toBe('Negative effect');
    expect(entries.at(5)?.text()).toBe('Neutral effect');
  });

  it('right number of entries with correct texts when Paradigm Support is disabled', () => {
    const wrapper = mount(Legend, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            stubActions: false,
            initialState: {
              globalStore: {
                scriptSettings: { paradigmSupport: { name: 'Paradigm Support', enabled: false } },
              },
              scriptStore: {
                graphs: {
                  '1': {
                    paradigmPair: ['Paradigm A', 'Paradigm B'],
                    settings: {
                      legend: {
                        paradigmA: {
                          text: 'Paradigm A',
                          color: '#FFC94A',
                          type: EntryType.Paradigm,
                        },
                        paradigmB: {
                          text: 'Paradigm B',
                          color: '#64A5FA',
                          type: EntryType.Paradigm,
                        },
                        noParadigm: {
                          text: 'No paradigm',
                          color: '#8b8b8b',
                          type: EntryType.Paradigm,
                        },
                        positiveEdge: {
                          text: 'Positive effect',
                          color: '#FC6666',
                          type: EntryType.Arrow,
                        },
                        negativeEdge: {
                          text: 'Negative effect',
                          color: '#25EB36',
                          type: EntryType.Arrow,
                        },
                        neutralEdge: {
                          text: 'Neutral effect',
                          color: '#8b8b8b',
                          type: EntryType.Arrow,
                        },
                      },
                    },
                  },
                },
              },
            },
          }),
        ],
        mocks: {
          $route: mockRoute,
        },
      },
    });
    const entries = wrapper.findAll('.entry');
    expect(entries).toHaveLength(6);
    expect(entries.at(3)?.text()).toBe('Positive effect');
    expect(entries.at(4)?.text()).toBe('Negative effect');
    expect(entries.at(5)?.text()).toBe('Neutral effect');
  });

  it('opens the color picker if clicked', async () => {
    const wrapper = mount(Legend, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            stubActions: false,
            initialState: {
              globalStore: {
                scriptSettings: { paradigmSupport: { name: 'Paradigm Support', enabled: true } },
              },
              scriptStore: {
                graphs: {
                  '1': {
                    paradigmPair: ['Paradigm A', 'Paradigm B'],
                    settings: {
                      legend: {
                        paradigmA: {
                          text: 'Paradigm A',
                          color: '#FFC94A',
                          type: EntryType.Paradigm,
                        },
                        paradigmB: {
                          text: 'Paradigm B',
                          color: '#64A5FA',
                          type: EntryType.Paradigm,
                        },
                        noParadigm: {
                          text: 'No paradigm',
                          color: '#8b8b8b',
                          type: EntryType.Paradigm,
                        },
                        positiveEdge: {
                          text: 'Positive effect',
                          color: '#FC6666',
                          type: EntryType.Arrow,
                        },
                        negativeEdge: {
                          text: 'Negative effect',
                          color: '#25EB36',
                          type: EntryType.Arrow,
                        },
                        neutralEdge: {
                          text: 'Neutral effect',
                          color: '#8b8b8b',
                          type: EntryType.Arrow,
                        },
                      },
                    },
                  },
                },
              },
            },
          }),
        ],
        mocks: {
          $route: mockRoute,
        },
      },
    });

    const circle = wrapper.find('.circle');
    await circle.trigger('click');
    const colorPicker = wrapper.find('.colorPickerWrapper');
    expect(colorPicker.exists()).toBe(true);
  });

  it('Hides edges based on clicked edge', async () => {
    const wrapper = mount(Legend, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            stubActions: false,
            initialState: {
              globalStore: {
                scriptSettings: { paradigmSupport: { name: 'Paradigm Support', enabled: true } },
              },
              scriptStore: {
                graphs: {
                  '1': {
                    paradigmPair: ['Paradigm A', 'Paradigm B'],
                    settings: {
                      legend: {
                        paradigmA: {
                          text: 'Paradigm A',
                          color: '#FFC94A',
                          type: EntryType.Paradigm,
                        },
                        paradigmB: {
                          text: 'Paradigm B',
                          color: '#64A5FA',
                          type: EntryType.Paradigm,
                        },
                        noParadigm: {
                          text: 'No paradigm',
                          color: '#8b8b8b',
                          type: EntryType.Paradigm,
                        },
                        positiveEdge: {
                          text: 'Positive effect',
                          color: '#FC6666',
                          type: EntryType.Arrow,
                        },
                        negativeEdge: {
                          text: 'Negative effect',
                          color: '#25EB36',
                          type: EntryType.Arrow,
                        },
                        neutralEdge: {
                          text: 'Neutral effect',
                          color: '#8b8b8b',
                          type: EntryType.Arrow,
                        },
                      },
                      show: {
                        positiveEdges: true,
                        negativeEdges: true,
                        neutralEdges: true,
                      },
                      highlight: {
                        paradigmA: false,
                        paradigmB: false,
                        paradigmNone: false,
                      },
                    },
                  },
                },
              },
            },
          }),
        ],
        mocks: {
          $route: mockRoute,
        },
      },
    });

    const entryTexts = wrapper
      .findAll('.entryText')
      .filter((elem) => elem.text().includes('effect'));
    expect(entryTexts.length, 'Incorrect amount of edge types found!').toBe(3);

    await entryTexts[0].trigger('click');
    await nextTick();
    expect(entryTexts[0].classes()).toContain('active');
    expect(entryTexts[1].classes()).not.toContain('active');
    expect(entryTexts[2].classes()).not.toContain('active');

    await entryTexts[1].trigger('click');
    await nextTick();
    expect(entryTexts[0].classes()).not.toContain('active');
    expect(entryTexts[1].classes()).toContain('active');
    expect(entryTexts[2].classes()).not.toContain('active');

    await entryTexts[2].trigger('click');
    await nextTick();
    expect(entryTexts[0].classes()).not.toContain('active');
    expect(entryTexts[1].classes()).not.toContain('active');
    expect(entryTexts[2].classes()).toContain('active');

    await entryTexts[2].trigger('click');
    await nextTick();
    expect(entryTexts[0].classes()).not.toContain('active');
    expect(entryTexts[1].classes()).not.toContain('active');
    expect(entryTexts[2].classes()).not.toContain('active');
  });

  it('Highlights clicked paradigm', async () => {
    const wrapper = mount(Legend, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            stubActions: false,
            initialState: {
              globalStore: {
                scriptSettings: { paradigmSupport: { name: 'Paradigm Support', enabled: true } },
              },
              scriptStore: {
                graphs: {
                  '1': {
                    paradigmPair: ['Paradigm A', 'Paradigm B'],
                    settings: {
                      legend: {
                        paradigmA: {
                          text: 'Paradigm A',
                          color: '#FFC94A',
                          type: EntryType.Paradigm,
                        },
                        paradigmB: {
                          text: 'Paradigm B',
                          color: '#64A5FA',
                          type: EntryType.Paradigm,
                        },
                        noParadigm: {
                          text: 'No paradigm',
                          color: '#8b8b8b',
                          type: EntryType.Paradigm,
                        },
                        positiveEdge: {
                          text: 'Positive effect',
                          color: '#FC6666',
                          type: EntryType.Arrow,
                        },
                        negativeEdge: {
                          text: 'Negative effect',
                          color: '#25EB36',
                          type: EntryType.Arrow,
                        },
                        neutralEdge: {
                          text: 'Neutral effect',
                          color: '#8b8b8b',
                          type: EntryType.Arrow,
                        },
                      },
                      show: {
                        positiveEdges: true,
                        negativeEdges: true,
                        neutralEdges: true,
                      },
                      highlight: {
                        paradigmA: false,
                        paradigmB: false,
                        paradigmNone: false,
                      },
                    },
                  },
                },
              },
            },
          }),
        ],
        mocks: {
          $route: mockRoute,
        },
      },
    });

    const entryTexts = wrapper
      .findAll('.entryText')
      .filter((elem) => elem.text().toLowerCase().includes('paradigm'));
    expect(entryTexts.length, 'Incorrect amount of pardigms types found!').toBe(3);

    await entryTexts[0].trigger('click');
    await nextTick();
    expect(entryTexts[0].classes()).toContain('active');

    await entryTexts[1].trigger('click');
    await nextTick();
    expect(entryTexts[1].classes()).toContain('active');

    await entryTexts[2].trigger('click');
    await nextTick();
    expect(entryTexts[2].classes()).toContain('active');

    await entryTexts[2].trigger('click');
    await nextTick();
    expect(entryTexts[2].classes()).not.toContain('active');
  });
});
