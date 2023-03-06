
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
      inputOptionLabels="frequency"
      @updatedInput="handleSelectChange"
      :inputOptions="formStore.frequencyOptions"
      :inputValue="formStore.form.frequency"
    />
      <!-- :inputValue="frequencyOptions[0]" -->
      <!-- :inputOptions="frequencyOptions" -->

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
      @blurredInput="handleMoneyInputBlur('costMoneyFormat', 'cost')"
      @updatedInput="(val) => handleMoneyInputUpdate(val, 'costMoneyFormat', 'cost')"
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
    <div class="buttons-w">
      <button :disabled="v$.form.$invalid" class="btn btn-primary">Login</button>
    </div>
  </form>
</template>
<script>
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, between, helpers } from '@vuelidate/validators'

import { reactive, computed } from 'vue'
import { useFormStore } from './stores/form'

import inputField from './components/InputField.vue'
import selectField from './components/SelectField.vue'

export default {
  components: {
    inputField,
    selectField,
  },
  setup () {
    const 
    // frequencyOptions = [
    //   {frequency: 'Yearly', code: 'year'},
    //   {frequency: 'Monthly', code: 'month'},
    //   {frequency: 'Fortnightly', code: 'fortnight'},
    //   {frequency: 'Weekly', code: 'week'},
    // ],
    formStore = useFormStore(),
    freqencyRange = reactive({ message: helpers.withMessage(
        `${formStore.form.frequency.validation.message} (min: ${formStore.form.frequency.validation.min} max: ${formStore.form.frequency.validation.max})`, 
        between(formStore.form.frequency.validation.min, formStore.form.frequency.validation.max)
      )
    }),
    // getFrequencyRange = () => {
    //   switch(formStore.form.frequency.val) {
    //     case 'year':
    //       freqencyRange.message = helpers.withMessage(
    //         `${formStore.form.frequency.validation.message} (min: ${formStore.form.frequency.validation.min} max: ${formStore.form.frequency.validation.max})`, 
    //         between(formStore.form.frequency.validation.min, formStore.form.frequency.validation.max))
    //       break
    //     case 'month':
    //       freqencyRange.message = helpers.withMessage('your income is out of range for the month setting', between(5000, 10000))
    //       break
    //     case 'fortnight':
    //       freqencyRange.message = helpers.withMessage('your income is out of range for the fortnight setting', between(1000, 2000))
    //       break
    //     case 'week':
    //       freqencyRange.message = helpers.withMessage('your income is out of range for the week setting', between(500, 1000))
    //       break
    //   }
    // },
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
      },
    }
    )),
    v$ = useVuelidate(rules, formStore.form),

    handleMoneyInputUpdate = (val, fomattedRef, numberRef) => {
      formStore.form[fomattedRef] = val
      formStore.handleMoneyFieldUpdate(val, fomattedRef, numberRef)
    },
    handleMoneyInputBlur = (fomattedRef, numberRef) => {
      v$.value.form[numberRef].$touch()
      formStore.handleMoneyFieldBlur(fomattedRef, numberRef)
    },
    handleSelectChange = (val) => {
      console.log('reached handleSelectChange', val)
      formStore.form.frequency = val
      // getFrequencyRange()
      freqencyRange.message = helpers.withMessage(
        `${formStore.form.frequency.validation.message} (min: ${formStore.form.frequency.validation.min} max: ${formStore.form.frequency.validation.max})`, 
        between(formStore.form.frequency.validation.min, formStore.form.frequency.validation.max)
      )
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
    return { formStore, v$, handleMoneyInputUpdate, handleMoneyInputBlur, handleSelectChange, submitForm }
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
