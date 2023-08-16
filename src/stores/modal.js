import { defineStore, acceptHMRUpdate } from 'pinia'

export const useModalStore = defineStore('ModalStore', {
  state: ()=> ({
    showModal: false,
    contentComponents: ["FixedAssumptions", "Disclaimer"],
    contentComponentName: '',
  }),
  actions: {
    setContentComponent(componentName) {
      if (this.contentComponents.includes(componentName)) {
        this.contentComponentName = componentName
        this.showModal = true
      }
    },
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useModalStore, import.meta.hot))
}
