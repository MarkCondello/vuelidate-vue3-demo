<template>
    <inputField
      v-if="inputType === 'text'"

      :inputName="inputName"
      :inputLabel="inputLabel"
      :inputPlaceholder="inputPlaceholder"
      :inputIsDisabled="inputIsDisabled"

      :inputModel="formStore.form.text"
      :inputErrors="v$.form.text.$errors"
      :inputIsValid="v$.form.text.$invalid === false"
      @focusedInput="v$.$reset()"
      @blurredInput="v$.form.text.$touch"
      @updatedInput="(val) => (formStore.form.text= val)"
    />
    <inputField
      v-if="inputType === 'email'"

      :inputName="inputName"
      :inputLabel="inputLabel"
      :inputPlaceholder="inputPlaceholder"
      :inputIsDisabled="inputIsDisabled"

      type="email"
      :inputModel="formStore.form.email"
      :inputErrors="v$.form.email.$errors"
      :inputIsValid="v$.form.email.$invalid === false"
      @focusedInput="v$.$reset()"
      @blurredInput="v$.form.email.$touch"
      @updatedInput="(val) => (formStore.form.email= val)"
    />
    <inputField
      v-if="inputType === 'number'"

      :inputName="inputName"
      :inputLabel="inputLabel"
      :inputPlaceholder="inputPlaceholder"
      :inputIsDisabled="inputIsDisabled"

      type="number"
      :inputModel="formStore.form.number"
      :inputErrors="v$.form.number.$errors"
      :inputIsValid="v$.form.number.$invalid === false"
      @focusedInput="v$.$reset()"
      @blurredInput="v$.form.number.$touch"
      @updatedInput="(val) => (formStore.form.number = val)"
    />
 
    <inputField
      v-if="inputType === 'money'"
      inputmode="numeric"
      pattern="\d*"
      
      :inputName="inputName"
      :inputLabel="inputLabel"
      :inputPlaceholder="inputPlaceholder"
      :inputPrefix="inputPrefix"
      :inputIsDisabled="inputIsDisabled"

      :inputModel="formStore.form.incomeMoneyFormat"
      :inputErrors="v$.form.income.$errors"
      :inputIsValid="v$.form.income.$invalid === false"
      @focusedInput="v$.$reset()"
      @blurredInput="handleMoneyInputBlur('incomeMoneyFormat', 'income')"
      @updatedInput="(val) => handleMoneyInputUpdate(val, 'incomeMoneyFormat', 'income')"
    />
    <inputField
      v-if="inputType === 'password'"

      :inputName="inputName"
      :inputLabel="inputLabel"
      :inputPlaceholder="inputPlaceholder"
      :inputIsDisabled="inputIsDisabled"

      type="password"
      :inputModel="formStore.form.password"
      :inputErrors="v$.form.password.$errors"
      :inputIsValid="v$.form.password.$invalid === false"
      @focusedInput="v$.$reset()"
      @blurredInput="v$.form.password.$touch"
      @updatedInput="(val) => (formStore.form.password= val)"
    />
 
</template>
<script setup>
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, between, helpers } from '@vuelidate/validators'

import { reactive } from 'vue'

import Formatter from '../helpers/formatter.js'
import inputField from '../components/InputField.vue'
import { toRefs, computed } from 'vue'

  const props = defineProps({
    inputType: {
      type: String,
      default: 'text' // add options to select different input types, include money
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
  })

  const formStore = reactive({
    form: {
      text: '',
      email: '',
      number: null,
      income: null, // this is what is validated
      incomeMoneyFormat: '', // this is what is shown / formatted
      password: '',
    },
  }),
  rules = {
    form: {
      text: {
        required: helpers.withMessage('Fill in the text field', required),
      },
      email: {
        required: helpers.withMessage('Fill in the email field', required),
        email: helpers.withMessage('Make it an email brah', email),
      },
      number: {
        required: helpers.withMessage('Fill in the number field', required),
        between: helpers.withMessage('Your number is outside of the 18 - 69 range', between(18, 69))
      },
      income: {
        required: helpers.withMessage('Fill in the income field', required),
        between: helpers.withMessage('Your income is outside of the 1000 - 200,000 range', between(1000, 200000))
      },
      password: {
        $model: formStore.form.password,
        required,
        min: minLength(6)
      },
    },
  },
  v$ = useVuelidate(rules, formStore.form),

  handleMoneyInputUpdate = (val, modelToFormat, modelToUpdate) => {
    formStore.form[modelToFormat] = val
    const numberValue = Number.parseInt(Formatter.stripNonIntegers(val))
    handleMoneyFormat(numberValue, modelToFormat, modelToUpdate)
  },

  handleMoneyInputBlur = (modelToFormat, modelToUpdate) => {
    v$.value.form[modelToUpdate].$touch()
    const numberValue = Number.parseInt(Formatter.stripNonIntegers(formStore.form[modelToFormat]))
    handleMoneyFormat(numberValue, modelToFormat, modelToUpdate)
  },
  handleMoneyFormat = (numberValue, modelToFormat, modelToUpdate) => {
    if (Number.isInteger(numberValue)) {
      formStore.form[modelToUpdate] = numberValue
      formStore.form[modelToFormat] = Formatter.formatWithCommas(numberValue)
    } else {
      formStore.form[modelToFormat] = ''
      formStore.form[modelToUpdate] = 0
    }
  }

  v$.value.form.$model = formStore.form // this is needed to set the model for vuelidate with the store

</script>

