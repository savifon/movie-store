<script setup lang="js">
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import MovieItem from '@/components/movies/MovieItem.vue'
import { useInfiniteScroll } from '@/composables/useInfiniteScroll'

const store = useStore()
const genres = computed(() => store.getters['movies/genres'])
const movies = computed(() => store.getters['movies/movies'])
const query = computed(() => store.getters['movies/query'])
const currentPage = computed(() => store.getters['movies/currentPage'])
const infiniteScroll = useInfiniteScroll(handleGetMovies)

function getMovieGenres(movie) {
  const movieGenresData = genres.value.filter((genre) =>
    movie.genre_ids.includes(genre.id),
  )
  return movieGenresData.map((genre) => genre.name)
}

function handleIsFavorite(movie) {
  return store.getters['favorites/isFavorite'](movie.id)
}

function handleAddToCart(movie) {
  store.dispatch('cart/addToCart', movie)
}

function handleToggleFavorite(movie) {
  store.dispatch('favorites/toggleFavorite', movie)
}

async function handleGetMovies(isFirstRequest = false, page = currentPage.value + 1) {
  store.dispatch('movies/setPage', { page: page })
  if (query.value === '') {
    await store.dispatch('movies/fetchMovies', {
      isFirstRequest,
      page: currentPage.value,
    })
  } else {
    await store.dispatch('movies/fetchMoviesByTitle', {
      query: query.value,
      isFirstRequest,
      page: currentPage.value,
    })
  }
}

onMounted(async () => {
  await store.dispatch('movies/fetchGenres')
  await handleGetMovies(true, 1)
})
</script>

<template>
  <div
    v-if="movies.length > 0"
    class="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 xl:gap-10"
  >
    <MovieItem
      v-for="movie in movies"
      :key="movie.id"
      :movie="movie"
      :is-favorite="handleIsFavorite(movie)"
      :genres="getMovieGenres(movie)"
      @add-to-cart="handleAddToCart"
      @toggle-favorite="handleToggleFavorite"
    />
  </div>
  <p v-else class="text-neutral-400">Não foi possível carregar os filmes.</p>
</template>
