/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

import { describe, it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import Attributes from '../components/Graph/Attributes.vue';

describe('Graph attribute', async () => {
  const wrapper = await mountSuspended(Attributes, {
    props: {
      position: [0, 0],
      values: {
        nodeName: 'Geoff',
        paradigm: 'Testing',
        paradigmSupport: {
          paradigmA: {
            value: 2,
            name: 'Testing',
          },
          paradigmB: {
            value: 0,
            name: 'nope',
          },
        },
        evaluation: {
          value: 6,
        },
        degrees: {
          in: 2,
          out: 1,
          all: 3,
        },
        weightedDegrees: {
          in: 2,
          out: 1,
          all: 3,
        },
        instr: {
          name: 'Jeff',
          value: 2,
        },
      },
    },
  });

  it.each([
    '.attributeDisplayDiv',
    '.nodeName',
    '.nodeInstrument',
    '.nodeParadigm',
    '.nodeParadigmSupport',
    '.nodeValue',
    '.nodeDegrees',
    '.nodeWDegrees',
  ])('contains %s', (elem) => {
    expect(wrapper.find(elem).exists()).toBe(true);
  });
  it('Shows the correct node name', () => {
    const paradigmWrapper = wrapper.find('.nodeName');
    expect(paradigmWrapper.text()).toBe('Name: "Geoff"');
  });
  it('Shows the correct node instrument', () => {
    const paradigmWrapper = wrapper.find('.nodeInstrument');
    expect(paradigmWrapper.text()).toBe('Instrument: "Jeff" (2)');
  });
  it('Shows the correct paradigm', () => {
    const paradigmWrapper = wrapper.find('.nodeParadigm');
    expect(paradigmWrapper.text()).toBe('Paradigm: "Testing"');
  });
  it('Shows the correct paradigm support', () => {
    const paradigmWrapper = wrapper.find('.nodeParadigmSupport');
    expect(paradigmWrapper.text()).toBe('Support: "Testing" (2)');
  });
  it('Shows the correct node value', () => {
    const paradigmWrapper = wrapper.find('.nodeValue');
    expect(paradigmWrapper.text()).toBe('Node value: 6');
  });
  it('Shows the correct node degrees', () => {
    const paradigmWrapper = wrapper.find('.nodeDegrees');
    expect(paradigmWrapper.text()).toBe('Degrees: In 2, Out 1');
  });
  it('Shows the correct node degrees', () => {
    const paradigmWrapper = wrapper.find('.nodeWDegrees');
    expect(paradigmWrapper.text()).toBe('Weighted Degrees: In 2, Out 1');
  });
});
