/**
 * Updates root styleform in the browser to darkmode variables
 * @param darkMode To enable or disable darkmode
 */
export function updateColors(darkMode: boolean): void {
  const root = document.documentElement;
  const rootstyle = getComputedStyle(root);

  if (darkMode) {
    root.style.setProperty(
      '--background-color',
      rootstyle.getPropertyValue('--background-color-d'),
    );
    root.style.setProperty('--txt-color', rootstyle.getPropertyValue('--txt-color-d'));
    root.style.setProperty(
      '--background-color',
      rootstyle.getPropertyValue('--background-color-d'),
    );
    root.style.setProperty('--link-color', rootstyle.getPropertyValue('--link-color-d'));
    root.style.setProperty('--dflt-btn-color', rootstyle.getPropertyValue('--dflt-btn-color-d'));
    root.style.setProperty('--dflt-hvr-color', rootstyle.getPropertyValue('--dflt-hvr-color-d'));
    root.style.setProperty('--dflt-act-color', rootstyle.getPropertyValue('--dflt-act-color-d'));
    root.style.setProperty('--fad-btn-color', rootstyle.getPropertyValue('--fad-btn-color-d'));
    root.style.setProperty('--fad-hvr-color', rootstyle.getPropertyValue('--fad-hvr-color-d'));
    root.style.setProperty('--fad-act-color', rootstyle.getPropertyValue('--fad-act-color-d'));
    root.style.setProperty('--dflt-nav-color', rootstyle.getPropertyValue('--dflt-nav-color-d'));
    root.style.setProperty(
      '--dflt-navhvr-color',
      rootstyle.getPropertyValue('--dflt-navhvr-color-d'),
    );
    root.style.setProperty(
      '--dflt-navact-color',
      rootstyle.getPropertyValue('--dflt-navact-color-d'),
    );
    root.style.setProperty('--close-btn-color', rootstyle.getPropertyValue('--close-btn-color-d'));
    root.style.setProperty('--close-hvr-color', rootstyle.getPropertyValue('--close-hvr-color-d'));
    root.style.setProperty('--close-act-color', rootstyle.getPropertyValue('--close-act-color-d'));
    root.style.setProperty('--disabled-color', rootstyle.getPropertyValue('--disabled-color-d'));
    root.style.setProperty('--thead-color', rootstyle.getPropertyValue('--thead-color-d'));
    root.style.setProperty('--nth-row-color', rootstyle.getPropertyValue('--nth-row-color-d'));
    root.style.setProperty('--dflt-bor1-color', rootstyle.getPropertyValue('--dflt-bor1-color-d'));
    root.style.setProperty('--dflt-bor2-color', rootstyle.getPropertyValue('--dflt-bor2-color-d'));
    root.style.setProperty('--help-bor1-color', rootstyle.getPropertyValue('--help-bor1-color-d'));
    root.style.setProperty('--overlay-model', rootstyle.getPropertyValue('--overlay-model-d'));
  } else {
    root.style.setProperty(
      '--background-color',
      rootstyle.getPropertyValue('--background-color-l'),
    );
    root.style.setProperty('--txt-color', rootstyle.getPropertyValue('--txt-color-l'));
    root.style.setProperty(
      '--background-color',
      rootstyle.getPropertyValue('--background-color-l'),
    );
    root.style.setProperty('--link-color', rootstyle.getPropertyValue('--link-color-l'));
    root.style.setProperty('--dflt-btn-color', rootstyle.getPropertyValue('--dflt-btn-color-l'));
    root.style.setProperty('--dflt-hvr-color', rootstyle.getPropertyValue('--dflt-hvr-color-l'));
    root.style.setProperty('--dflt-act-color', rootstyle.getPropertyValue('--dflt-act-color-l'));
    root.style.setProperty('--fad-btn-color', rootstyle.getPropertyValue('--fad-btn-color-l'));
    root.style.setProperty('--fad-hvr-color', rootstyle.getPropertyValue('--fad-hvr-color-l'));
    root.style.setProperty('--fad-act-color', rootstyle.getPropertyValue('--fad-act-color-l'));
    root.style.setProperty('--dflt-nav-color', rootstyle.getPropertyValue('--dflt-nav-color-l'));
    root.style.setProperty(
      '--dflt-navhvr-color',
      rootstyle.getPropertyValue('--dflt-navhvr-color-l'),
    );
    root.style.setProperty(
      '--dflt-navact-color',
      rootstyle.getPropertyValue('--dflt-navact-color-l'),
    );
    root.style.setProperty('--close-btn-color', rootstyle.getPropertyValue('--close-btn-color-l'));
    root.style.setProperty('--close-hvr-color', rootstyle.getPropertyValue('--close-hvr-color-l'));
    root.style.setProperty('--close-act-color', rootstyle.getPropertyValue('--close-act-color-l'));
    root.style.setProperty('--disabled-color', rootstyle.getPropertyValue('--disabled-color-l'));
    root.style.setProperty('--thead-color', rootstyle.getPropertyValue('--thead-color-l'));
    root.style.setProperty('--nth-row-color', rootstyle.getPropertyValue('--nth-row-color-l'));
    root.style.setProperty('--dflt-bor1-color', rootstyle.getPropertyValue('--dflt-bor1-color-l'));
    root.style.setProperty('--dflt-bor2-color', rootstyle.getPropertyValue('--dflt-bor2-color-l'));
    root.style.setProperty('--help-bor1-color', rootstyle.getPropertyValue('--help-bor1-color-l'));
    root.style.setProperty('--overlay-model', rootstyle.getPropertyValue('--overlay-model-l'));
  }
}
