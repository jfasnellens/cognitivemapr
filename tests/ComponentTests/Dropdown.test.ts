/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import DropDown from '../components/DropDown.vue';
import type { OptionType } from '~/types/exporter';

const visualOptions: OptionType[] = [
    { value: 'graph', name: 'Graph' },
    { value: 'edgeTable', name: 'Edge Table' },
    { value: 'nodeTable', name: 'Node Table' },
];

describe("dropdown", () => {
    const wrapper = mount(DropDown, {
        props: {
            optionsList: visualOptions
        },
    });

    it.each(['.dropdown-wrapper', "select"])('%s exists',(element) => {
        const div = wrapper.find(element);
        expect(div.exists()).toBeTruthy();
    });

    it('all option types exists', () => {
        const selectElem = wrapper.find("select");
        expect(selectElem.element.options.length).toBe(3);
        expect(selectElem.element.options[0].value).toBe("graph");
        expect(selectElem.element.options[1].value).toBe("edgeTable");
        expect(selectElem.element.options[2].value).toBe("nodeTable");
    });

    it('emits event when changed', async () => {
        const selectElem = wrapper.find("select");
        await selectElem.setValue('edgeTable');
        await nextTick();
        expect(wrapper.emitted('changeOption')).toBeDefined();
        expect(wrapper.emitted('changeOption')!.length).toBe(1);
        expect(wrapper.emitted('changeOption')![0]).toContain("edgeTable");
    });
});