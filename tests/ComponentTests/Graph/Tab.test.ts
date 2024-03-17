/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Tab from '../components/Graph/Tab.vue';

describe('Graph tab', () => {
  it.each(['.tabWrapper', '.name'])('creates a %s', (element) => {
    const wrapper = mount(Tab);

    const div = wrapper.find(element);
    expect(div.exists()).toBeTruthy();
  });

  // test to check if an active tab has the right class for the css

  it('active tab', () => {
    const wrapper = mount(Tab, {
      props: {
        selected: true,
        name: 'active tab',
      },
    });
    const tab = wrapper.find('.name');
    expect(tab.classes()).toContain('selected');
  });

  // test to check if a not active tab has the right class for the css

  it('not active tab', () => {
    const wrapper = mount(Tab, {
      props: {
        selected: false,
        name: 'not active tab',
      },
    });
    const tab = wrapper.find('.name');
    expect(tab.classes()).not.toContain('selected');
  });
});
