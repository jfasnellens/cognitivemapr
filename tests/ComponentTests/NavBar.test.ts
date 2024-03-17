/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

import { describe, it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { mount } from '@vue/test-utils';
import Navbar from '../components/Navbar.vue';
import Defaultbutton from '../components/Defaultbutton.vue';

describe('Nav Bar', () => {
  it('created header', () => {
    const wrapper = mount(Navbar);
    const header = wrapper.find('h1');
    const h1Text = header.text();

    expect(header.exists()).toBeTruthy();
    expect(h1Text).toBe('CognitiveMapr');
  });

  it('created page name', () => {
    const wrapper = mount(Navbar);
    const header = wrapper.findAll('h1')[1];
    const pageText = header.text();

    expect(header.exists()).toBeTruthy();
    expect(pageText).toBe('Home Page');
  });

  it('created page name - different page', async () => {
    const wrapper = await mountSuspended(Navbar, { route: '/upload' });
    const header = wrapper.findAll('h1')[1];
    const pageText = header.text();

    expect(header.exists()).toBeTruthy();
    expect(pageText).toBe('Upload Page');
  });

  it('created HelpButton', () => {
    const wrapper = mount(Navbar);
    // finds all buttons, then finds button with correct prop
    const buttons = wrapper.findAllComponents<typeof Defaultbutton>('.btn-wrapper');

    const helpButton = buttons.find((btn) => btn.props().btnType === 'help');
    expect(helpButton?.exists()).toBeTruthy();
  });

  it('created SettingsButton', () => {
    const wrapper = mount(Navbar);
    // finds all buttons, then finds button with correct prop
    const buttons = wrapper.findAllComponents<typeof Defaultbutton>('.btn-wrapper');
    const settingsButton = buttons.find((btn) => btn.props().btnType === 'settings');
    expect(settingsButton?.exists()).toBeTruthy();
  });

  it('if HelpButton emits correctly', async () => {
    const wrapper = mount(Navbar);
    // finds all buttons, then finds button with correct prop
    const buttons = wrapper.findAllComponents<typeof Defaultbutton>('.btn-wrapper');
    const helpButton = buttons.find((btn) => btn.props().btnType === 'help');
    await helpButton?.trigger('click');
    const popUp = wrapper.find('.helpPopupWrapper');
    expect(popUp?.exists()).toBeTruthy();
  });

  it('if SettingsButton emits correctly', async () => {
    const wrapper = mount(Navbar);
    // finds all buttons, then finds button with correct prop
    const buttons = wrapper.findAllComponents<typeof Defaultbutton>('.btn-wrapper');
    const settingsButton = buttons.find((btn) => btn.props().btnType === 'settings');
    await settingsButton?.trigger('click');
    const popUp = wrapper.find('.settingPopupWrapper');
    expect(popUp?.exists()).toBeTruthy();
  });

  it('Clicking help does not trigger setup', async () => {
    const wrapper = mount(Navbar);
    // finds all buttons, then finds button with correct prop
    const buttons = wrapper.findAllComponents<typeof Defaultbutton>('.btn-wrapper');
    const helpButton = buttons.find((btn) => btn.props().btnType === 'help');
    await helpButton?.trigger('click');
    expect(wrapper.emitted()).not.toHaveProperty('settingsPopup');
  });

  it('Clicking settings does not trigger setup', async () => {
    const wrapper = mount(Navbar);
    // finds all buttons, then finds button with correct prop
    const buttons = wrapper.findAllComponents<typeof Defaultbutton>('.btn-wrapper');
    const settingsButton = buttons.find((btn) => btn.props().btnType === 'settings');
    await settingsButton?.trigger('click');
    expect(wrapper.emitted()).not.toHaveProperty('helpPopup');
  });
});
