<!--This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
It is distributed under the GPL 3.0 open source license.-->

<template lang="pug">
NuxtLayout
  NuxtPage
</template>
<script setup lang="ts">
const globalStore = useGlobalStore();
globalStore.syncDarkMode();
</script>
<style lang="scss">
html,
body {
  margin: 0;
  height: 100%;
  color: var(--txt-color);
  background-color: var(--background-color);
}
</style>
