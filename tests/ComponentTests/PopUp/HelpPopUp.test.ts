/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

import { describe, it, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import HelpPopUp from '../components/PopupComponents/Help/HelpPopUp.vue';
import PopupComponentsHelpGeneral from '../components/PopupComponents/Help/General.vue';
import PopupComponentsHelpContact from '../components/PopupComponents/Help/Contact.vue';

describe('HelpPopUp', () => {
  it.each(['.helpPopupWrapper', '.content', '.left', '.right', '.close', 'button'])(
    'renders the %s element',
    (element) => {
      const help = mount(HelpPopUp);

      const div = help.find(element);

      expect(div.exists()).toBeTruthy();
    },
  );

  it('displays all options', () => {
    const help = mount(HelpPopUp);

    const options = help.findAll('.options');

    expect(options.length).toBe(7);
    expect(options.at(0)?.text()).toBe('General');
    expect(options.at(1)?.text()).toBe('Home Page');
    expect(options.at(2)?.text()).toBe('Upload Page');
    expect(options.at(3)?.text()).toBe('Graph Page');
    expect(options.at(4)?.text()).toBe('Choose Evaluation Values Pop-up');
    expect(options.at(5)?.text()).toBe('Export Pop-up');
    expect(options.at(6)?.text()).toBe('Contact');
  });

  it.each([
    { name: 'General Explanations', option: 0 },
    { name: 'Home Page Explanations', option: 1 },
    { name: 'Upload Page Explanations', option: 2 },
    { name: 'Graph Page Explanations', option: 3 },
    { name: 'Choose Evaluation Values Pop-up', option: 4 },
    { name: 'Export Pop-up Explanations', option: 5 },
    { name: 'Contact', option: 6 },
  ])('renders $component when option number $option is clicked', async ({ name, option }) => {
    const help = mount(HelpPopUp);

    const options = help.findAll('.options');

    await options.at(option)?.find('.option').trigger('click');

    const wrappers = help.findAllComponents<typeof PopupComponentsHelpGeneral>('.generalWrapper');
    wrappers.push(help.findComponent<typeof PopupComponentsHelpContact>('.contactWrapper'));
    const component = wrappers.find((wr) => wr.props().title === name);
    expect(component?.exists()).toBeTruthy();
  });

  it('displays only general component when no option is clicked', () => {
    const help = mount(HelpPopUp);

    const wrappers = help.findAllComponents<typeof PopupComponentsHelpGeneral>('.generalWrapper');
    const general = wrappers.find((wr) => wr.props().title === 'General Explanations');
    const home = wrappers.find((wr) => wr.props().title === 'Home Page Explanations');
    const upload = wrappers.find((wr) => wr.props().title === 'Upload Page Explanations');
    const graph = wrappers.find((wr) => wr.props().title === 'Graph Page Explanations');
    const cycle = wrappers.find((wr) => wr.props().title === 'Choose Evaluation Values Pop-up');
    const exports = wrappers.find((wr) => wr.props().title === 'Export Pop-up Explanations');
    const contact = help.findComponent<typeof PopupComponentsHelpContact>('.contactWrapper');

    expect(general?.exists()).toBeTruthy();
    expect(home?.exists()).toBeFalsy();
    expect(upload?.exists()).toBeFalsy();
    expect(graph?.exists()).toBeFalsy();
    expect(cycle?.exists()).toBeFalsy();
    expect(exports?.exists()).toBeFalsy();
    expect(contact?.exists()).toBeFalsy();
  });

  it('displays only home component when home page option is clicked', async () => {
    const help = mount(HelpPopUp);

    const options = help.findAll('.options');
    await options.at(1)?.find('.option').trigger('click');

    const wrappers = help.findAllComponents<typeof PopupComponentsHelpGeneral>('.generalWrapper');
    const general = wrappers.find((wr) => wr.props().title === 'General Explanations');
    const home = wrappers.find((wr) => wr.props().title === 'Home Page Explanations');
    const upload = wrappers.find((wr) => wr.props().title === 'Upload Page Explanations');
    const graph = wrappers.find((wr) => wr.props().title === 'Graph Page Explanations');
    const cycle = wrappers.find((wr) => wr.props().title === 'Choose Evaluation Values Pop-up');
    const exports = wrappers.find((wr) => wr.props().title === 'Export Pop-up Explanations');
    const contact = help.findComponent<typeof PopupComponentsHelpContact>('.contactWrapper');

    expect(home?.exists()).toBeTruthy();
    expect(general?.exists()).toBeFalsy();
    expect(upload?.exists()).toBeFalsy();
    expect(graph?.exists()).toBeFalsy();
    expect(cycle?.exists()).toBeFalsy();
    expect(exports?.exists()).toBeFalsy();
    expect(contact?.exists()).toBeFalsy();
  });

  it('displays only upload component when upload page is clicked', async () => {
    const help = mount(HelpPopUp);

    const options = help.findAll('.options');
    await options.at(2)?.find('.option').trigger('click');

    const wrappers = help.findAllComponents<typeof PopupComponentsHelpGeneral>('.generalWrapper');
    const general = wrappers.find((wr) => wr.props().title === 'General Explanations');
    const home = wrappers.find((wr) => wr.props().title === 'Home Page Explanations');
    const upload = wrappers.find((wr) => wr.props().title === 'Upload Page Explanations');
    const graph = wrappers.find((wr) => wr.props().title === 'Graph Page Explanations');
    const cycle = wrappers.find((wr) => wr.props().title === 'Choose Evaluation Values Pop-up');
    const exports = wrappers.find((wr) => wr.props().title === 'Export Pop-up Explanations');
    const contact = help.findComponent<typeof PopupComponentsHelpContact>('.contactWrapper');

    expect(upload?.exists()).toBeTruthy();
    expect(home?.exists()).toBeFalsy();
    expect(general?.exists()).toBeFalsy();
    expect(graph?.exists()).toBeFalsy();
    expect(cycle?.exists()).toBeFalsy();
    expect(exports?.exists()).toBeFalsy();
    expect(contact?.exists()).toBeFalsy();
  });

  it('displays only graph component when graph page is clicked', async () => {
    const help = mount(HelpPopUp);

    const options = help.findAll('.options');
    await options.at(3)?.find('.option').trigger('click');

    const wrappers = help.findAllComponents<typeof PopupComponentsHelpGeneral>('.generalWrapper');
    const general = wrappers.find((wr) => wr.props().title === 'General Explanations');
    const home = wrappers.find((wr) => wr.props().title === 'Home Page Explanations');
    const upload = wrappers.find((wr) => wr.props().title === 'Upload Page Explanations');
    const graph = wrappers.find((wr) => wr.props().title === 'Graph Page Explanations');
    const cycle = wrappers.find((wr) => wr.props().title === 'Choose Evaluation Values Pop-up');
    const exports = wrappers.find((wr) => wr.props().title === 'Export Pop-up Explanations');
    const contact = help.findComponent<typeof PopupComponentsHelpContact>('.contactWrapper');

    expect(graph?.exists()).toBeTruthy();
    expect(home?.exists()).toBeFalsy();
    expect(upload?.exists()).toBeFalsy();
    expect(general?.exists()).toBeFalsy();
    expect(cycle?.exists()).toBeFalsy();
    expect(exports?.exists()).toBeFalsy();
    expect(contact?.exists()).toBeFalsy();
  });

  it('displays only export component when export tab is clicked', async () => {
    const help = mount(HelpPopUp);

    const options = help.findAll('.options');
    await options.at(5)?.find('.option').trigger('click');

    const wrappers = help.findAllComponents<typeof PopupComponentsHelpGeneral>('.generalWrapper');
    const general = wrappers.find((wr) => wr.props().title === 'General Explanations');
    const home = wrappers.find((wr) => wr.props().title === 'Home Page Explanations');
    const upload = wrappers.find((wr) => wr.props().title === 'Upload Page Explanations');
    const graph = wrappers.find((wr) => wr.props().title === 'Graph Page Explanations');
    const cycle = wrappers.find((wr) => wr.props().title === 'Choose Evaluation Values Pop-up');
    const exports = wrappers.find((wr) => wr.props().title === 'Export Pop-up Explanations');
    const contact = help.findComponent<typeof PopupComponentsHelpContact>('.contactWrapper');

    expect(exports?.exists()).toBeTruthy();
    expect(home?.exists()).toBeFalsy();
    expect(upload?.exists()).toBeFalsy();
    expect(graph?.exists()).toBeFalsy();
    expect(cycle?.exists()).toBeFalsy();
    expect(general?.exists()).toBeFalsy();
    expect(contact?.exists()).toBeFalsy();
  });

  it('displays only export component when Choose Evaluation Values tab is clicked', async () => {
    const help = mount(HelpPopUp);

    const options = help.findAll('.options');
    await options.at(4)?.find('.option').trigger('click');

    const wrappers = help.findAllComponents<typeof PopupComponentsHelpGeneral>('.generalWrapper');
    const general = wrappers.find((wr) => wr.props().title === 'General Explanations');
    const home = wrappers.find((wr) => wr.props().title === 'Home Page Explanations');
    const upload = wrappers.find((wr) => wr.props().title === 'Upload Page Explanations');
    const graph = wrappers.find((wr) => wr.props().title === 'Graph Page Explanations');
    const cycle = wrappers.find((wr) => wr.props().title === 'Choose Evaluation Values Pop-up');
    const exports = wrappers.find((wr) => wr.props().title === 'Export Pop-up Explanations');
    const contact = help.findComponent<typeof PopupComponentsHelpContact>('.contactWrapper');

    expect(cycle?.exists()).toBeTruthy();
    expect(home?.exists()).toBeFalsy();
    expect(upload?.exists()).toBeFalsy();
    expect(graph?.exists()).toBeFalsy();
    expect(exports?.exists()).toBeFalsy();
    expect(general?.exists()).toBeFalsy();
    expect(contact?.exists()).toBeFalsy();
  });

  it('displays only contact component when contact tab is clicked', async () => {
    const help = mount(HelpPopUp);

    const options = help.findAll('.options');
    await options.at(6)?.find('.option').trigger('click');

    const wrappers = help.findAllComponents<typeof PopupComponentsHelpGeneral>('.generalWrapper');
    const general = wrappers.find((wr) => wr.props().title === 'General Explanations');
    const home = wrappers.find((wr) => wr.props().title === 'Home Page Explanations');
    const upload = wrappers.find((wr) => wr.props().title === 'Upload Page Explanations');
    const graph = wrappers.find((wr) => wr.props().title === 'Graph Page Explanations');
    const cycle = wrappers.find((wr) => wr.props().title === 'Choose Evaluation Values Pop-up');
    const exports = wrappers.find((wr) => wr.props().title === 'Export Pop-up Explanations');
    const contact = help.findComponent<typeof PopupComponentsHelpContact>('.contactWrapper');

    expect(contact?.exists()).toBeTruthy();
    expect(exports?.exists()).toBeFalsy();
    expect(home?.exists()).toBeFalsy();
    expect(upload?.exists()).toBeFalsy();
    expect(graph?.exists()).toBeFalsy();
    expect(cycle?.exists()).toBeFalsy();
    expect(general?.exists()).toBeFalsy();
  });

  test('if the close button emits correctly', async () => {
    const help = mount(HelpPopUp);

    const button = help.find('button');
    await button.trigger('click');

    expect(help.emitted()).toHaveProperty('closePopup');
  });
});
