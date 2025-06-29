<script setup lang="js">
import ButtonBase from '@/components/forms/ButtonBase.vue'
import { formatPrice } from '@/utils/formats'

defineProps({
  cartTotalPrice: Number,
  cartCount: Number,
})
</script>

<template>
  <div class="space-y-4 p-6 border-t border-neutral-700 bg-neutral-800">
    <div class="flex items-center justify-between gap-2">
      <p class="">Total:</p>
      <p class="font-semibold text-lg">
        {{ formatPrice(cartTotalPrice) }}
      </p>
    </div>
    <ButtonBase text="Finalizar compra" :disabled="cartCount == 0" />
  </div>
</template>
