<script setup lang="js">
import { HeartIcon, MagnifyingGlassIcon, ShoppingCartIcon } from '@heroicons/vue/24/solid'
import { computed } from 'vue'
import { useStore } from 'vuex'
import CartContainer from '@/components/cart/CartContainer.vue'
import FavoritesContainer from '@/components/favorites/FavoritesContainer.vue'

const store = useStore()
const cartCount = computed(() => store.getters['cart/cartCount'])

function handleOpenCart() {
  store.dispatch('cart/openCart')
}

function handleOpenFavorites() {
  store.dispatch('favorites/openFavorites')
}
</script>

<template>
  <header>
    <div class="grid grid-cols-3 items-center gap-4 py-3 px-8 bg-neutral-900">
      <RouterLink to="/" class="text-lime-500 font-bold text-2xl tracking-wide">
        MOVIE STORE
      </RouterLink>

      <label class="flex items-center rounded-sm bg-neutral-800 border-2 border-lime-500">
        <input
          type="search"
          class="w-full py-2 px-3 text-neutral-100 placeholder:text-neutral-500 focus:outline-none"
          placeholder="Pesquisa"
        />
        <MagnifyingGlassIcon class="fill-lime-300 size-8 mr-3" />
      </label>

      <div class="flex items-center justify-end gap-4">
        <button class="group relative cursor-pointer" @click="handleOpenFavorites">
          <HeartIcon
            class="size-10 fill-lime-500 group-hover:fill-lime-300 transition-all"
          />
        </button>
        <button class="group relative cursor-pointer" @click="handleOpenCart">
          <ShoppingCartIcon
            class="size-10 fill-lime-500 group-hover:fill-lime-300 transition-all"
          />
          <span
            class="absolute -top-2 -right-2 bg-neutral-200 text-neutral-800 rounded-full size-6"
          >
            {{ cartCount }}
          </span>
        </button>
      </div>
    </div>
  </header>

  <FavoritesContainer />
  <CartContainer />
</template>
