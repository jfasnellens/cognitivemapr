/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Selector from '../components/Dynamic/Selector.vue';

describe('Drag drop', () => {
  it.each(['.selector-wrapper', '.zone', '.file-input', '.btn-wrapper', '.file-selector'])(
    'created a %s',
    (element) => {
      const wrapper = mount(Selector);

      const selectorWrapper = wrapper.find(element);
      expect(selectorWrapper.exists()).toBeTruthy();
    },
  );

  it('created zone-text with correct text', () => {
    const wrapper = mount(Selector);

    const dropZoneText = wrapper.find('.zone-text');
    expect(dropZoneText.exists()).toBeTruthy();
    expect(dropZoneText.text()).toBe('in .csv format');
  });
});
