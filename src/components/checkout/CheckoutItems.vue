<script setup lang="js">
import SidebarItems from '@/components/ui/SidebarItems.vue'
import { computed, watch } from 'vue'
import { useStore } from 'vuex'
import { formatPrice } from '@/utils/formats'
import { useRouter } from 'vue-router'

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
  <div class="space-y-10">
    <SidebarItems :movies="cartItems" type="checkout" @remove="handleRemoveFromCart" />
    <div class="flex items-center justify-between gap-2">
      <p class="">Total:</p>
      <p class="font-semibold text-lg">
        {{ formatPrice(cartTotalPrice) }}
      </p>
    </div>
  </div>
</template>
