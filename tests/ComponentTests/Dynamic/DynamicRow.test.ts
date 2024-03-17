/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Row from '../components/Dynamic/Row.vue';

describe('Row', () => {
  it.each(['.rowWrapper', '.collectionName', '.collectionEdgeList', '.collectionNodeList'])(
    'creates a %s when given no props',
    (element) => {
      const wrapper = mount(Row);

      const div = wrapper.find(element);
      expect(div.exists()).toBeTruthy();
    },
  );

  it.each(['input', '.closeButton', '.close'])(
    'does not create a %s when given no props',
    (element) => {
      const wrapper = mount(Row);

      const div = wrapper.find(element);
      expect(div.exists()).toBeFalsy();
    },
  );

  it.each([
    { element: 'input', amount: 1 },
    { element: '.closeButton', amount: 2 },
    { element: '.close', amount: 2 },
  ])('creates $amount $element when given an edge file', ({ element, amount }) => {
    const mockEdgeFile = new File([], 'testfile.csv');
    const wrapper = mount(Row, {
      props: {
        edgeList: mockEdgeFile,
      },
    });

    const div = wrapper.findAll(element);
    expect(div.length).toBe(amount);
  });

  it.each([
    { element: 'input', amount: 1 },
    { element: '.closeButton', amount: 2 },
    { element: '.close', amount: 2 },
  ])('creates a %s when given a node file', ({ element, amount }) => {
    const mockNodeFile = new File([], 'testfile.csv');
    const wrapper = mount(Row, {
      props: {
        nodeList: mockNodeFile,
      },
    });

    const div = wrapper.findAll(element);
    expect(div.length).toBe(amount);
  });

  it.each([
    { element: '.closeButton', amount: 3 },
    { element: '.close', amount: 3 },
  ])(`creates $amount $element when given an edge and node file`, ({ element, amount }) => {
    const mockEdgeFile = new File([], 'testfile.csv');
    const mockNodeFile = new File([], 'testfile.csv');
    const wrapper = mount(Row, {
      props: {
        edgeList: mockEdgeFile,
        nodeList: mockNodeFile,
      },
    });

    const div = wrapper.findAll(element);
    expect(div.length).toBe(amount);
  });

  it('displays file names when given files', () => {
    const mockEdgeFile = new File([], 'edgefile.csv');
    const mockNodeFile = new File([], 'nodefile.csv');
    const wrapper = mount(Row, {
      props: {
        edgeList: mockEdgeFile,
        nodeList: mockNodeFile,
      },
    });

    const edgeName = wrapper.find('.edgeListName').text();
    const nodeName = wrapper.find('.nodeListName').text();

    expect(edgeName).toBe('edgefile.csv');
    expect(nodeName).toBe('nodefile.csv');
  });

  it('does not display any name when no files are given', () => {
    const wrapper = mount(Row);

    const edgeName = wrapper.find('.edgeListName').text();
    const nodeName = wrapper.find('.nodeListName').text();

    expect(edgeName).toBe('');
    expect(nodeName).toBe('');
  });
});
