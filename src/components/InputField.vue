<template>
  <div
    class="field"
    :class="{
      'field-error': inputErrors.length,
      'field-valid': inputIsValid,
      'field-disabled': inputIsDisabled,
    }"
  >
    <label
      class="field-label"
      v-html="inputLabel"
      :for="inputName"
    />
    <div class="field-input">
      <div class="field-prefix" v-if="inputPrefix">
        {{ inputPrefix }}
      </div>
      <input
        v-bind="$attrs"
        :class="{'field-has-prefix': inputPrefix}"
        :disabled="inputIsDisabled"
        :name="inputName"
        :placeholder="inputPlaceholder"
        :value="inputModel"
        @input="$emit('updatedInput', $event.target.value)"
        @focus="$emit('focusedInput')"
        @blur="$emit('blurredInput')"
      >
    </div>
      <ErrorMessageList :inputErrors="inputErrors" />
  </div>
</template>

<script setup>
import { toRefs, computed } from 'vue'
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
    inputPlaceholder: {
      type: String,
    },
    inputIsDisabled: {
      type: Boolean,
      default: false,
    },
    inputPrefix: {
      type: String,
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
  } = toRefs(props)
</script>

