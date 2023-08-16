<template >
  <div
    class="sgy-vue-select-wrapper"
    :class="`sgy-${inputValue[inputOptionLabels]}-selection`"
    v-if="inputOptions"
  >
    <label
      v-if="inputLabel"
      class="sgy-field-label"
    >{{ inputLabel }}</label>
    <VueMultiselect
      :tabindex="0"
      :track-by="inputOptionLabels"
      :label="inputOptionLabels"
      :model-value="inputValue"
      :options="inputOptions"
      :show-labels="false"
      :searchable="false"
      :allow-empty="false"
      @update:model-value="(val) => {inputValue = val; $emit('updatedInput', val)}"
    ></VueMultiselect>
  </div>
</template>
<script setup>
import { toRefs } from 'vue';
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
}),
{ inputOptions, inputOptionLabels, inputValue, inputLabel } = toRefs(props)

</script>
<style lang="scss">
  @import 'vue-multiselect/dist/vue-multiselect.css';
</style>