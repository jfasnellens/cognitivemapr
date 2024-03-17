<!--This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
It is distributed under the GPL 3.0 open source license.-->

<template lang="pug">
.UploadPopUpWrapper
  .content
    .topText
      .title Warning
      .subTitle Not all graphs are complete
    .errors
      .noName(v-if='noName > 0')
        .description {{ noName }} graph(s) are missing a name
      .noEdge(v-if='noEdge.length > 0')
        .description The following graphs are missing an edge list
        li(v-for='name in noEdge', :key='name') {{ name !== '' ? name : '*nameless*' }}
      .noNode(v-if='noNode.length > 0')
        .description The following graphs are missing a node list
        li(v-for='name in noNode', :key='name') {{ name !== '' ? name : '*nameless*' }}
    .subText(v-if='canIgnoreWarning') You are able to continue despite the warning <br> In this case, a node list will be generated for all graphs that are missing them
    .subText(v-else) Please ensure that all graphs have at least an edge list and name assigned
    .buttons
      Defaultbutton(btn-type='back', @click='$emit("closeModal")') Back
      Defaultbutton(v-if='canIgnoreWarning', btn-type='next', @click='$emit("ignoreWarnings")') Next
      Defaultbutton(v-else, btn-type='disabled') Next
</template>

<script setup lang="ts">
const props = defineProps({
  noNode: Array,
  noEdge: Array,
  noName: Number,
});
defineEmits(['closeModal', 'ignoreWarnings']);
const canIgnoreWarning: Ref<boolean> = ref(props.noEdge.length === 0 && props.noName === 0);
</script>

<style lang="scss">
.UploadPopUpWrapper {
  background-color: var(--overlay-model);
  z-index: 999;
  height: 100vh;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px);

  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background-color: var(--background-color);
    width: 40rem;
    height: 50%;
    padding: 2em;
    border-radius: 20px;
    border: 1px solid var(--dflt-bor1-color);
  }
}

.errors {
  text-align: center;
  overflow-y: auto;
  height: 50%;
  width: 90%;

  .noName,
  .noEdge,
  .noNode {
    padding-left: 10px;
    padding-right: 10px;
    font-weight: bold;
    height: auto;
  }
  .noName,
  .noEdge {
    padding-bottom: 5px;
  }

  .description {
    text-decoration: underline;
  }
  li {
    list-style: none;
    font-weight: normal;
    font-style: italic;
  }
}

.buttons {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.topText {
  text-align: center;

  .title {
    font-size: 25px;
    font-weight: bold;
  }
  .subTitle {
    font-size: 20px;
  }
}
.subText {
  text-align: center;
}
</style>
