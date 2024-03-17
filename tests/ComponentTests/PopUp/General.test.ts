/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import General from '../components/PopupComponents/Settings/General.vue';
describe('Settings popup - General', () => {
  const wrapper = mount(General, {
    props: {
      title: 'TestTitle',
      text: 'TestText',
    },
  });

  it.each(['.generalWrapper', '.title', '.text', 'h2', 'p'])('Contains %s', (elem) => {
    expect(wrapper.find(elem).exists()).toBe(true);
  });

  it('Displays according to props', () => {
    expect(wrapper.find('h2').text()).toBe('TestTitle');
    expect(wrapper.find('p').text()).toBe('TestText');
  });
});
