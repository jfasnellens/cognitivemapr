/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ColorPicker from '../components/Graph/ColorPicker.vue';

describe('ColorPicker', () => {
  it('picker is rendered with correct header text', () => {
    const wrapper = mount(ColorPicker, {});
    expect(wrapper.text()).toBe('Select Color');
  });

  it('picker has right amount of colors', () => {
    const wrapper = mount(ColorPicker, {});
    const colors = wrapper.findAll('.color');
    expect(colors.length).toBe(11);
  });

  it.each([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])(
    'colorpicker emits expected event when clicked',
    (index) => {
      const wrapper = mount(ColorPicker, {});
      const colors = wrapper.findAll('.color');
      colors[index].trigger('click');
      expect(wrapper.emitted()).toHaveProperty('colorSelected');
      expect(wrapper.emitted('colorSelected')).toHaveLength(1);
    },
  );

  it.each([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])(
    'colorpicker emits color as string when clicked',
    (index) => {
      const wrapper = mount(ColorPicker, {});
      const colors = wrapper.findAll('.color');
      colors[index].trigger('click');
      const emittedColor = wrapper.emitted('colorSelected')![0][0];
      expect(emittedColor).toBeTypeOf('string');
      expect(emittedColor[0]).toBe('#');
      expect(emittedColor.length).toBe(7);
    },
  );
});
