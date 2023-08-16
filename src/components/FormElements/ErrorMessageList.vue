<template>
  <SmoothFlow tabindex="-1" class="sgy-smooth-flow">
    <ul class="sgy-field-input-errors">
      <li
        v-for="(error, index) of inputErrors"
        class="field-input-error"
        :key="index"
      >{{ error.$message }}
      </li>
    </ul>
  </SmoothFlow>
</template>
<script setup>
import SmoothFlow from '../SmoothFlow..vue'
import { toRefs } from 'vue'
const props = defineProps({
  inputErrors: {
    type: Array,
  },
}),
{ inputErrors } = toRefs(props)
</script>
