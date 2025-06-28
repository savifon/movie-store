<script setup lang="js">
import { formatDate } from '@/utils/date'
import { HeartIcon, StarIcon } from '@heroicons/vue/24/solid'
import ButtonBase from '@/components/forms/ButtonBase.vue'

defineProps({
  isFavorite: Boolean,
  movie: Object({
    id: Number,
    imageUrl: String,
    releaseDate: String,
    name: String,
    rate: Number,
    genres: Array(String),
    price: Number,
  }),
})
</script>

<template>
  <div
    class="flex flex-col bg-neutral-900 border border-lime-600 hover:border-lime-500 rounded-sm shadow-neutral-900 shadow-md hover:shadow-xl transition-all"
  >
    <div class="relative bg-blue-400">
      <img
        :src="`${movie.imageUrl}`"
        alt="movie poster"
        class="aspect-[2/2.3] bg-red-400"
      />
      <HeartIcon
        :class="[
          'absolute top-2 right-2 size-10',
          isFavorite ? 'fill-lime-600' : 'fill-neutral-200/20',
        ]"
      />
      <span class="absolute bottom-2 w-full text-center">
        {{ formatDate(movie.releaseDate) }}
      </span>
    </div>
    <div class="flex-1 text-center space-y-1 p-3">
      <h3 class="text-xl font-semibold line-clamp-2 leading-6 h-12">{{ movie.name }}</h3>
      <div class="flex items-center justify-center gap-3">
        <div class="flex items-center gap-1">
          <StarIcon class="size-6 fill-amber-400" />
          <p class="text-lg font-semibold">{{ movie.rate }}</p>
        </div>
        <p>{{ movie.genres[0] }}</p>
      </div>
      <p class="text-lg">R$ {{ movie.price }}</p>
    </div>
    <ButtonBase text="Adicionar" type="button" />
  </div>
</template>
