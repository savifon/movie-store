<script setup lang="js">
import { formatDate, formatPrice } from '@/utils/formats'
import { HeartIcon, StarIcon } from '@heroicons/vue/24/solid'
import { computed } from 'vue'
import ButtonBase from '@/components/forms/ButtonBase.vue'

const props = defineProps({
  isFavorite: Boolean,
  genres: Array,
  movie: Object({
    id: Number,
    backdrop_path: String,
    release_date: String,
    title: String,
    vote_average: Number,
    genre_ids: Array(Number),
    popularity: Number,
  }),
})
const emit = defineEmits(['add-to-cart', 'toggle-favorite'])

function handleAddToCart(movie) {
  emit('add-to-cart', movie)
}

function handleToggleFavorite(movie) {
  emit('toggle-favorite', movie)
}

function getFormattedGenres(genres) {
  const total_genres = genres.length
  return `${genres[0]} +${total_genres - 1}`
}

const movieBackdrop = computed(
  () => `https://image.tmdb.org/t/p/w500${props.movie.backdrop_path}`,
)
</script>

<template>
  <div
    class="group flex flex-col bg-neutral-900 border border-lime-600 hover:border-lime-500 rounded-sm shadow-neutral-900 shadow-md hover:shadow-xl transition-all"
  >
    <div class="relative rounded-t-sm overflow-hidden">
      <div
        class="aspect-[2/2.3] bg-cover group-hover:scale-[1.1] bg-center transition-all"
        :style="{ backgroundImage: `url(${movieBackdrop})` }"
      ></div>
      <button
        type="button"
        class="absolute top-2 right-2 size-8"
        @click="handleToggleFavorite(movie)"
      >
        <HeartIcon
          :class="[isFavorite ? 'fill-lime-600' : 'stroke-lime-600/50 fill-transparent']"
        />
      </button>
      <div
        class="absolute bottom-0 pb-2 pt-4 w-full text-sm text-center bg-linear-to-t from-neutral-950/80 to-transparent"
      >
        <span>
          {{ formatDate(movie.release_date) }}
        </span>
      </div>
    </div>
    <div class="flex-1 text-center space-y-1 p-3">
      <h3 class="text-lime-500 text-xl font-semibold line-clamp-2 leading-6 h-12">
        {{ movie.title }}
      </h3>
      <div class="flex items-center justify-center gap-3">
        <div class="flex items-center gap-1">
          <StarIcon class="size-5 fill-amber-400" />
          <p class="text-lg font-semibold text-neutral-500">
            {{ Math.trunc(movie.vote_average) }}
          </p>
        </div>
        <p class="text-neutral-500 text-sm">{{ getFormattedGenres(genres) }}</p>
      </div>
      <p class="text-lg">{{ formatPrice(movie.popularity) }}</p>
    </div>
    <ButtonBase text="Adicionar" type="button" @click="handleAddToCart(movie)" />
  </div>
</template>
