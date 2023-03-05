
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
      :inputIsDisabled="true"
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

import { reactive } from 'vue'
import { useFormStore } from './stores/form'

import inputField from './components/InputField.vue'

export default {
  components: {
    inputField,
  },
  setup () {
    const formStore = useFormStore(),
    rules = {
      form: {
        name: {
          required: helpers.withMessage('Fill in ya name brah', required),
        },
        email: {
          required: helpers.withMessage('Fill it in brah', required),
          email: helpers.withMessage('Make it an email brah', email),
        },
        age: {
          required: helpers.withMessage('Add your age brah', required),
          between: helpers.withMessage('your age is out of range brah', between(18, 69))
        },
        cost: {
          required: helpers.withMessage('Add your cost brah', required),
          between: helpers.withMessage('your cost is out of range brah', between(1000, 500000))
        },
        income: {
          required: helpers.withMessage('Add your income brah', required),
          between: helpers.withMessage('your income is out of range brah', between(1000, 200000))
        },
        password: {
          $model: formStore.form.password,
          required,
          min: minLength(6)
        },
      },
    },
    v$ = useVuelidate(rules, formStore.form),

    handleMoneyInputUpdate = (val, fomattedRef, numberRef) => {
      formStore.form[fomattedRef] = val
      formStore.handleMoneyFieldUpdate(val, fomattedRef, numberRef)
    },
    handleMoneyInputBlur = (fomattedRef, numberRef) => {
      v$.value.form[numberRef].$touch()
      formStore.handleMoneyFieldBlur(fomattedRef, numberRef)
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
    return { formStore, v$, handleMoneyInputUpdate, handleMoneyInputBlur, submitForm }
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
