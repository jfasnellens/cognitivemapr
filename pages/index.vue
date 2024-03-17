<!--This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
It is distributed under the GPL 3.0 open source license.-->

<template lang="pug">
.page-wrapper
  .midContent
    .introTekst
      .title Welcome!
      .info
        p CognitiveMapr is here to assist you in creating and comparing cognitive maps
        p Simply upload a node list and edge list in .csv format
        p and CognitiveMapr will create visualisations and perform data analysis for you
    .nextButton
      .text Get started now!
      Defaultbutton(btn-type='start', btn-font-size='25px', @click='router.push("/upload")') Start
</template>
<script setup lang="ts">
const router = useRouter();
</script>

<style lang="scss" scoped>
.page-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  .midContent {
    display: flex;
    flex-direction: column;
    position: relative;
    row-gap: 10rem;
    .introTekst {
      text-align: center;
      display: flex;
      flex-direction: column;
      row-gap: 16px;
      .title {
        font:
          bold 4rem/5rem 'Poppins',
          sans-serif;
        margin-bottom: 2rem;
      }
    }
    .nextButton {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .text {
        padding-bottom: 1rem;
        font:
          normal 1.75rem/2rem 'Poppins',
          sans-serif;
      }
    }
  }
}

:deep(span) {
  font:
    bold 1.75rem/2rem 'Poppins',
    sans-serif;
}
p {
  font:
    normal 1.5rem/2rem 'Poppins',
    sans-serif;
}
</style>
