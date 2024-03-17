/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import index from '../pages/index.vue';

describe('Index page', () => {
  it.each(['.page-wrapper', '.midContent', '.introTekst', '.info', '.nextButton'])(
    'renders a %s element',
    (element) => {
      const wrapper = mount(index);

      const div = wrapper.find(element);
      expect(div.exists()).toBeTruthy();
    },
  );

  it('renders a title with correct text', () => {
    const wrapper = mount(index);

    const title = wrapper.find('.title');
    expect(title.exists()).toBeTruthy();
    expect(title.text()).toBe('Welcome!');
  });

  it('renders three "p" elements with correct text', () => {
    const wrapper = mount(index);

    const p = wrapper.findAll('p');
    expect(p.length).toBe(3);
    expect(p.at(0)?.text()).toBe(
      'CognitiveMapr is here to assist you in creating and comparing cognitive maps',
    );
    expect(p.at(1)?.text()).toBe('Simply upload a node list and edge list in .csv format');
    expect(p.at(2)?.text()).toBe(
      'and CognitiveMapr will create visualisations and perform data analysis for you',
    );
  });

  it('renders a .text div with correct text', () => {
    const wrapper = mount(index);

    const text = wrapper.find('.text');
    expect(text.exists()).toBeTruthy();
    expect(text.text()).toBe('Get started now!');
  });

  it('renders a button that routes to the upload page', async () => {
    const mockRouter = { push: vi.fn() };
    const wrapper = mount(index, {
      global: {
        mocks: {
          router: mockRouter,
        },
      },
    });

    const button = wrapper.find('.btn-wrapper');
    await button.trigger('click');

    expect(mockRouter.push).toHaveBeenCalledTimes(1);
    expect(mockRouter.push).toHaveBeenCalledWith('/upload');
  });
});
