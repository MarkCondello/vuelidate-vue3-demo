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
      @input="$emit('updateModel', $event.target.value)"

      @focus="$emit('focusedInput')"
      @blur="$emit('blurredInput')"
    >
    <ul
      class="field-input-errors" 
      v-for="(error, index) of inputErrors"
      :key="index"
    >
      <slide-up-down
        tag="li"
        v-model="inputErrors"
        :duration="800"
        class="field-input-error"
      >
      {{ error.$message }}
      </slide-up-down>
    </ul>
  </div>
</template>

<script setup>
import SlideUpDown from 'vue3-slide-up-down'
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
<style scoped lang="scss">
.field {
  display: flex;
  flex-direction: column;
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
    border-color: #cfe890;
    color: #7c7c7c;
    display: block;
    padding: .5rem;
    transition: border-color .5s;
    width: 100%;

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
</style>
