<script setup lang="js">
import TooltipBase from '@/components/ui/TooltipBase.vue'
import { formatPrice } from '@/utils/formats'
import { ShoppingCartIcon, TrashIcon } from '@heroicons/vue/24/solid'
import { ShoppingCartIcon as ShoppingCartIconOutline } from '@heroicons/vue/24/outline'
import { useStore } from 'vuex'

defineProps({
  type: String('cart' | 'favorites' | 'checkout'),
  movies: Array({
    id: Number,
    backdrop_path: String,
    release_date: String,
    title: String,
    vote_average: Number,
    genre_ids: Array(Number),
    popularity: Number,
  }),
})

const store = useStore()
const emit = defineEmits(['remove', 'add-to-cart'])

function handleAddToCart(movie) {
  emit('add-to-cart', movie)
}

function handleRemove(movie) {
  emit('remove', movie)
}

function movieIsAdded(movieId) {
  return store.getters['cart/movieIsAdded'](movieId)
}
</script>

<template>
  <div class="flex-1 text-sm divide-y divide-neutral-700">
    <div
      v-for="movie in movies"
      :key="movie.id"
      :class="['flex items-center gap-4 py-2', type !== 'checkout' && 'px-4']"
    >
      <div class="flex-1 flex items-center gap-2">
        <img
          :src="`https://image.tmdb.org/t/p/w200${movie.backdrop_path}`"
          alt="Backdrop"
          :class="['aspect-square  rounded-md', type !== 'checkout' ? 'w-10' : 'w-15']"
        />
        <p class="line-clamp-2">{{ movie.title }}</p>
      </div>
      <p>{{ formatPrice(movie.popularity) }}</p>
      <template v-if="type === 'favorites'">
        <TooltipBase v-if="!movieIsAdded(movie.id)" content="Adicionar ao carrinho">
          <button type="button" class="cursor-pointer" @click="handleAddToCart(movie)">
            <ShoppingCartIcon class="size-5 fill-lime-600" />
          </button>
        </TooltipBase>
        <TooltipBase v-else content="Produto já adicionado no carrinho">
          <button type="button" class="cursor-not-allowed">
            <ShoppingCartIconOutline class="size-5 srtoke-neutral-600" />
          </button>
        </TooltipBase>
      </template>

      <TooltipBase content="Remover filme">
        <button type="button" class="cursor-pointer" @click="handleRemove(movie)">
          <TrashIcon class="size-5 fill-neutral-600" />
        </button>
      </TooltipBase>
    </div>
    <div
      v-if="movies.length == 0"
      class="h-full flex items-center justify-center p-4 text-center text-neutral-400"
    >
      Não há filmes adicionados.
    </div>
  </div>
</template>
