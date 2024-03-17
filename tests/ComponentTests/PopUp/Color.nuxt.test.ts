import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import Color from '../components/PopupComponents/Settings/Color.vue';

describe('Color', () => {
  it.each(['.colorWrapper', '.colorChoice', '.darkmode.choice'])('creates a %s', (element) => {
    const wrapper = mount(Color);

    const div = wrapper.find(element);
    expect(div.exists()).toBeTruthy();
  });

  it('darkmode checkbox exists', () => {
    const wrapper = mount(Color);
    const checkbox = wrapper.find('input[id="darkmode"]');

    expect(checkbox.exists()).toBeTruthy();
  });

  it('Darkmode upon true boolean', () => {
    const wrapper = mountSuspended(Color); // eslint-disable-line
    const globalStore = useGlobalStore();
    globalStore.toggleDarkMode(true, false);

    const color = getComputedStyle(document.documentElement).getPropertyValue('--txt-color');
    const colorDark = getComputedStyle(document.documentElement).getPropertyValue('--txt-color-d');
    expect(color).toBe(colorDark);
  });

  it("Light mode is active when the checkbox hasn't been clicked", () => {
    // The text colour is simply selected as an example; any colour would suffice
    const color = getComputedStyle(document.documentElement).getPropertyValue('--txt-color');
    const colorLight = getComputedStyle(document.documentElement).getPropertyValue('--txt-color-l');
    expect(color).toBe(colorLight);
  });

  it('Dark mode is active when the checkbox has been clicked once', async () => {
    const wrapper = mount(Color);
    const checkbox = wrapper.find('input[id="darkmode"]');

    await checkbox.trigger('click');

    const color = getComputedStyle(document.documentElement).getPropertyValue('--txt-color');
    const colorDark = getComputedStyle(document.documentElement).getPropertyValue('--txt-color-d');
    expect(color).toBe(colorDark);
  });

  it('Dark mode is succesfully reverted when the checkbox is clicked again', async () => {
    const wrapper = mount(Color);
    const checkbox = wrapper.find('input[id="darkmode"]');

    await checkbox.trigger('click');
    await checkbox.trigger('click');

    const color = getComputedStyle(document.documentElement).getPropertyValue('--txt-color');
    const colorLight = getComputedStyle(document.documentElement).getPropertyValue('--txt-color-l');
    expect(color).toBe(colorLight);
  });
});
