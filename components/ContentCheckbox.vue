<template lang="pug">
button.checkbox-button-wrapper(:class='{ selected: selected }', @click='selected = !selected')
  .icon
    slot(name='icon')
      IconQuestionmark
  .text
    slot(name='text')
      p Text
</template>

<script lang="ts" setup>
const selected = defineModel<boolean>();
</script>

<style lang="scss" scoped>
@tailwind base;

.checkbox-button-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1/1;
  border-radius: 5px;
  border: 2px solid gray;
  width: 8rem;
  cursor: pointer;
  p {
    font-size: 1rem;
  }
  button {
    margin-left: 1rem;
  }
  &.selected {
    @apply bg-primary bg-opacity-5 border-2 border-primary-500;
  }
  .icon {
    margin: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    > * {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
  .text {
    margin: 5px;
    text-align: center;
  }
}
</style>
