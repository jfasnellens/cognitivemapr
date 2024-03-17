/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { setActivePinia, createPinia } from 'pinia';
import Export from '../components/PopupComponents/Export.vue';

describe('ExportPopUp', () => {
  const mockRoute = {
    params: {
      graphId: '1',
    },
  };
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it.each([
    '.export-wrapper',
    '.page-wrapper',
    '.popup-wrapper',
    '.header',
    '.text',
    '.line',
    '.graphName',
    '.bold',
    '.content',
    '.left',
    '.selectedScripts',
    '.right',
    '.DocType',
    '.footer',
    '.selectedScripts',
    '.cancel',
  ])('renders the %s element', (element) => {
    const exportComponent = mount(Export, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            stubActions: false,
            initialState: {
              // TODO: Missing Ref because of graph name issues.
              fileStore: { collections: [{ '1': '1', name: 'myTestGraph' }] },
              scriptStore: { graphs: ref([{ key: '1', value: {} }]) },
            },
          }),
        ],
        mocks: {
          $route: mockRoute,
        },
      },
    });
    const div = exportComponent.find(element);

    expect(div.exists()).toBeTruthy();
  });

  it('displays all options', () => {
    const exportComponent = mount(Export, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            stubActions: false,
            initialState: {
              // TODO: Missing Ref because of graph name issues.
              fileStore: { collections: [{ '1': '1', name: 'myTestGraph' }] },
              scriptStore: { graphs: ref([{ key: '1', value: {} }]) },
            },
          }),
        ],
        mocks: {
          $route: mockRoute,
        },
      },
    });
    const options = exportComponent.findAll('.script');

    expect(options.length).toBe(0);
  });
});
