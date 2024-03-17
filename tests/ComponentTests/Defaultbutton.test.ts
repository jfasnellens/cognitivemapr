/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Defaultbutton from '../components/Defaultbutton.vue';

describe('Default button', () => {
  test.each(['default', 'disabled', 'help', 'next'])(
    'if the %s class renders correctly',
    (type) => {
      const wrapper = mount(Defaultbutton, {
        props: {
          btnType: type,
        },
      });

      const btnWrapper = wrapper.find('.btn-wrapper');
      const button = wrapper.find('button');
      const span = wrapper.find('span');

      expect(btnWrapper.exists()).toBeTruthy();
      expect(button.exists()).toBeTruthy();
      expect(span.exists()).toBeTruthy();
    },
  );

  test('if the close class renders correctly', () => {
    const wrapper = mount(Defaultbutton, {
      props: {
        btnType: 'close',
      },
    });

    const btnWrapper = wrapper.find('.btn-wrapper');
    const button = wrapper.find('button');
    const span = wrapper.find('span');
    const icon = wrapper.findAll('svg').find((icon) => icon.element.id === 'closeIcon');

    expect(btnWrapper.exists()).toBeTruthy();
    expect(button.exists()).toBeTruthy();
    expect(span.exists()).toBeTruthy();
    expect(icon?.exists()).toBeTruthy();
  });

  test('if the settings class renders correctly', () => {
    const wrapper = mount(Defaultbutton, {
      props: {
        btnType: 'settings',
      },
    });

    const btnWrapper = wrapper.find('.btn-wrapper');
    const button = wrapper.find('button');
    const span = wrapper.find('span');
    const icon = wrapper.findAll('svg').find((icon) => icon.element.id === 'settingsIcon');

    expect(btnWrapper.exists()).toBeTruthy();
    expect(button.exists()).toBeTruthy();
    expect(span.exists()).toBeTruthy();
    expect(icon?.exists()).toBeTruthy();
  });
});
