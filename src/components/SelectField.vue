<template >
  <div class="vue-select-wrapper field">
    <label v-if="inputLabel"
      class="field-label"
    >{{ inputLabel }}</label>
    <VueMultiselect
      :track-by="inputOptionLabels"
      :label="inputOptionLabels"
      :model-value="value"
      :options="inputOptions"
      :show-labels="false"
      :searchable="false"
      :allow-empty="false"
      @update:model-value="(val) => {value = val; $emit('updatedInput', val)}"
    ></VueMultiselect>
  </div>
</template>
<script setup>
import { ref, reactive, toRefs } from 'vue';
import VueMultiselect from "vue-multiselect";
const props = defineProps({
  inputOptions: {
    type: Array,
    required: true,
  },
  inputOptionLabels: {
    type: String,
  },
  inputValue: {
    type: Object,
    default: null,
  },
  inputLabel: {
    type: String,
  },
})
const value = ref(props.inputValue)

</script>
<style lang="scss">
  @import 'vue-multiselect/dist/vue-multiselect.css';
  .vue-select-wrapper {
    margin-bottom: 1rem;
  }
  // .field {
  //   display: flex;
  //   flex-direction: column;
  //   margin-bottom: 1rem;
  //   width: 100%;
  //   &-label {
  //     display: block;
  //     font-family: "Roboto Slab",georgia,serif;
  //     font-weight: 700;
  //     margin-bottom: .25rem;
  //     transition: color .5s;
  //   }
  // }
</style>