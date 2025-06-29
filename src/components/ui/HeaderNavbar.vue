<script setup lang="js">
import { HeartIcon, MagnifyingGlassIcon, ShoppingCartIcon } from '@heroicons/vue/24/solid'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useDebounce } from '@/composables/useDebounce'
import CartContainer from '@/components/cart/CartContainer.vue'
import FavoritesContainer from '@/components/favorites/FavoritesContainer.vue'

const store = useStore()
const cartCount = computed(() => store.getters['cart/cartCount'])
const currentPage = computed(() => store.getters['movies/currentPage'])
const query = computed({
  get() {
    return store.getters['movies/query']
  },
  set(newValue) {
    store.dispatch('movies/setQuery', { query: newValue })
    store.dispatch('movies/setPage', { page: 0 })
  },
})

function handleOpenCart() {
  store.dispatch('cart/openCart')
}

function handleOpenFavorites() {
  store.dispatch('favorites/openFavorites')
}

function handleSearchMovies() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  })

  store.dispatch('movies/setPage', { page: currentPage.value + 1 })

  if (query.value) {
    store.dispatch('movies/fetchMoviesByTitle', {
      query: query.value,
      isFirstRequest: currentPage.value === 1,
    })
    store.dispatch('movies/setQuery', { query: query.value })
  } else {
    store.dispatch('movies/fetchMovies', { isFirstRequest: true })
  }
}

const debouncedSearch = useDebounce(handleSearchMovies)
</script>

<template>
  <header class="sticky top-0 z-10 shadow-lg shadow-neutral-950/50">
    <div
      class="flex sm:grid sm:grid-cols-3 items-center max-sm:justify-between gap-4 py-3 px-4 sm:px-8 bg-neutral-900"
    >
      <RouterLink
        to="/"
        class="w-fit text-lime-500 font-bold text-2xl tracking-wide select-none"
      >
        <span class="block sm:hidden">MS</span>
        <span class="hidden sm:block">MOVIE STORE</span>
      </RouterLink>

      <label
        class="group flex items-center rounded-sm bg-neutral-800 border-2 border-neutral-800 focus-within:border-lime-500 transition-all"
      >
        <input
          v-model="query"
          type="search"
          class="w-full py-2 px-3 text-neutral-100 placeholder:text-neutral-500 focus:outline-none"
          placeholder="Pesquisa"
          @input="debouncedSearch"
        />
        <MagnifyingGlassIcon
          class="fill-neutral-600 group-focus-within:fill-lime-300 size-8 mr-3 transition-all"
        />
      </label>

      <div class="flex items-center justify-end gap-2 sm:gap-4">
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
