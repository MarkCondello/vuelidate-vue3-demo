<template>
  <div
    class="field"
    :class="{
      'field-error': inputErrors.length,
      'field-valid': inputIsValid,
    }"
  >
    <label :for="inputName" v-html="inputLabel" />
    <input
      v-bind="$attrs"
      class="field-input"
      :placeholder="inputPlaceholder"
      :name="inputName"
      :value="inputModel"
      @input="$emit('updateModel', $event.target.value)"

      @focus="$emit('focusedInput')"
      @blur="$emit('blurredInput')"
    >
    <ul
      class="field-input-errors" 
      v-for="(error, index) of inputErrors"
      :key="index"
    >
      <li class="field-input-error">{{ error.$message }}</li>
    </ul>
  </div>
</template>

<script setup>
 import { toRefs } from 'vue'
  const props = defineProps({
    inputModel: {
      type: [String, Number],
      required: true,
    },
    inputErrors: {
      type: Array,
    },
    inputIsValid: {
      type: Boolean,
    },
    inputName: {
      type: String,
      required: true,
    },
    inputLabel: {
      type: String,
      required: true,
    },
    inputPlaceholder: {
      type: String,
    },
  }),
  { inputModel, inputErrors, inputIsValid, inputName, inputLabel, inputPlaceholder } = toRefs(props)
</script>