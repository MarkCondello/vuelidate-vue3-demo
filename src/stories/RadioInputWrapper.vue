<template>
   <p>Opt in</p>
   <checkboxRadio
      :optionLabel="firstOptionLabel"
      :inputIsDisabled="firstInputIsDisabled"
      
      optionName="choices"
      optionValue="yes"

      :optionSelected="formStore.form.optIn === 'yes'"
      :inputErrors="v$.form.optIn.$errors"
      :inputIsValid="v$.form.optIn.$invalid === false"
      @clickedOption="formStore.form.optIn = 'yes'"
    />
    <checkboxRadio
      :optionLabel="secondOptionLabel"
      :inputIsDisabled="secondInputIsDisabled"
      
      optionName="choices"
      optionValue="no"

      :optionSelected="formStore.form.optIn === 'no'"
      :inputErrors="v$.form.optIn.$errors"
      :inputIsValid="v$.form.optIn.$invalid === false"
      @clickedOption="formStore.form.optIn = 'no'"
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
}),
{
  firstOptionLabel,
  firstInputIsDisabled,
  secondOptionLabel,
  secondInputIsDisabled,
} = toRefs(props)

const formStore = useFormStore(),
  rules = computed(() => ({
    form: {
      optIn: {
        required: helpers.withMessage('Select an optIn choice.', required),
      }
    },
  })),
  v$ = useVuelidate(rules, formStore.form),
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
