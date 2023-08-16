
<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <form @submit.prevent="submitForm">
    <selectField
      inputLabel="Frequency"
      inputOptionLabels="frequency"
      :inputOptions="formStore.frequencyOptions"
      :inputValue="formStore.form.frequency"
      @updatedInput="handleFrequencySelectChange"
    />
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
      @blurredInput="handleMoneyInput('incomeMoneyFormat', 'income')"
      @keyTabPressedInput="handleMoneyInput('incomeMoneyFormat', 'income', true)"

      @updatedInput="(val) => (formStore.form.incomeMoneyFormat = val)"
    />
    <inputField
      inputmode="numeric"
      pattern="\d*"
      inputName="usersCost"
      inputLabel="your cost"
      inputPlaceholder="4,000"
      inputPrefix="$"
      :inputModel="formStore.form.costMoneyFormat"
      :inputErrors="v$.form.cost.$errors"
      :inputIsValid="v$.form.cost.$invalid === false"
      @focusedInput="v$.$reset()"
      @blurredInput="handleMoneyInput('costMoneyFormat', 'cost')"
      @keyTabPressedInput="(val) => handleMoneyInput(val, 'costMoneyFormat', 'cost')"
      @updatedInput="(val) => (formStore.form.costMoneyFormat = val)"

    />
    <inputField
      inputName="userName"
      inputLabel="your name"
      inputPlaceholder="John Doe..."
      :inputModel="formStore.form.name"
      :inputErrors="v$.form.name.$errors"
      :inputIsValid="v$.form.name.$invalid === false"
      @focusedInput="v$.$reset()"
      @blurredInput="v$.form.name.$touch"
      @updatedInput="(val) => (formStore.form.name= val)"
    />
    <inputField
      type="email"
      inputName="userEmail"
      inputLabel="your email"
      inputPlaceholder="JohnDoe@me.com"
      :inputModel="formStore.form.email"
      :inputErrors="v$.form.email.$errors"
      :inputIsValid="v$.form.email.$invalid === false"
      @focusedInput="v$.$reset()"
      @blurredInput="v$.form.email.$touch"
      @updatedInput="(val) => (formStore.form.email= val)"
    />
    <inputField
      type="number"
      inputName="userAge"
      inputLabel="your age"
      inputPlaceholder="40"
      :inputModel="formStore.form.age"
      :inputErrors="v$.form.age.$errors"
      :inputIsValid="v$.form.age.$invalid === false"
      @focusedInput="v$.$reset()"
      @blurredInput="v$.form.age.$touch"
      @updatedInput="(val) => (formStore.form.age = val)"
    />
    <inputField
      type="password"
      inputName="userPassword"
      inputLabel="your password"
      :inputModel="formStore.form.password"
      :inputErrors="v$.form.password.$errors"
      :inputIsValid="v$.form.password.$invalid === false"
      @focusedInput="v$.$reset()"
      @blurredInput="v$.form.password.$touch"
      @updatedInput="(val) => (formStore.form.password= val)"
    />
      <!-- :inputIsDisabled="true" -->
    <p>Opt in</p>
    <CheckboxRadio
      optionName="optIn"
      optionValue="yes"
      optionLabel="Yeah"
      :optionSelected="formStore.form.optIn === 'yes'"
      :inputErrors="v$.form.optIn.$errors"
      :inputIsValid="v$.form.optIn.$invalid === false"
      @clickedOption="formStore.form.optIn = 'yes'"
    />
    <CheckboxRadio
      optionName="optIn"
      optionValue="no"
      optionLabel="Nah"
      :optionSelected="formStore.form.optIn === 'no'"
      :inputErrors="v$.form.optIn.$errors"
      :inputIsValid="v$.form.optIn.$invalid === false"
      @clickedOption="formStore.form.optIn = 'no'"
    />
    <p>Options</p>
    <CheckboxRadio
      optionName="options"
      optionType="checkbox"
      optionValue="low"
      optionLabel="Low"
      :optionSelected="formStore.form.options.includes('low')"
      @clickedOption="(val) => handleOptionSelection(val)"
    />
      <!-- :inputErrors="v$.form.options.$errors"
      :inputIsValid="v$.form.options.$invalid === false" -->
    <CheckboxRadio
      optionName="options"
      optionType="checkbox"
      optionValue="medium"
      optionLabel="Medium"
      :optionSelected="formStore.form.options.includes('medium')"

      @clickedOption="(val) => handleOptionSelection(val)"
    />
      <CheckboxRadio
      optionName="options"
      optionType="checkbox"
      optionValue="high"
      optionLabel="high"
      :optionSelected="formStore.form.options.includes('high')"

      @clickedOption="(val) => handleOptionSelection(val)"
    />
 
    <div class="buttons-w">
      <button :disabled="v$.form.$invalid" class="btn btn-primary">Login</button>
      <!-- <button class="btn btn-primary">Login</button> -->
    </div>
  </form>
