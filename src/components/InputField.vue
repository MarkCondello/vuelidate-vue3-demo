<template>
  <div
    class="field field--theme"
    :class="{
      'field-error': inputErrors.length,
      'field-valid': inputIsValid,
      'field-disabled': inputIsDisabled,
    }"
  >
    <label
      class="field-label field-label--theme"
      :for="inputName"
      v-html="inputLabel"
    />
    <div class="field-input" >
      <div class="field-prefix" v-if="inputPrefix">
        {{ inputPrefix }}
      </div>
      <input
        v-bind="$attrs"
        :class="{'field-has-prefix': inputPrefix}"
        :placeholder="inputPlaceholder"
        :name="inputName"
        :value="inputModel"
        :disabled="inputIsDisabled"
        @input="$emit('updatedInput', $event.target.value)"
        @focus="$emit('focusedInput')"
        @blur="$emit('blurredInput')"
      >
    </div>
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
    align-items: center;
    border-radius: 4px;
    border: 1px solid;
    border-color: #7c7c7c;
    color: #434343;
    display: flex;
    font-family: Arial, sans-serif;
    font-size: 1rem;
    transition: border-color .5s;
    > input {
      background: none;
      border: none;
      flex: 1 1 0;
      font-size: 1rem;
      outline: none;
      padding: .5rem;
      &::placeholder {
        color: #a6a6a6;
      }
      &:disabled {
        cursor: not-allowed;
      }
      &.field-has-prefix {
        padding-left: 5px;
      }
    }
    &-errors {
      list-style: none;
      margin: 0;
      padding: 0;
    }
  }
  &-prefix {
    padding-left: .5rem;
  }
  &-error {
    color: red;
    .field-input,
    .field-label,
    input {
      color: red;
    }
    .field-input {
      color: red;
      border-color: red;
    }
  }
  &-input-error {
    color: red;
    font-family: Arial, sans-serif;
    font-size: 13px;
    line-height: 1;
    padding: 8px 0;
  }
  &-valid {
    color: green;
    .field-input,
    .field-label,
    input {
      color: green;
    }
    .field-input {
      color: green;
      border-color: green;
    }
  }
  &-disabled {
    .field-label {
      color: #a6a6a6;
    }
    .field-input {
      border-color: #a6a6a6;
      color: #a6a6a6;
      > input {
        color: #a6a6a6;
      }
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
