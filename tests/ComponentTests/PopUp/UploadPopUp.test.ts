/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

import { describe, it, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import UploadPopUp from '../components/PopupComponents/UploadPopUp.vue';

describe('UploadPopUp', () => {
  it.each([
    '.UploadPopUpWrapper',
    '.content',
    '.topText',
    '.title',
    '.subTitle',
    '.errors',
    '.subText',
    '.buttons',
  ])('creates a %s element', (element) => {
    const wrapper = mount(UploadPopUp, {
      props: {
        noName: 0,
        noEdge: [],
        noNode: [],
      },
    });

    const div = wrapper.find(element);

    expect(div.exists()).toBeTruthy();
  });

  it('render the name error correctly', () => {
    const wrapper = mount(UploadPopUp, {
      props: {
        noName: 3,
        noEdge: [],
        noNode: [],
      },
    });

    const errorWrapper = wrapper.find('.noName');
    expect(errorWrapper.exists()).toBeTruthy();
    expect(errorWrapper.text()).toBe('3 graph(s) are missing a name');
  });

  it('renders edge errors correctly', () => {
    const wrapper = mount(UploadPopUp, {
      props: {
        noName: 0,
        noEdge: ['testGraph_1', 'testGraph_2'],
        noNode: [],
      },
    });

    const errorWrapper = wrapper.find('.noEdge');
    const noEdgeErrors = wrapper.findAll('li');
    expect(errorWrapper.exists()).toBeTruthy();
    expect(noEdgeErrors.length).toBe(2);
    expect(noEdgeErrors.at(0)?.text()).toBe('testGraph_1');
    expect(noEdgeErrors.at(1)?.text()).toBe('testGraph_2');
  });

  it('renders node errors correctly', () => {
    const wrapper = mount(UploadPopUp, {
      props: {
        noName: 0,
        noEdge: [],
        noNode: ['testGraph_1', 'testGraph_2'],
      },
    });

    const errorWrapper = wrapper.find('.noNode');
    const noNodeErrors = wrapper.findAll('li');
    expect(errorWrapper.exists()).toBeTruthy();
    expect(noNodeErrors.length).toBe(2);
    expect(noNodeErrors.at(0)?.text()).toBe('testGraph_1');
    expect(noNodeErrors.at(1)?.text()).toBe('testGraph_2');
  });

  test('if the close button renders and emits correctly', async () => {
    const wrapper = mount(UploadPopUp, {
      props: {
        noName: 0,
        noEdge: [],
        noNode: [],
      },
    });

    const dfButtons = wrapper.findAllComponents('.btn-wrapper');
    expect(dfButtons.at(0)?.exists()).toBeTruthy();

    await dfButtons.at(0)?.trigger('click');
    expect(wrapper.emitted()).toHaveProperty('closeModal');
  });

  test('if the ignore button renders and emits correctly', async () => {
    const wrapper = mount(UploadPopUp, {
      props: {
        noName: 0,
        noEdge: [],
        noNode: [],
      },
    });

    const dfButtons = wrapper.findAllComponents('.btn-wrapper');
    expect(dfButtons.at(1)?.exists()).toBeTruthy();

    await dfButtons.at(1)?.trigger('click');
    expect(wrapper.emitted()).toHaveProperty('ignoreWarnings');
  });

  test('if the ignore button renders on blocking warning', () => {
    const wrapper = mount(UploadPopUp, {
      props: {
        noName: 1,
        noEdge: [],
        noNode: [],
      },
    });

    const dfButtons = wrapper.findAllComponents('.btn-wrapper');
    expect(dfButtons.at(1)?.exists()).toBeTruthy();
  });
});
