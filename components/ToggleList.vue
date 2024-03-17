<!--This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
It is distributed under the GPL 3.0 open source license.-->

<template lang="pug">
.toggleWrapper
  .header {{ headerText }}
  li.toggle(v-for='option in toggleOptions', :key='option.name')
    label.switch
      input(v-model='option.enabled', type='checkbox', @click='toggle')
      span.slider
    .toggleName {{ option.name }}
</template>

<script lang="ts" setup>
defineProps({
  headerText: { type: String },
  toggleOptions: { type: Object },
});
</script>

<style lang="scss">
.toggleWrapper {
  background-color: var(--background-color);
  .header {
    text-align: center;
    font-weight: bold;
    font-size: 1.3em;
    margin: 0.3em;
  }
}

.toggle {
  margin: 0.5em;
  display: flex;
  align-items: center;
  .toggleName {
    margin-left: 5px;
  }
  .switch {
    position: relative;
    display: inline-block;
    min-width: 40px;
    height: 24px;
    input {
      opacity: 0;
      width: 0;
      height: 0;
    }
    .slider {
      position: absolute;
      cursor: pointer;
      border-radius: 34px;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      -webkit-transition: 0.4s;
      transition: 0.4s;
      &:before {
        position: absolute;
        content: '';
        height: 18px;
        width: 18px;
        border-radius: 50%;
        left: 4px;
        bottom: 3px;
        background-color: white;
        -webkit-transition: 0.4s;
        transition: 0.4s;
      }
    }
  }
  input:checked + .slider {
    background-color: var(--dflt-btn-color);
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #ccc;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(15px);
    -ms-transform: translateX(15px);
    transform: translateX(15px);
  }
}
</style>
