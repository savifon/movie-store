<script setup lang="js">
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import MovieItem from '@/components/movies/MovieItem.vue'

const store = useStore()

const genres = computed(() => store.getters['movies/genres'])
const movies = computed(() => store.getters['movies/movies'])

function getMovieGenres(movie) {
  const movieGenresData = genres.value.filter((genre) =>
    movie.genre_ids.includes(genre.id),
  )
  return movieGenresData.map((genre) => genre.name)
}

function isFavorite(movie) {
  return store.getters['favorites/isFavorite'](movie.id)
}

function handleAddToCart(movie) {
  store.dispatch('cart/addToCart', movie)
}

function handleToggleFavorite(movie) {
  store.dispatch('favorites/toggleFavorite', movie)
}

onMounted(async () => {
  await store.dispatch('movies/fetchGenres')
  await store.dispatch('movies/fetchMovies', { page: 1 })
})
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-10">
    <MovieItem
      v-for="movie in movies"
      :key="movie.id"
      :movie="movie"
      :is-favorite="isFavorite(movie)"
      :genres="getMovieGenres(movie)"
      @add-to-cart="handleAddToCart"
      @toggle-favorite="handleToggleFavorite"
    />
  </div>
</template>
