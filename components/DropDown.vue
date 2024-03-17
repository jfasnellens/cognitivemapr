<!--This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
It is distributed under the GPL 3.0 open source license.-->

<template lang="pug">
.dropdown-wrapper
  select(v-model='optionType', @change='changeOption')
    option(v-for='option in optionsList', :key='option.value', :value='option.value') {{ option.name }}
</template>
<script setup lang="ts">
import type { OptionType } from '~/types/exporter';

const emit = defineEmits(['changeOption']);
defineProps({
  optionsList: { type: Object as PropType<OptionType> },
});

const optionType: Ref<string> = ref('graph');

/**
 * Emits the selected value
 */
function changeOption() {
  emit('changeOption', optionType.value);
}
</script>
<style lang="scss">
.dropdown-wrapper {
  select {
    width: 100%;
    background-color: var(--background-color);
    outline: none;
    border: 1px solid var(--dflt-bor1-color);
    border-radius: 3px;
  }
}
</style>
