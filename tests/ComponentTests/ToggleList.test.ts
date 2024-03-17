/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ToggleList from '../components/ToggleList.vue';

describe('Generic ToggleList', () => {
  const wrapper = mount(ToggleList, {
    props: {
      headerText: 'test header text',
      toggleOptions: {
        option1: { name: 'option 1', enabled: true },
        option2: { name: 'option 2', enabled: true },
        option3: { name: 'option 3', enabled: false },
      },
    },
  });
  const header = wrapper.find('.header');
  it('Header has correct text', () => {
    const headerText = header.text();
    expect(header.exists()).toBeTruthy();
    expect(headerText).toBe('test header text');
  });
  it('Correct amount of options', () => {
    const toggles = wrapper.findAll('.toggle');
    expect(toggles).toHaveLength(3);
  });
  it('Correct amount of switches', () => {
    const switches = wrapper.findAll('.switch');
    expect(switches).toHaveLength(3);
  });

  it('Correct scriptSettings ToggleList', () => {
    const wrapper = mount(ToggleList, {
      props: {
        toggleOptions: useGlobalStore().scriptSettings,
      },
    });
    const toggles = wrapper.findAll('.toggle');
    const switches = wrapper.findAll('.switch');
    expect(toggles).toHaveLength(3);
    expect(switches).toHaveLength(3);
    expect(toggles.at(0)?.text()).toBe('Paradigm Support');
    expect(toggles.at(1)?.text()).toBe('Instrument Support');
    expect(toggles.at(2)?.text()).toBe('Evaluate Concepts');
  });

  it('Correct pathSettings ToggleList', () => {
    const wrapper = mount(ToggleList, {
      props: {
        toggleOptions: useGlobalStore().pathSettings,
      },
    });
    const toggles = wrapper.findAll('.toggle');
    const switches = wrapper.findAll('.switch');
    expect(toggles).toHaveLength(2);
    expect(switches).toHaveLength(2);
    expect(toggles.at(0)?.text()).toBe('Show Children of Clicked Node');
    expect(toggles.at(1)?.text()).toBe('Show Ancestors of Clicked Node');
  });

  it('Correct visualSettings ToggleList', () => {
    const wrapper = mount(ToggleList, {
      props: {
        toggleOptions: useGlobalStore().visualSettings,
      },
    });
    const toggles = wrapper.findAll('.toggle');
    const switches = wrapper.findAll('.switch');
    expect(toggles).toHaveLength(6);
    expect(switches).toHaveLength(6);
    expect(toggles.at(0)?.text()).toBe('Show Legend');
    expect(toggles.at(1)?.text()).toBe('Show Edge Weights');
    expect(toggles.at(2)?.text()).toBe('Scale Edges by Weight');
    expect(toggles.at(3)?.text()).toBe('Scale Nodes by Degrees');
    expect(toggles.at(4)?.text()).toBe('Show Node Attributes on Hover');
    expect(toggles.at(5)?.text()).toBe('Show Weighted Degree Value in Nodes');
  });

  it('toggles the scriptSettings', async () => {
    const wrapper = mount(ToggleList, {
      props: {
        toggleOptions: useGlobalStore().scriptSettings,
      },
    });

    const toggles = wrapper.findAll('.toggle');

    await toggles.at(0)?.trigger('click');
    await toggles.at(1)?.trigger('click');
    await toggles.at(2)?.trigger('click');

    expect(useGlobalStore().scriptSettings.paradigmSupport.enabled).toBeTruthy();
    expect(useGlobalStore().scriptSettings.evaluateConcepts.enabled).toBeTruthy();
    expect(useGlobalStore().scriptSettings.instrumentSupport.enabled).toBeFalsy();
  });

  it('toggles the visualSettings', async () => {
    const wrapper = mount(ToggleList, {
      props: {
        toggleOptions: useGlobalStore().visualSettings,
      },
    });

    const toggles = wrapper.findAll('.toggle');

    await toggles.at(0)?.trigger('click');
    await toggles.at(1)?.trigger('click');
    await toggles.at(2)?.trigger('click');
    await toggles.at(3)?.trigger('click');

    expect(useGlobalStore().visualSettings.showLegend.enabled).toBeTruthy();
    expect(useGlobalStore().visualSettings.scaleNodesByDegrees.enabled).toBeFalsy(); // starts as true
    expect(useGlobalStore().visualSettings.scaleEdgesByWeight.enabled).toBeTruthy();
  });

  it('toggles the pathSettings', async () => {
    const wrapper = mount(ToggleList, {
      props: {
        toggleOptions: useGlobalStore().pathSettings,
      },
    });

    const toggles = wrapper.findAll('.toggle');

    await toggles.at(0)?.trigger('click');
    await toggles.at(1)?.trigger('click');

    expect(useGlobalStore().pathSettings.showAncestorsOnClick.enabled).toBeTruthy();
    expect(useGlobalStore().pathSettings.showChildrenOnClick.enabled).toBeFalsy(); // starts as true
  });
});
