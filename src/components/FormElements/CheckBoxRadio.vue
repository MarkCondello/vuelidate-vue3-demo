<template>
  <label
    tabindex="0"
    class="sgy-checkbox-radio" :class="{
      'sgy-checkbox-radio-error' : inputErrors.length,
      'sgy-checkbox-radio-valid' : inputIsValid,
      'sgy-checkbox-radio-disabled' : inputIsDisabled
    }"
    v-on:keyup.enter="$emit('clickedOption', optionValue)"
  >
    <input
      tabindex="-1"
      :class="{'sgy-active' : optionSelected}"
      :disabled="inputIsDisabled"
      :name="optionName"
      :type="optionType"
      :value="optionValue"
      @click="$emit('clickedOption', optionValue)"
    />
    <span v-html="optionLabel" v-if="optionLabel" />
    <slot />
  </label>
</template>
<script setup>
import { toRefs } from 'vue'
defineEmits(['clickedOption']) // this prevents a console warning saying "Extraneous non-emits event listeners (clickedOption) were passed to component but could not be automatically inherited because component renders fragment or text root nodes."

const props = defineProps({
  optionValue: {
    type: String,
    required: true,
  },
  optionName: {
    type: String,
    required: true,
  },
  optionType: {
    type: String,
    default: 'radio'
  },
  optionSelected: {
    type: Boolean,
    required: true,
  },
  inputErrors: {
    type: Array,
    default: () => []
  },
  inputIsValid: {
    type: Boolean,
  },
  optionLabel: {
    type: String,
  },
  inputIsDisabled: {
    type: Boolean,
    default: false,
  },
}),
{
  optionValue,
  inputErrors,
  inputIsValid,
  optionName,
  optionLabel,
  inputIsDisabled,
} = toRefs(props)
</script>

