<script setup lang="js">
import SidebarBase from '@/components/ui/SidebarBase.vue'
import SidebarItems from '@/components/ui/SidebarItems.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const favorites = computed(() => store.getters['favorites/favorites'])
const isOpen = computed({
  get() {
    return store.getters['favorites/favoritesIsOpen']
  },
  set() {
    store.dispatch('favorites/closeFavorites')
  },
})

function handleRemoveFromFavorites(movie) {
  store.dispatch('favorites/toggleFavorite', movie)
}

function handleClearFavorites() {
  store.dispatch('favorites/clearFavorites')
}

function handleAddToCart(movie) {
  store.dispatch('cart/addToCart', movie)
}
</script>

<template>
  <SidebarBase
    v-model="isOpen"
    title="Meu carrinho"
    :item-count="favorites.length"
    @clear="handleClearFavorites"
  >
    <SidebarItems
      :movies="favorites"
      type="favorites"
      @addToCart="handleAddToCart"
      @remove="handleRemoveFromFavorites"
    />
  </SidebarBase>
</template>
