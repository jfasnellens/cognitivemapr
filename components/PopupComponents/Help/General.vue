<!--This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
It is distributed under the GPL 3.0 open source license.-->

<template lang="pug">
.generalWrapper
  .title
    h1 {{ title }}
  .image(v-if='image')
    img(:src='`/helpImages/${image}`')
  .text(v-if='text')
    p {{ text }}
</template>
<script setup lang="ts">
defineProps({
  title: { type: String, default: 'Explanations' },
  text: { type: String, default: '' },
  image: { type: String, default: '' },
});
</script>
<style lang="scss" scoped>
.generalWrapper {
  margin: 1rem 0 1rem 1rem;
  .title {
    font-size: 26px;
    font-weight: bold;
    text-align: left;
    border-bottom: 1px solid var(--help-bor1-color);
  }
  .text {
    text-align: left;
    word-wrap: break-word;
    margin-top: 1rem;
    p {
      white-space: pre-wrap;
    }
  }
  .image {
    img {
      margin: auto;
      margin-top: 2rem;
      width: auto;
      max-height: 20rem;
      border: 1px solid var(--help-bor1-color);
    }
  }
}
</style>
