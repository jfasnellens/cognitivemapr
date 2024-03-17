<!--This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
It is distributed under the GPL 3.0 open source license.-->

<template lang="pug">
.CycleEvaluationWrapper
  .content
    .topText
      .title Choose Evaluation Values
      .subTitle The 'Evaluate Concepts' script has encountered a cycle in "{{ props.graphName }}" that can not be evaluated automatically. User intervention is required in order to pick the best set of values out of the attempted calculations. In the table displayed below, a row is shown for each node in this cycle. Each column contains a set of evaluation values that was calculated by the analysis script. Please select the column that contains the best set of values.
    .contents
      table
        tr(v-for='nodeObj in props.valuesRequired', :key='nodeObj.node.nodeName')
          td.nodeName {{ nodeObj.node.nodeName }}
          td(
            v-for='iteration in nodeObj.values.length',
            :key='iteration',
            :class='{ selected: iterationSelected(iteration) }',
            @click='selectIteration(iteration)'
          ) {{ nodeObj.values[iteration - 1] }}
    .buttons
      Defaultbutton(btn-type='back', @click='$emit("closePopup")') Back
      Defaultbutton(btn-type='next', @click='$emit("cancelEvaluation")') Don't run scripts
      Defaultbutton(btn-type='next', @click='$emit("pickValues", selectedIteration)') Use selected values
</template>

<script setup lang="ts">
const props = defineProps({
  graphName: { type: String, required: false },
  valuesRequired: { type: Array, required: false },
});

const selectedIteration = ref(1); // First iteration selected by default

/**
 * Selects an iteration of which the cycle values are chosen
 * @param iteration The chosen iteration
 */
function selectIteration(iteration: number) {
  selectedIteration.value = iteration;
}

/**
 * Checks whether an iteration is selected
 * @param iteration Iteration for which to check whether it's selected
 * @returns Whether the iteration is selected
 */
function iterationSelected(iteration: number) {
  return iteration === selectedIteration.value;
}

defineEmits(['closePopup', 'cancelEvaluation', 'pickValues']);
</script>

<style lang="scss">
.CycleEvaluationWrapper {
  background-color: var(--overlay-model);
  z-index: 2;
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
    width: 55%;
    height: 90%;
    padding: 2em;
    border-radius: 20px;
    border: 1px solid var(--dflt-bor1-color);
  }
}

.contents {
  display: flex;
  overflow: auto;
  height: 60%;
  width: 100%;
  border: 1px solid var(--dflt-bor1-color);
  margin: 1rem 0rem;
  table {
    width: 100%;
    border-spacing: 0;
    border-collapse: collapse;
  }
  tr:nth-child(even) {
    background-color: rgba(128, 128, 128, 0.1);
  }
  td {
    cursor: pointer;
    text-align: center;
    font-size: 20px;
    padding: 5px 5px 5px 5px;
    position: relative;
  }
  .nodeName {
    cursor: default;
    text-align: left;
    font-style: italic;
    padding-right: 15px;
    white-space: nowrap;
  }
  .selected {
    background-color: var(--thead-color);
  }
  table td {
    border-left: 1px solid var(--dflt-bor1-color);
    border-right: 1px solid var(--dflt-bor1-color);
  }
  table td:first-child {
    border-left: none;
  }
  table td:last-child {
    border-right: none;
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
    font-size: 18px;
    padding-top: 10px;
    text-align: justify;
  }
}
</style>
