/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

/**
 * Updates root styleform in the browser to different color mode variables
 * @param mode To know which color mode is on
 */
export function updateColors(mode: string): void {
  const root = document.documentElement;
  const rootstyle = getComputedStyle(root);
  const variables = [
    '--overlay-model',
    '--help-bor1-color',
    '--dflt-bor2-color',
    '--dflt-bor1-color',
    '--nth-row-color',
    '--thead-color',
    '--disabled-color',
    '--close-act-color',
    '--close-hvr-color',
    '--close-btn-color',
    '--background-color',
    '--txt-color',
    '--link-color',
    '--dflt-btn-color',
    '--dflt-hvr-color',
    '--dflt-act-color',
    '--fad-btn-color',
    '--fad-hvr-color',
    '--fad-act-color',
    '--dflt-nav-color',
    '--dflt-navhvr-color',
    '--dflt-navact-color',
  ];

  if (mode === 'darkMode') {
    variables.forEach((varia) => {
      root.style.setProperty(varia, rootstyle.getPropertyValue(varia + '-d'));
    });
  } else if (mode === 'colorBlindMode') {
    variables.forEach((varia) => {
      root.style.setProperty(varia, rootstyle.getPropertyValue(varia + '-c'));
    });
  } else {
    variables.forEach((varia) => {
      root.style.setProperty(varia, rootstyle.getPropertyValue(varia + '-l'));
    });
  }
}