</template>
<script>
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, between, helpers } from '@vuelidate/validators'

import { reactive, computed } from 'vue'
import { useFormStore } from './stores/form'

import inputField from './components/FormElements/InputField.vue'
import selectField from './components/FormElements/SelectField.vue'
import CheckboxRadio from './components/FormElements/CheckBoxRadio.vue'

export default {
  components: {
    inputField,
    selectField,
    CheckboxRadio,
  },
  setup () {
    const formStore = useFormStore(),
    freqencyRange = reactive({ message: helpers.withMessage(
        `${formStore.form.frequency.validation.message} (min: ${formStore.form.frequency.validation.min} max: ${formStore.form.frequency.validation.max})`, 
        between(formStore.form.frequency.validation.min, formStore.form.frequency.validation.max)
      )
    }),
    rules = computed(() => ({
      form: {
        name: {
          required: helpers.withMessage('Fill in ya name', required),
        },
        income: {
          required: helpers.withMessage('Add your income', required),
          // reference the frequency added in the formStore to set validation
          between: freqencyRange.message,
        },
        email: {
          required: helpers.withMessage('Fill it in', required),
          email: helpers.withMessage('Make it an email', email),
        },
        age: {
          required: helpers.withMessage('Add your age', required),
          between: helpers.withMessage('your age is out of range', between(18, 69))
        },
        cost: {
          required: helpers.withMessage('Add your cost', required),
          between: helpers.withMessage('your cost is out of range', between(1000, 500000))
        },
        password: {
          $model: formStore.form.password,
          required,
          min: minLength(6)
        },
        optIn: {
          required: helpers.withMessage('Add an optIn choice yo', required),
        }
      },
    }
    )),
    v$ = useVuelidate(rules, formStore.form),


		handleNumberInput = (fomattedRef, numberRef, includeTimeout = false) => {
			const timeoutValue = includeTimeout ? 100 : 0
			setTimeout(()=> { // The timeout is used for tabbing out of a field. Vuelidate does not pick up the event properly and so a timeout ensures that it runs on the correct property
				formStore.handlePercentFieldUpdates(fomattedRef, numberRef, 'consumerDisplay', 0)
				v$.value[numberRef].$touch()
				console.log('Reached handleNumberInput for ', numberRef, ' after ', timeoutValue)
			}, timeoutValue)
		},
    handlePercentInput = (fomattedRef, numberRef, decimals = 1, includeTimeout = false) => {
			const timeoutValue = includeTimeout ? 100 : 0
			setTimeout(()=> { // The timeout is used for tabbing out of a field. Vuelidate does not pick up the event properly and so a timeout ensures that it runs on the correct property
				formStore.handlePercentFieldUpdates(fomattedRef, numberRef, 'consumerDisplay', decimals)
				v$.value[numberRef].$touch()
			}, timeoutValue)
    },
    handleMoneyInput = (fomattedRef, numberRef, includeTimeout = false) => {
      const timeoutValue = includeTimeout ? 100 : 0
       setTimeout(()=> { // The timeout is used for tabbing out of a field. Vuelidate does not pick up the event properly and so a timeout ensures that it runs on the correct property
        formStore.handleMoneyFieldUpdates(fomattedRef, numberRef, 'consumerDisplay', 0)
        v$.value[numberRef].$touch()
      }, timeoutValue)
    },

    // handleMoneyInputUpdate = (val, fomattedRef, numberRef) => {
    //   formStore.form[fomattedRef] = val
    //   formStore.handleMoneyFieldUpdate(val, fomattedRef, numberRef)
    // },
    // handleMoneyInputBlur = (fomattedRef, numberRef) => {
    //   v$.value.form[numberRef].$touch()
    //   formStore.handleMoneyFieldBlur(fomattedRef, numberRef)
    // },
    handleFrequencySelectChange = (val) => {
      console.log('reached handleSelectChange', val)
      formStore.form.frequency = val
      handleMoneyInputBlur('incomeMoneyFormat', 'income')

      freqencyRange.message = helpers.withMessage(
        `${formStore.form.frequency.validation.message} (min: ${formStore.form.frequency.validation.min} max: ${formStore.form.frequency.validation.max})`, 
        between(formStore.form.frequency.validation.min, formStore.form.frequency.validation.max)
      )
    },
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
    return { formStore, v$, handleMoneyInput, handleFrequencySelectChange, handleOptionSelection, submitForm }
  },
 }
</script>

<style scoped lang="scss">
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
form {
  position: relative;
  width: 100%;
}
</style>
