<template>
  <fieldset class="field">
    <label class="field-label">Your income</label>
    <div class="select-input-wrapper">
      <inputField
        inputmode="numeric"
        pattern="\d*"
        inputName="usersIncome"
        inputPlaceholder="4,123"
        inputPrefix="$"
        :inputModel="formStore.form.incomeMoneyFormat"
        :inputErrors="v$.form.income.$errors"
        :inputIsValid="v$.form.income.$invalid === false"
        @focusedInput="v$.$reset()"
        @blurredInput="handleMoneyInputBlur('incomeMoneyFormat', 'income')"
        @updatedInput="(val) => handleMoneyInputUpdate(val, 'incomeMoneyFormat', 'income')"
      />
      <selectField
        inputOptionLabels="frequency"
        @updatedInput="handleSelectChange"
        :inputOptions="formStore.frequencyOptions"
        :inputValue="formStore.form.frequency"
      />
    </div>
  </fieldset>
</template>
<script setup>
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, between, helpers } from '@vuelidate/validators'

import { reactive, computed } from 'vue'
import { useFormStore } from '../stores/form'
import Formatter from '../helpers/formatter.js'

import inputField from '../components/InputField.vue'
import selectField from '../components/SelectField.vue'


const formStore = useFormStore(),
freqencyRange = reactive({ message: helpers.withMessage(
    `${formStore.form.frequency.validation.message} (min: ${formStore.form.frequency.validation.min} max: ${formStore.form.frequency.validation.max})`, 
    between(formStore.form.frequency.validation.min, formStore.form.frequency.validation.max)
  )
}),
rules = computed(() => ({
  form: {
    income: {
      required: helpers.withMessage('Add your income', required),
      // reference the frequency added in the formStore to set validation
      between: freqencyRange.message,
    },
  },
})),
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
},
handleSelectChange = (val) => {
  console.log('reached handleSelectChange', val)
  formStore.form.frequency = val
  freqencyRange.message = helpers.withMessage(
    `${formStore.form.frequency.validation.message} (min: ${formStore.form.frequency.validation.min} max: ${formStore.form.frequency.validation.max})`, 
    between(formStore.form.frequency.validation.min, formStore.form.frequency.validation.max)
  )
}

v$.value.form.$model = formStore.form // this is needed to set the model for vuelidate with the store
</script>
<style lang="scss" scoped>
.select-input-wrapper {
  align-items: flex-start;
  display: flex;
}
</style>