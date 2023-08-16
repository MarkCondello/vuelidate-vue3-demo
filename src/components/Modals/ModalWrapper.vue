<template>
  <div id="SGY-modal-overlay">
    <div id="SGY-modal-container" v-bind="$attrs">
      <slot />
    </div>
  </div>
</template>
<script setup>
import { onBeforeUnmount } from 'vue'
import { useModalStore } from '~/stores/modal.js'

const modalStore = useModalStore(),
  bodyEl = document.querySelector('body'),
  sgyHeader = document.querySelector('header.masthead')

bodyEl.style.overflowY = 'hidden'
if (sgyHeader) {
  sgyHeader.style.zIndex = 0
}
onBeforeUnmount(() => {
  bodyEl.style.overflowY = 'visible'
  if (sgyHeader) {
    sgyHeader.style.zIndex = 100
  }
})
if (modalStore.showModal === true) {
  document.onkeydown = (evt) => {
      evt = evt || window.event;
    if (evt.keyCode == 27) {
      // console.log('Esc key pressed.')
      modalStore.showModal = false
    }
  }
}
</script>