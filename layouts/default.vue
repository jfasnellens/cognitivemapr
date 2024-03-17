<!--This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
It is distributed under the GPL 3.0 open source license.-->

<template lang="pug">
.layout-wrapper
  Navbar
  UProgress(v-if="globalStore.loading", animation="swing", size="xs")
  .progressLoadingPlaceholder(v-else, style="height: 2px")
  .content-wrapper
    slot
  UNotifications.whitespace-pre-wrap
</template>
<script setup lang="ts">
const globalStore = useGlobalStore();
globalStore.syncDarkMode();

</script>
<style lang="scss" scoped>
.layout-wrapper {
  height: 100vh;
  display:flex;
  flex-direction: column;
}
.content-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  max-height: 100%;
  flex-grow: 1;
  slot {
    flex-grow: 1;
    flex-shrink: 1;
  }
}
</style>
