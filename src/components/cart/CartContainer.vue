<script setup lang="js">
import SidebarBase from '@/components/ui/SidebarBase.vue'
import SidebarItems from '@/components/ui/SidebarItems.vue'
import CartFooter from '@/components/cart/CartFooter.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const cartCount = computed(() => store.getters['cart/cartCount'])
const cartItems = computed(() => store.getters['cart/cartItems'])
const cartTotalPrice = computed(() => store.getters['cart/cartTotalPrice'])
const isOpen = computed({
  get() {
    return store.getters['cart/cartIsOpen']
  },
  set() {
    store.dispatch('cart/closeCart')
  },
})

function handleRemoveFromCart(movie) {
  store.dispatch('cart/removeFromCart', movie.id)
}

function handleClearCart() {
  store.dispatch('cart/clearCart')
}
</script>

<template>
  <SidebarBase
    v-model="isOpen"
    title="Meu carrinho"
    :item-count="cartCount"
    @clear="handleClearCart"
  >
    <SidebarItems :movies="cartItems" type="cart" @remove="handleRemoveFromCart" />
    <CartFooter :cart-total-price="cartTotalPrice" :cart-count="cartCount" />
  </SidebarBase>
</template>
