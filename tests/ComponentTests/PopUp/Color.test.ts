/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Color from '../components/PopupComponents/Settings/Color.vue';
// import { I } from 'vitest/dist/types-198fd1d9';

describe('Color', () => {
  it.each(['.colorWrapper', '.colorChoice', '.darkmode.choice', '.colorBlind.choice'])(
    'creates a %s',
    (element) => {
      const wrapper = mount(Color);

      const div = wrapper.find(element);
      expect(div.exists()).toBeTruthy();
    },
  );

  // test for default mode

  it('Light mode is active when the checkboxes have not been clicked', () => {
    // The text colour is simply selected as an example; any colour would suffice
    const globalStore = useGlobalStore();
    const color = getComputedStyle(document.documentElement).getPropertyValue('--txt-color');
    const colorLight = getComputedStyle(document.documentElement).getPropertyValue('--txt-color-l');
    expect(globalStore.darkMode).toBeFalsy();
    expect(globalStore.colorBlindMode).toBeFalsy();
    expect(color).toBe(colorLight);
  });

  // tests for the dark mode

  it('darkmode checkbox exists', () => {
    const wrapper = mount(Color);
    const checkbox = wrapper.find('input[id="darkmode"]');

    expect(checkbox.exists()).toBeTruthy();
  });

  it('Dark mode is active when the checkbox has been clicked once', async () => {
    const globalStore = useGlobalStore();
    const wrapper = mount(Color);
    const checkbox = wrapper.find('input[id="darkmode"]');

    await checkbox.trigger('click');

    const color = getComputedStyle(document.documentElement).getPropertyValue('--txt-color');
    const colorDark = getComputedStyle(document.documentElement).getPropertyValue('--txt-color-d');
    expect(globalStore.colorBlindMode).toBeFalsy();
    expect(color).toBe(colorDark);
  });

  it('Dark mode is succesfully reverted when the checkbox is clicked again', async () => {
    const globalStore = useGlobalStore();
    const wrapper = mount(Color);
    const checkbox = wrapper.find('input[id="darkmode"]');

    await checkbox.trigger('click');
    await checkbox.trigger('click');

    const color = getComputedStyle(document.documentElement).getPropertyValue('--txt-color');
    const colorLight = getComputedStyle(document.documentElement).getPropertyValue('--txt-color-l');
    expect(globalStore.darkMode).toBeFalsy();
    expect(globalStore.colorBlindMode).toBeFalsy();
    expect(color).toBe(colorLight);
  });

  // tests for the colorblind mode

  it('Colorblind mode checkbox exists', () => {
    const wrapper = mount(Color);
    const checkbox = wrapper.find('input[id="colorblindmode"]');

    expect(checkbox.exists()).toBeTruthy();
  });

  it('Colorblind mode is active when the checkbox has been clicked once', async () => {
    const globalStore = useGlobalStore();
    const wrapper = mount(Color);
    const checkbox = wrapper.find('input[id="colorblindmode"]');

    await checkbox.trigger('click');

    const color = getComputedStyle(document.documentElement).getPropertyValue('--txt-color');
    const colorBlind = getComputedStyle(document.documentElement).getPropertyValue('--txt-color-c');
    expect(globalStore.darkMode).toBeFalsy();
    expect(color).toBe(colorBlind);
  });

  it('Colorblind mode is succesfully reverted when the checkbox is clicked again', async () => {
    const globalStore = useGlobalStore();
    const wrapper = mount(Color);
    const checkbox = wrapper.find('input[id="colorblindmode"]');

    await checkbox.trigger('click');
    await checkbox.trigger('click');

    const color = getComputedStyle(document.documentElement).getPropertyValue('--txt-color');
    const colorLight = getComputedStyle(document.documentElement).getPropertyValue('--txt-color-l');
    expect(globalStore.darkMode).toBeFalsy();
    expect(globalStore.colorBlindMode).toBeFalsy();
    expect(color).toBe(colorLight);
  });
});
