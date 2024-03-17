/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

import { describe, it, test, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { setActivePinia, createPinia } from 'pinia';
import Upload from '../components/Dynamic/Upload.vue';

describe('DynamicMenu', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('creates headerrow with three divs', () => {
    const wrapper = mount(Upload);

    const headerRow = wrapper.find('.headerRow');
    const headerDivs = headerRow.findAll('div');

    expect(headerRow.exists()).toBeTruthy();

    expect(headerDivs.at(0)?.exists()).toBeTruthy();
    expect(headerDivs.at(0)?.text()).toBe('Graphs');
    expect(headerDivs.at(1)?.exists()).toBeTruthy();
    expect(headerDivs.at(1)?.text()).toBe('Edge files');
    expect(headerDivs.at(2)?.exists()).toBeTruthy();
    expect(headerDivs.at(2)?.text()).toBe('Node files');
  });

  it('creates a rowsWrapper div', () => {
    const wrapper = mount(Upload);

    const rowsWrapper = wrapper.find('.rowsWrapper');

    expect(rowsWrapper.exists()).toBeTruthy();
  });

  test('if adding files to the store displays the files', async () => {
    const wrapper = mount(Upload, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            stubActions: false,
          }),
        ],
      },
    });

    const mockNodeFile = new File([], 'nodeFile');
    wrapper.vm.addFiles([mockNodeFile], 'nodeList');

    await nextTick();

    const nodeCell = wrapper.find('.nodeListName');
    expect(nodeCell.exists()).toBeTruthy();
    expect(nodeCell.text()).toBe('nodeFile');
  });

  it('adds to existing row', async () => {
    const wrapper = mount(Upload, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            stubActions: false,
          }),
        ],
      },
    });

    const mockNodeFile = new File([], 'nodeFile');
    const mockEdgeFile = new File([], 'edgeFile');
    wrapper.vm.addFiles([mockNodeFile], 'nodeList');

    await nextTick();

    wrapper.vm.addFiles([mockEdgeFile], 'edgeList');

    await nextTick();

    const collectionRows = wrapper.findAll('.collectionRow');
    expect(collectionRows.length).toBe(1);
  });

  test('if close button renders and deletes file on click', async () => {
    const wrapper = mount(Upload, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            stubActions: false,
          }),
        ],
      },
    });

    const mockNodeFile = new File([], 'nodeFile');
    wrapper.vm.addFiles([mockNodeFile], 'nodeList');

    await nextTick();

    const closeBtn = wrapper.find('.close');
    expect(closeBtn.exists()).toBeTruthy();

    await closeBtn.trigger('click');

    const nodeCells = wrapper.find('.nodeListName');
    expect(nodeCells.exists()).toBeFalsy();
  });

  test('if close button deletes row when empty', async () => {
    const wrapper = mount(Upload, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            stubActions: false,
          }),
        ],
      },
    });

    const mockNodeFile = new File([], 'nodeFile');
    wrapper.vm.addFiles([mockNodeFile], 'nodeList');

    await nextTick();

    const closeBtn = wrapper.find('.btn-wrapper');
    await closeBtn.trigger('click');

    const collectionRows = wrapper.findAll('.collectionRow');
    expect(collectionRows.length).toBe(0);
  });

  it('creates an inputRow div with two Dragdrop components', () => {
    const wrapper = mount(Upload);

    const inputRow = wrapper.find('.inputRow');
    const selectorComponents = inputRow.findAll('.selector-wrapper');

    expect(inputRow.exists()).toBeTruthy();
    expect(selectorComponents.at(0)?.exists()).toBeTruthy();
    expect(selectorComponents.at(1)?.exists()).toBeTruthy();
  });
});
