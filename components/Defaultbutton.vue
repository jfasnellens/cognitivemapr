<!--This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
It is distributed under the GPL 3.0 open source license.-->

<template lang="pug">
.btn-wrapper(:class='btnType')
  button
    span
      svgo-IconSettings#settingsIcon(v-if='btnType === "settings"')
      svgo-IconClose#closeIcon(v-if='btnType === "close"')
      #plusIcon(v-if='btnType === "zoomIn"') +
      #minusIcon(v-if='btnType === "zoomOut"') -
      slot(v-else)
</template>

<script setup lang="ts">
defineProps({ btnType: { type: String, default: 'default' } });
// can have value: default, close, disabled, next, back, help, settings, exportOption
</script>

<style lang="scss" scoped>
//===========================================
//standard settings
//===========================================
.btn-wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
  color: var(--txt-color);
}
button {
  cursor: pointer;
  background-color: var(--dflt-btn-color);
  border-radius: 15px;
  border: none;
  color: var(--txt-color);
  span {
    font-weight: bold;
  }
}
button:hover {
  background-color: var(--dflt-hvr-color);
}
button:active {
  background-color: var(--dflt-act-color);
}
//===========================================
//default button dimensions
//===========================================
.default button {
  width: 100px;
  height: 40px;
  padding: 10px;
}
//===========================================
//disabled button settings
//===========================================
.disabled button {
  cursor: initial;
  background-color: var(--disabled-color);
}
.disabled button:hover {
  background-color: var(--disabled-color);
}
.disabled button:active {
  background-color: var(--disabled-color);
}
//===========================================
//start button
//===========================================
.start button {
  font-size: 25px;
  padding: 1rem 5rem;
}
//===========================================
//help button
//===========================================
.help {
  button {
    height: 100%;
    border-radius: 0;
    background-color: var(--dflt-nav-color);
    span {
      font-size: 25px;
    }
  }
}
//===========================================
//settings button
//===========================================
.settings {
  button {
    height: 100%;
    border-radius: 0;
    background-color: var(--dflt-nav-color);
  }
  #settingsIcon {
    display: inline-block;
    height: 2.5em;
    width: 2.5em;
    :deep(svg) {
      width: 2.5em;
      height: 2.5em;
    }
  }
}
//===========================================
//close button settings
//===========================================
.close button {
  background-color: var(--close-btn-color);
  :deep(svg) {
    width: 2em;
    height: 2em;
  }
}
.close button:hover {
  background-color: var(--close-hvr-color);
}
.close button:active {
  background-color: var(--close-act-color);
}
//===========================================
//back, next and disabled button settings
//===========================================
.back button,
.next button,
.export button,
.clear button,
.disabled button {
  font-size: 15px;
  padding: 0.75rem 2.5rem;
}
.back button {
  background-color: var(--fad-btn-color);
}
.back button:hover {
  background-color: var(--fad-hvr-color);
}
.back button:active {
  background-color: var(--fad-act-color);
}
//===========================================
//export option buttons settings
//===========================================

.exportOption button {
  display: flex;
  width: 100%;
  background-color: transparent;
}
//===========================================
//nav bar buttons settings
//===========================================
.settings button,
.help button {
  background-color: var(--dflt-nav-color);
}
.settings button:hover,
.help button:hover {
  background-color: var(--dflt-navhvr-color);
}
.settings button:active,
.help button:active {
  background-color: var(--dflt-navact-color);
}
.settings button {
  img {
    height: 40px;
  }
}

//===========================================
//graph zoom buttons
//===========================================
.zoomIn button,
.zoomOut button {
  height: 2.5em;
  width: 2em;
}
</style>
