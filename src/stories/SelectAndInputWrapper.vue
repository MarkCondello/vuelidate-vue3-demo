<template>
  <div class="select-and-input-wrapper">
    <inputField
      inputmode="numeric"
      pattern="\d*"
      inputName="usersIncome"
      inputLabel="your income"
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
      :inputOptions="frequencyOptions"
      :inputValue="formStore.form.frequency"
    />
  </div>
</template>
<script>
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, between, helpers } from '@vuelidate/validators'

import { reactive, computed } from 'vue'
import Formatter from '../helpers/formatter.js'

import inputField from '../components/InputField.vue'
import selectField from '../components/SelectField.vue'


export default {
  components: {
    inputField,
    selectField,
  },
  setup () {
    const frequencyOptions = [
      {
        frequency: 'Yearly',
        val: 'year',
        validation: {
          message: 'your income is out of range for the year setting',
          min: 10000,
          max: 200000,
        }
      },
      {
        frequency: 'Monthly',
        val: 'month',
        validation: {
          message: 'your income is out of range for the month setting',
          min: 5000,
          max: 10000,
        }
      },
      {
        frequency: 'Fortnightly',
        val: 'fortnight',
        validation: {
          message: 'your income is out of range for the fortnight setting',
          min: 1000,
          max: 2000,
        }
      },
      {
        frequency: 'Weekly',
        val: 'week',
        validation: {
          message: 'your income is out of range for the fortnight setting',
          min: 500,
          max: 1000,
        }
      },
    ],
    formStore = reactive({
      form: {
        income: null, // this is what is validated
        incomeMoneyFormat: '', // this is what is shown / formatted
        frequency: frequencyOptions[0],
      },
    }),
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
    return {frequencyOptions, formStore, v$, handleMoneyInputUpdate, handleMoneyInputBlur, handleSelectChange }
  },
}

</script>
<style lang="scss" scoped>
.select-and-input-wrapper {
  align-items: flex-end;
  display: flex;
}
</style>