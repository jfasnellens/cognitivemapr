/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ScrollBar from '../components/ScrollBar.vue';

describe('ScrollBar', () => {
  it.each(['.positionWrapper', '.scrollWrapper'])(
    'renders %s when no content is given',
    (element) => {
      const wrapper = mount(ScrollBar);

      const div = wrapper.find(element);

      expect(div.exists()).toBeTruthy();
    },
  );
});
