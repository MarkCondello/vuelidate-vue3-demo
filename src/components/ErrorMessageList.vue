<template>
<ul
  class="field-input-errors"
>
<TransitionGroup name="slide">
  <li
    v-for="(error, index) of inputErrors"
    class="field-input-error"
    :key="index"
  >
    {{ error.$message }}
  </li>
</TransitionGroup>
</ul>
</template>
<script setup>
import { toRefs } from 'vue'
const props = defineProps({
  inputErrors: {
    type: Array,
  },
}),
{ inputErrors } = toRefs(props)
</script>


<style scoped lang="scss">

.slide-enter-active,
.slide-leave-active {
  max-height: 100px;
  opacity: 1;
  transition: all 0.25s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  max-height: 0px;
  transform: translateX(15px);
}
</style>
