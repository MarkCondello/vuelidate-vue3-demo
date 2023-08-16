<template>
  <div id="variable-disclaimer-content">
    <div class="sgy-h3">Disclaimer</div>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit blanditiis quis fuga dolores cum harum, architecto non voluptatibus laboriosam eum et praesentium autem ipsam officiis consequuntur explicabo tenetur quos. A quas necessitatibus inventore!</p>
    <p>While we have made every effort to ensure all assumptions are reasonable, you should review them to match your own expectations/circumstances and not take them as the most appropriate assumption in all cases.</p>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi officiis possimus, omnis voluptatum nam qui voluptates aperiam quis dignissimos blanditiis. Ipsam molestiae possimus dignissimos quod voluptate nisi ut voluptates, nam vel minima fugit eos quidem ullam eligendi natus fuga voluptas exercitationem quis accusamus quo vitae. Expedita nisi qui excepturi deserunt mollitia maiores sint temporibus incidunt.</p>
    <p>This is a model, not a prediction. You should not rely upon the information provided by this calculator for the purposes of making a decision about a financial product. You should consider your own situation, objectives and needs, and obtain professional advice from a licensed or appropriately authorised financial adviser before making any financial decisions.</p>
  </div>
  <button
    aria-label="Close modal"
    id="SGY-close-modal-button"
    tabindex="0"
    type="button"
    @click="modalStore.showModal = false"
  >
    <Cross />
  </button>
</template>

<script setup>
import Cross from '../icons/CrossClose.vue'
import { useModalStore } from '~/stores/modal.js'

const modalStore = useModalStore()
</script>
