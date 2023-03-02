
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
      :inputErrors="v$.formStore.form.name.$errors"
      :inputIsValid="v$.formStore.form.name.$invalid === false"
      @focusedInput="v$.$reset()"
      @blurredInput="v$.formStore.form.name.$touch"
      @updatedInput="(val) => (formStore.form.name= val)"
    />
    <inputField
      type="email"
      inputName="userEmail"
      inputLabel="your email"
      inputPlaceholder="JohnDoe@me.com"
      :inputModel="formStore.form.email"
      :inputErrors="v$.formStore.form.email.$errors"
      :inputIsValid="v$.formStore.form.email.$invalid === false"
      @focusedInput="v$.$reset()"
      @blurredInput="v$.formStore.form.email.$touch"
      @updatedInput="(val) => (formStore.form.email= val)"
    />
    <inputField
      type="number"
      inputName="userAge"
      inputLabel="your age"
      inputPlaceholder="40"
      :inputModel="formStore.form.age"
      :inputErrors="v$.formStore.form.age.$errors"
      :inputIsValid="v$.formStore.form.age.$invalid === false"
      @focusedInput="v$.$reset()"
      @blurredInput="v$.formStore.form.age.$touch"
      @updatedInput="(val) => (formStore.form.age= val)"
    />
    <inputField
      type="password"
      inputName="userPassword"
      inputLabel="your password"
      :inputModel="formStore.form.password"
      :inputErrors="v$.formStore.form.password.$errors"
      :inputIsValid="v$.formStore.form.password.$invalid === false"
      @focusedInput="v$.$reset()"
      @blurredInput="v$.formStore.form.password.$touch"
      @updatedInput="(val) => (formStore.form.password= val)"
    />
    <div class="buttons-w">
      <button :disabled="v$.formStore.form.$invalid" class="btn btn-primary">Login</button>
    </div>
  </form>
</template>
<script>
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, between, helpers } from '@vuelidate/validators'

import formatter from './helpers/formatter'

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
      formStore: {
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
          password: {
            $model: formStore.form.password,
            required,
            min: minLength(6)
          },
        },
      }
    },
    v$ = useVuelidate(rules, formStore.form),
    submitForm = async () => {
      const isFormValid = await v$.value.$validate()
      if (!isFormValid) {
        console.log('invalid form')
      } else {
        console.log('valid form')
      }
    }
    v$.value.formStore.$model = formStore // this is needed to set the model for vuelidate with the store
    return { formStore, v$, submitForm }
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
