<template>
  <div
    class="sgy-field"
    :id="$attrs.id"
    :class="$attrs['class'], {
      'sgy-field-error': inputErrors.length,
      'sgy-field-valid': inputIsValid,
      'sgy-field-disabled': inputIsDisabled,
    }"
    :style="$attrs.style"
  >
    <label
      class="sgy-field-label"
      :class="inputLabelClass"
      v-html="inputLabel"
      :for="inputName"
    />
     <div
      class="sgy-field-input"
      :class="{'sgy-focused': inputFocused}"
     >
      <div class="sgy-field-prefix" v-if="inputPrefix">{{ inputPrefix }}</div>
      <input
        tabindex="0"
        :inputmode="$attrs.inputmode"
        :pattern="$attrs.pattern"
        :class="{
          'sgy-field-has-prefix': inputPrefix,
          'sgy-field-has-sufix': inputSufix,
        }"
        :disabled="inputIsDisabled"
        :name="inputName"
        :placeholder="inputPlaceholder"
        :value="inputModel"
        @input="$emit('updatedInput', $event.target.value)"
        @focus="$emit('focusedInput'); inputFocused = true"
        @blur="$emit('blurredInput'); inputFocused = false"
        @keyup.tab="$emit('blurredInput'); inputFocused = false"
      >
      <div class="sgy-field-suffix" v-if="inputSufix">{{ inputSufix }}</div>
    </div>
    <ErrorMessageList :inputErrors="inputErrors" v-if="showInputErrorMessages" />
  </div>
</template>

<script setup>
import { toRefs, ref } from 'vue'
import ErrorMessageList from './ErrorMessageList.vue'
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
    },
    inputLabelClass: {
      type: String,
    },
    inputPlaceholder: {
      type: [String, Number],
    },
    inputIsDisabled: {
      type: Boolean,
      default: false,
    },
    inputPrefix: {
      type: String,
    },
    inputSufix: {
      type: String,
    },
    showInputErrorMessages: {
     type: Boolean,
      default: true,
    },
  }),
  {
    inputModel,
    inputErrors,
    inputIsValid,
    inputName,
    inputLabel,
    inputPlaceholder,
    inputIsDisabled,
    inputPrefix,
    inputSufix,
    showInputErrorMessages,
  } = toRefs(props),
    inputFocused = ref(false)
</script>
