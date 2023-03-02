<template>
  <div
    class="field"
    :class="{
      'field-error': inputErrors.length,
      'field-valid': inputIsValid,
    }"
  >
    <label class="field-label" :for="inputName" v-html="inputLabel" />
    <input
      v-bind="$attrs"
      class="field-input"
      :placeholder="inputPlaceholder"
      :name="inputName"
      :value="inputModel"
      @input="$emit('updatedInput', $event.target.value)"
      @focus="$emit('focusedInput')"
      @blur="$emit('blurredInput')"
    >
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
  </div>
</template>

<script setup>
import { toRefs, computed } from 'vue'
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
  hasErrors = computed(()=>{
    return inputErrors.length > 1
  }),
  { inputModel, inputErrors, inputIsValid, inputName, inputLabel, inputPlaceholder } = toRefs(props)
</script>
<style scoped lang="scss">
.field {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  width: 100%;
  &-label {
    display: block;
    font-family: "Roboto Slab",georgia,serif;
    font-weight: 700;
    margin-bottom: .25rem;
    transition: color .5s;
  }
  &-input {
    border-radius: 4px;
    border: 1px solid;
    border-color: #7c7c7c;
    color: #434343;
    display: block;
    font-size: 1rem;
    outline: none;
    padding: .5rem;
    transition: border-color .5s;
    &-errors {
      list-style: none;
      margin: 0;
      padding: 0;
    }
  }

  &-error {
    color: red;
    .field-input,
    .field-label{
      color: red;
    }
    .field-input {
      color: red;
      border-color: red;
    }
  }
  &-input-error {
    color: red;
    font-size: 14px;
    line-height: 1;
    padding: 8px 0;
  }

  &-valid {
    color: green;
    .field-input,
    .field-label{
      color: green;
    }
    .field-input {
      color: green;
      border-color: green;
    }
  }
}

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
