
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
    <div
      class="form-group"
      :class="{
        error: v$.form.email.$errors.length,
        valid: v$.form.email.$invalid === false,
      }"
    >
      <label for="">Email</label>
      <input
        class="form-control"
        placeholder="Enter your username"
        type="email"
        v-model="formStore.form.email"
        @focus="v$.$reset()"
        @blur="v$.form.email.$touch"
      >
      <div class="pre-icon os-icon os-icon-user-male-circle"></div>
      <div class="input-errors" v-for="(error, index) of v$.form.email.$errors" :key="index">
        <div class="error-msg">{{ error.$message }}</div>
      </div>
    </div>

    <div
      class="form-group"
      :class="{
        error: v$.form.password.$errors.length,
        valid: v$.form.password.$invalid === false,
      }"
    >
      <label for="">Password</label>
      <input
        class="form-control"
        placeholder="Enter your password"
        type="password"
        v-model="formStore.form.password"
        @focus="v$.$reset()"
        @blur="v$.form.password.$touch"
      >
      <div class="pre-icon os-icon os-icon-fingerprint"></div>
      <div class="input-errors" v-for="(error, index) of v$.form.password.$errors" :key="index">
        <div class="error-msg">{{ error.$message }}</div>
      </div>
    </div>
    <div class="buttons-w">
      <button :disabled="v$.form.$invalid" class="btn btn-primary">Login</button>
    </div>

  </form>
</template>
<script>
import HelloWorld from './components/HelloWorld.vue'
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, helpers } from '@vuelidate/validators'

import formatter from './helpers/formatter'

import { reactive } from 'vue'
import { useFormStore } from './stores/form'

export default {
  setup () {
    const formStore = useFormStore(),
    // const formStore = reactive({
    //   form: {
    //     email: '',
    //     password: '',
    //   }
    // }),
    rules = {
      form: {
        email: {
          required: helpers.withMessage('Fill it in brah', required),
          email: helpers.withMessage('Make it an email brah', email),
        },
        password: {
          $model: formStore.form.password,
          required,
          min: minLength(6)
        },
      },
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
    v$.value.form.$model = formStore.form // this is needed to set the model for vuelidate with the store
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

.form-group {
  &.error {
    color: red;
  }
  &.valid {
    color: green;
  }
}
</style>
