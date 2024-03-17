<!--This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
It is distributed under the GPL 3.0 open source license.-->

<template lang="pug">
.generalWrapper
  .title
    h2 {{ title }}
  .text(v-if='text')
    p {{ text }}
</template>
<script setup lang="ts">
defineProps({
  title: { type: String, default: '' },
  text: { type: String, default: '' },
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
    p {
      margin: 0;
    }
  }
  .text {
    text-align: left;
    word-wrap: break-word;
    margin-top: 1rem;
  }
  .image {
    img {
      margin-top: 2rem;
      width: 112%;
      border: 1px solid var(--help-bor1-color);
    }
  }
}
</style>
