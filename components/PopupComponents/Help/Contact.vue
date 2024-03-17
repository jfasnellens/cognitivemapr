<!--This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
It is distributed under the GPL 3.0 open source license.-->

<template lang="pug">
.contactWrapper
  .title
    h1 {{ title }}
  .text CognitiveMapr was made by commission of <a href='https://www.researchgate.net/profile/Femke-Esch'>Prof. dr. Femke van Esch</a> from Utrecht University.
  .text This program was made according to the principles of cognitive mapping introduced in &quot<a href=https://www.tandfonline.com/doi/full/10.1080/13501763.2022.2155215>How to ‘measure’ ideas. Introducing the method of cognitive mapping to the domain of ideational policy studies</a>&quot by Prof. dr. Femke van Esch and Ir. Jeroen Snellens.
  .text For further questions about CognitiveMapr or cognitive mapping in general, please contact <br> <span style='font-style: italic; font-weight: normal; font-size: 16px'>Femke van Esch</span>: f.a.w.j.vanesch@uu.nl
  .text For any technical related questions, please contact <br><span style='font-style:italic; font-weight: normal; font-size: 16px'>Jeroen Snellens</span>: snellens@gmail.com
</template>
<script setup lang="ts">
defineProps({
  title: { type: String, default: '' },
  text: { type: String, default: '' },
});
</script>
<style lang="scss" scoped>
.contactWrapper {
  margin: 1rem 0 1rem 1rem;
  .title {
    font-size: 26px;
    font-weight: bold;
    text-align: left;
    border-bottom: 1px solid var(--help-bor1-color);
  }
  .text {
    text-align: left;
    margin-top: 1rem;
  }
}
a:link {
  color: var(--link-color);
}
a:visited {
  color: var(--link-color);
}
</style>
