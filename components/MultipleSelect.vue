<!--This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
It is distributed under the GPL 3.0 open source license.-->

<template lang="pug">
.multiple-selector-wrapper
  .option(v-for='(option, index) in optionsList', :key='option.value') 
    label.switch
      input(
        v-if='index === 0 || index === 1',
        type='checkbox',
        checked,
        @click='optionClicked(index)'
      )
      input(v-else, type='checkbox', @click='optionClicked(index)')
      span.slider
    .toggleName {{ option.name }}
</template>
<script setup lang="ts">
import type { OptionType } from '~/types/exporter';
const emit = defineEmits(['optionClicked']);
const props = defineProps({
  optionsList: { type: Object as PropType<OptionType[]> },
});

const selected: Ref<string[]> = ref([]);

/**
 * Toggles string value stored in selected array, emits all selected values
 * @param index position of clicked toggle
 */
function optionClicked(index: number) {
  if (selected.value[index] !== 'selected') selected.value[index] = 'selected';
  else selected.value[index] = 'notSelected';
  const exportTypes: OptionType[] | undefined = props.optionsList?.filter((_, index) => {
    return selected.value[index] === 'selected';
  });
  emit('optionClicked', exportTypes);
}

onMounted(() => {
  if (props.optionsList) {
    props.optionsList.forEach(() => {
      selected.value.push('notSelected');
    });

    optionClicked(0);
    optionClicked(1);
  }
});
</script>
<style lang="scss">
.multiple-selector-wrapper {
  .option {
    display: flex;
    padding: 5px;
    .switch {
      position: relative;
      display: inline-block;
      min-width: 40px;
      height: 24px;
      margin-right: 5px;
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
}
</style>
