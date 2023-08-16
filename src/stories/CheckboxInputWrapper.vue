<template>
   <p>Options</p>
   <checkboxRadio
      optionType="checkbox"
      :optionLabel="firstOptionLabel"
      :inputIsDisabled="firstInputIsDisabled"
      
      optionName="choices"
      optionValue="yes"

      :inputErrors="v$.form.options.$errors"
      :inputIsValid="v$.form.options.$invalid === false"

      :optionSelected="formStore.form.options.includes('yes')"
      @clickedOption="(val) => handleOptionSelection(val)"
    />
    <checkboxRadio
      optionType="checkbox"
      :optionLabel="secondOptionLabel"
      :inputIsDisabled="secondInputIsDisabled"
      
      optionName="choices"
      optionValue="no"

      :inputErrors="v$.form.options.$errors"
      :inputIsValid="v$.form.options.$invalid === false"

      :optionSelected="formStore.form.options.includes('no')"
      @clickedOption="(val) => handleOptionSelection(val)"
    />
    <checkboxRadio
      optionType="checkbox"
      :optionLabel="thirdOptionLabel"
      :inputIsDisabled="thirdInputIsDisabled"
      
      optionName="choices"
      optionValue="dunno"

      :inputErrors="v$.form.options.$errors"
      :inputIsValid="v$.form.options.$invalid === false"

      :optionSelected="formStore.form.options.includes('dunno')"
      @clickedOption="(val) => handleOptionSelection(val)"
    />
    <checkboxRadio
      optionType="checkbox"
      :optionLabel="fourthOptionLabel"
      :inputIsDisabled="fourthInputIsDisabled"
      
      optionName="choices"
      optionValue="maybe"

      :inputErrors="v$.form.options.$errors"
      :inputIsValid="v$.form.options.$invalid === false"

      :optionSelected="formStore.form.options.includes('maybe')"
      @clickedOption="(val) => handleOptionSelection(val)"
    />
    <button @click="submitForm" class="btn btn-primary">Go</button>
</template>
<script setup>
import useVuelidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'

import { reactive, computed, toRefs } from 'vue'
import { useFormStore } from '../stores/form'

import checkboxRadio from '../components/FormElements/CheckBoxRadio.vue'
const props = defineProps({
 
  firstOptionLabel: {
    type: String,
    default: "Yeah"
  },
  firstInputIsDisabled: {
    type: Boolean,
    default: false,
  },
  secondOptionLabel: {
    type: String,
    default: "Nah"
  },
  secondInputIsDisabled: {
    type: Boolean,
    default: false,
  },

  thirdInputIsDisabled: {
    type: Boolean,
    default: false,
  },
  thirdOptionLabel: {
    type: String,
    default: "Dunno"
  },

  fourthInputIsDisabled: {
    type: Boolean,
    default: false,
  },
  fourthOptionLabel: {
    type: String,
    default: "Maybe"
  },

}),
{
  firstOptionLabel,
  firstInputIsDisabled,
  secondOptionLabel,
  secondInputIsDisabled,
    thirOptionLabel,
  thirInputIsDisabled,
    fourthOptionLabel,
  fourthInputIsDisabled,
} = toRefs(props)

const formStore = useFormStore(),
  rules = computed(() => ({
    form: {
      options: {
        required: helpers.withMessage('Select your preference(s).', required),
      }
    },
  })),
  v$ = useVuelidate(rules, formStore.form),

  handleOptionSelection = (val) => {
    if (formStore.form.options.includes(val)) {
      const filteredOptions = formStore.form.options.filter(option => option !== val)
      formStore.form.options = filteredOptions
    } else {
      formStore.form.options.push(val)
    }
  },

  submitForm = async () => {
    const isFormValid = await v$.value.$validate()
    if (!isFormValid) {
      console.log('invalid form')
    } else {
      console.log('valid form')
    }
  }

  v$.value.form.$model = formStore.form // this is needed to set the model for vuelidate with the store
</script>
