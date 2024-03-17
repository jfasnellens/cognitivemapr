<!--This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
It is distributed under the GPL 3.0 open source license.-->

<template lang="pug">
.header
  .cognitiveMapr
    h1(@click='router.push("/")') CognitiveMapr
  .pageTitle
    h1 {{ name }} Page
  .button-container
    Defaultbutton.help(btn-type='help', @click='showHelp = true') Help
    Defaultbutton.settings(btn-type='settings', @click='showSettings = true')
  PopupComponentsHelpPopUp(v-if='showHelp', @close-popup='showHelp = false')
  PopupComponentsSettingsPopUp(v-if='showSettings', @close-popup='showSettings = false')
</template>
<script setup lang="ts">
import { updateColors } from '~/scripts/colorModes';
const globalStore = useGlobalStore();
onBeforeMount(() => {
  let mode = 'light';
  if (globalStore.darkMode) mode = 'darkMode';
  if (globalStore.colorBlindMode) mode = 'colorBlindMode';
  updateColors(mode);
});
const router = useRouter();
const showHelp: Ref<boolean> = ref(false);
const showSettings: Ref<boolean> = ref(false);
const name = computed(() => {
  if (!router.currentRoute.value.name) return '';
  if (router.currentRoute.value.name === 'index') return 'Home';
  return (
    router.currentRoute.value.name.toString()[0].toUpperCase() +
    router.currentRoute.value.name.toString().substring(1)
  );
});
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--dflt-nav-color);
  color: var(--txt-color);
  padding: 0px 2rem;
  text-align: center;
  height: 80px;

  .cognitiveMapr {
    cursor: pointer;
  }

  .pageTitle {
    display: flex;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .button-container {
    display: flex;
    height: 100%;
    .help {
      width: 5rem;
    }
    .settings {
      width: 5rem;
      color: var(--txt-color);
    }
  }
}
</style>
