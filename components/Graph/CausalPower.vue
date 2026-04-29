<!--This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
It is distributed under the GPL 3.0 open source license.-->

<template lang="pug">
.causalPowerTableWrapper
  table(v-if='nodes.length > 0')
    thead.tableHead
      tr.headerRow
        th.headerCell(
          v-for='(title, i) in headers',
          :key='i'
        ) {{ title }}
    tbody
      tr.bodyRow(v-for='(node, i) in nodes', :key='i')
        td.bodyCell(
          v-for='(value, j) in node'
          :key='j'
        ) {{ value }}
  .pickCausalPowerWarning(v-if='nodes.length === 0')
    p.emptyEffectConceptWarning(
      v-if='effectConcept === ""'
    ) Please select an effect-concept.
    p.noCauseConceptsWarning(
      v-if='effectConcept !== ""'
    ) This effect-concept does not have any cause-concepts.
      
</template>

<script setup lang="ts">
const props = defineProps({
  effectConcept: {
    type: String,
    default: () => "",
  },
});

const scriptStore = useScriptStore();

const nodes: Ref<Array<Array<string>>> = computed(() => scriptStore.causalPowerNodes);
const headers: Array<string> = [
  'cause concept',
  'causal power',
  'effect concept',
];

</script>

<style>
.causalPowerTableWrapper { 
  border: 1px solid var(--dflt-bor1-color);
  border-radius: 0px 10px 10px 10px;
  height: 100%;
  overflow: auto;

  table {
    width: 100%;

    .tableHead {
      .headerCell {
        text-align: left;
        font-weight: bold;
      }
    }

    tbody tr:last-child {
      border-bottom: 1px solid var(--dflt-bor1-color);
    }
  }

  .pickCausalPowerWarning {
    display: flex;
    justify-content: center;
    margin-top: 10rem;
    
    p {
      font-size: 30px;
      font-weight: bold;
    }
  }
}
</style>
