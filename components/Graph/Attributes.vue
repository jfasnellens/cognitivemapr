<!--This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
It is distributed under the GPL 3.0 open source license.-->

<template lang="pug">
.attributeDisplayDiv(:style='`left: ${position[0] + 20}px; top: ${position[1] + 20}px`')
  .nodeName Name: {{ `"${values.nodeName}"` }}
  .nodeInstrument {{ instrumentText }}
  .nodeParadigm {{ paradigmText }}
  .nodeParadigmSupport(
    v-if='values.paradigm && values.paradigmSupport && (values.paradigmSupport.paradigmA.value != 0 || values.paradigmSupport.paradigmB.value != 0)'
  ) {{ paradigmSupportText }}
  .nodeValue Node value: {{ values.evaluation.value }}
  .nodeDegrees Degrees: In {{ values.degrees.in }}, Out {{ values.degrees.out }}
  .nodeWDegrees Weighted Degrees: In {{ values.weightedDegrees.in }}, Out {{ values.weightedDegrees.out }}
</template>
<script setup lang="ts">
const props = defineProps(['position', 'values']);
const paradigmText = ref('Paradigm: ');
paradigmText.value += props.values.paradigm ? `"${props.values.paradigm}"` : '-';
const paradigmSupportText = ref('Support: ');
if (props.values.paradigmSupport) {
  paradigmSupportText.value +=
    props.values.paradigmSupport.paradigmA.value > 0
      ? `"${props.values.paradigmSupport.paradigmA.name}" (${props.values.paradigmSupport.paradigmA.value})`
      : props.values.paradigmSupport.paradigmB.value > 0
        ? `"${props.values.paradigmSupport.paradigmB.name}" (${props.values.paradigmSupport.paradigmB.value})`
        : '';
}
const instrumentText = ref('Instrument: ');
instrumentText.value += props.values.instr
  ? `"${props.values.instr.name}" (${props.values.instr.value})`
  : '-';
</script>
<style lang="scss">
.attributeDisplayDiv {
  position: absolute;
  user-select: none;
  pointer-events: none;
  background: var(--background-color);
  border: 1px solid var(--dflt-bor1-color);
  border-radius: 0.3em;
  max-width: 15em;
  padding-left: 3px;
  padding-right: 3px;
  div {
    font-size: 0.8em;
  }
}
</style>
