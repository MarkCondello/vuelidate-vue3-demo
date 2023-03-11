<template>
 <label class="checkbox-radio" :class="{
  'checkbox-radio-error' : inputErrors.length,
  'checkbox-radio-valid' : inputIsValid,
  'checkbox-radio-disabled' : inputIsDisabled
 }">
    <input
      :class="{'active' : optionSelected}"
      :disabled="inputIsDisabled"
      :name="optionName"
      :type="optionType"
      :value="optionValue"
      @click="$emit('clickedOption', optionValue)"
    />
    <span v-html="optionLabel" />
  </label>
  <ErrorMessageList :inputErrors="inputErrors" />
</template>
<script setup>
import ErrorMessageList from './ErrorMessageList.vue'

import { toRefs, computed } from 'vue'
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
      default: []
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

