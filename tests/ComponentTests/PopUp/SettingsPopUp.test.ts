/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

import { describe, it, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SettingsPopUp from '../components/PopupComponents/Settings/SettingsPopUp.vue';

describe('SettingsPopUp', () => {
  it.each(['.settingPopupWrapper', '.content', '.left', '.right', '.close', 'button'])(
    'renders the %s element',
    (element) => {
      const wrapper = mount(SettingsPopUp);

      const div = wrapper.find(element);

      expect(div.exists()).toBeTruthy();
    },
  );

  it('displays all options', () => {
    const wrapper = mount(SettingsPopUp);

    const options = wrapper.findAll('.options');

    expect(options.length).toBe(1);
    expect(options.at(0)?.text()).toBe('Color');
  });

  it.each([{ component: '.colorWrapper', option: 0 }])(
    'renders $component when option number $option is clicked',
    async ({ component, option }) => {
      const wrapper = mount(SettingsPopUp);

      const options = wrapper.findAll('.options');

      await options.at(option)?.find('.option').trigger('click');

      const correctComp = wrapper.find(component);
      expect(correctComp.exists()).toBeTruthy();
    },
  );

  it('displays only Color component when no option is clicked', () => {
    const wrapper = mount(SettingsPopUp);

    const colorComp = wrapper.find('.colorWrapper');

    expect(colorComp.exists()).toBeTruthy();
  });

  test('if the close button emits correctly', async () => {
    const wrapper = mount(SettingsPopUp);

    const button = wrapper.find('button');
    await button.trigger('click');

    expect(wrapper.emitted()).toHaveProperty('closePopup');
  });
});
