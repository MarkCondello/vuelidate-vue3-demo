import { defineStore, acceptHMRUpdate } from 'pinia'
import Formatter from '../helpers/formatter'
const frequencies = [
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
]

export const useFormStore = defineStore('FormStore', {
  state: () => {
    return {
      frequencyOptions : frequencies,
      form: {
        name: '',
        email: '',
        age: null,
        cost: null, // this is what is validated
        costMoneyFormat: '', // this is what is shown / formatted
        income: null, // this is what is validated
        incomeMoneyFormat: '123123123', // this is what is shown / formatted
        password: '',
        frequency:  frequencies[0],
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