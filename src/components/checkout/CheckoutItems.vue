<script setup lang="js">
import SidebarItems from '@/components/ui/SidebarItems.vue'
import ButtonBase from '@/components/forms/ButtonBase.vue'
import { computed, watch } from 'vue'
import { useStore } from 'vuex'
import { formatPrice } from '@/utils/formats'
import { useRouter } from 'vue-router'

defineProps({
  formIsValid: Boolean,
})

const store = useStore()
const router = useRouter()

const cartCount = computed(() => store.getters['cart/cartCount'])
const cartItems = computed(() => store.getters['cart/cartItems'])
const cartTotalPrice = computed(() => store.getters['cart/cartTotalPrice'])

function handleRemoveFromCart(movie) {
  store.dispatch('cart/removeFromCart', movie.id)
}

watch(cartCount, () => {
  if (cartCount.value === 0) {
    router.push('/')
  }
})
</script>

<template>
  <div class="space-y-5 sm:space-y-5 max-sm:pb-30">
    <div class="sm:max-h-[280px] sm:overflow-y-auto px-2 rounded-md bg-neutral-900">
      <SidebarItems :movies="cartItems" type="checkout" @remove="handleRemoveFromCart" />
    </div>
    <div
      class="max-sm:fixed max-sm:left-0 max-sm:bottom-0 max-sm:w-full max-sm:bg-neutral-900 max-sm:p-3 max-sm:shadow-2xl max-sm:shadow-neutral-950 space-y-5 sm:space-y-5"
    >
      <div class="flex items-center justify-between gap-2">
        <p class="">Total:</p>
        <p class="font-semibold text-lg">
          {{ formatPrice(cartTotalPrice) }}
        </p>
      </div>
      <ButtonBase type="submit" text="Finalizar Compra" :disabled="!formIsValid" />
    </div>
  </div>
</template>
