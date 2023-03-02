import { defineStore, acceptHMRUpdate } from 'pinia'
import Formatter from '../helpers/formatter'

export const useFormStore = defineStore('FormStore', {
  state: () => {
    return {
      form: {
        name: '',
        email: '',
        age: null,
        cost: 12345, // this is what is validated
        costMoneyFormat: '1,2345', // this is what is shown / formatted
        password: '',
      }
    }
  },
  actions: {
    handleMoneyFieldUpdate(val, modelToFormat, modelToUpdate) {
      const numberValue = Number.parseInt(Formatter.stripNonIntegers(val))
      if (Number.isInteger(numberValue)) {
        console.log('reached val check update')
        this.form[modelToUpdate] = numberValue
        this.form[modelToFormat] = Formatter.formatWithCommas(numberValue)
      } else {
        this.form[modelToFormat] = ''
        this.form[modelToUpdate] = 0
      }
     console.log({val,modelToFormatState: this.form[modelToFormat], modelToUpdateState: this.form[modelToUpdate]})
    },
    // handleMoneyFieldBlur(modelToFormat, modelToUpdate){
    //   if (this.form[modelToFormat]) {
    //     console.log('reached check for modelToFormat blur')
    //     const numberValue = Number.parseInt(this.form[modelToFormat])
    //     this.form[modelToUpdate] = Formatter.stripNonIntegers(numberValue)
    //   } else {
    //     this.form[modelToFormat] = ''
    //     this.form[modelToUpdate] = null
    //   }
    // }
  },
  getters: {},
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFormStore, import.meta.hot))
}