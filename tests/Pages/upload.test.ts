/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import upload from '../pages/upload.vue';
import { useFileStore } from '@/stores/fileStore';

describe('Upload page', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it.each([
    '.wrapper',
    '.mainContent',
    '.uploadWrapper',
    '.belowTableButtons',
    '.previousButton',
    '.nextButton',
  ])('renders a %s element', (element) => {
    const wrapper = mount(upload);

    const div = wrapper.find(element);
    expect(div.exists()).toBeTruthy();
  });

  it('will route to the index page when the previous button is clicked', async () => {
    const mockRouter = { push: vi.fn() };
    const wrapper = mount(upload, {
      global: {
        mocks: {
          router: mockRouter,
        },
      },
    });

    const button = wrapper.find('.previousButton');
    await button.trigger('click');

    expect(mockRouter.push).toHaveBeenCalledTimes(1);
    expect(mockRouter.push).toHaveBeenCalledWith('/');
  });

  it('will not route to any page when the disabled button is clicked', async () => {
    const mockRouter = { push: vi.fn() };
    const wrapper = mount(upload, {
      global: {
        mocks: {
          router: mockRouter,
        },
      },
    });

    const button = wrapper.find('.nextButton');
    await button.trigger('click');

    expect(mockRouter.push).toHaveBeenCalledTimes(0);
  });

  it.each([
    { name: '', edgeList: new File([], 'e'), nodeList: new File([], 'n') },
    { name: 'name', nodeList: new File([], 'n') },
    { name: 'name', edgeList: new File([], 'e') },
  ])('will show a warning popup when a collection is missing any input', async (collection) => {
    const fileStore = useFileStore();
    const { addCollection } = fileStore;

    addCollection(collection);

    const mockRouter = { push: vi.fn() };
    const wrapper = mount(upload, {
      global: {
        mocks: {
          router: mockRouter,
        },
      },
    });

    const button = wrapper.find('.nextButton');
    await button.trigger('click');

    expect(mockRouter.push).toHaveBeenCalledTimes(0);

    const popUp = wrapper.find('.UploadPopUpWrapper');
    expect(popUp.exists()).toBeTruthy();
  });
});
