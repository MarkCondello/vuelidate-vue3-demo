import { defineStore, acceptHMRUpdate } from 'pinia'
import Formatter from '../helpers/formatter'

export const useFormStore = defineStore('FormStore', {
  state: () => {
    return {
      form: {
        name: '',
        email: '',
        age: null,
        cost: null, // this is what is validated
        costMoneyFormat: '', // this is what is shown / formatted
        income: null, // this is what is validated
        incomeMoneyFormat: '123123123', // this is what is shown / formatted
        password: '',
      },

    }
  },
  actions: {
    handleMoneyFieldUpdate(val, modelToFormat, modelToUpdate) {
      const numberValue = Number.parseInt(Formatter.stripNonIntegers(val))
      this.handleMoneyFormat(numberValue, modelToFormat, modelToUpdate)
    },
    handleMoneyFieldBlur(modelToFormat, modelToUpdate){
      const numberValue = Number.parseInt(Formatter.stripNonIntegers(this.form[modelToFormat]))
      this.handleMoneyFormat(numberValue, modelToFormat, modelToUpdate)
    },
    handleMoneyFormat(numberValue, modelToFormat, modelToUpdate) {
      if (Number.isInteger(numberValue)) {
        this.form[modelToUpdate] = numberValue
        this.form[modelToFormat] = Formatter.formatWithCommas(numberValue)
      } else {
        this.form[modelToFormat] = ''
        this.form[modelToUpdate] = 0
      }
    },

  },
  getters: {},
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFormStore, import.meta.hot))
}