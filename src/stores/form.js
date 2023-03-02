import { defineStore, acceptHMRUpdate } from 'pinia'

export const useFormStore = defineStore('FormStore', {
  state: () => {
    return {
      form: {
        name: 'GGF',
        email: '',
        password: '',
      }
    }
  },
  actions: {},
  getters: {},
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFormStore, import.meta.hot))
}