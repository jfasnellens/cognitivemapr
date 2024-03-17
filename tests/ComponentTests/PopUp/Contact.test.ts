/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Contact from '../components/PopupComponents/Help/Contact.vue';

describe('Contact', () => {
  it('renders the wrapper, title and paragraph text', () => {
    const wrapper = mount(Contact);

    const contactWrapper = wrapper.find('.contactWrapper');
    const title = wrapper.find('.title');
    const paragraph = wrapper.find('.text');

    expect(contactWrapper.exists()).toBeTruthy();
    expect(title.exists()).toBeTruthy();
    expect(paragraph.exists()).toBeTruthy();
  });
});
