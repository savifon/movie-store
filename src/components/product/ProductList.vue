<script setup lang="js">
import { mockMovies } from '../../../__mocks__/movies'
import ProductItem from '@/components/product/ProductItem.vue'
</script>

<template>
  <h2>Lista de produtos</h2>
  <!-- <div class="grid grid-cols-2 md:grid-cols-4 gap-4"> -->
  <div class="grid grid-cols-2 md:grid-cols-4 gap-10">
    <ProductItem
      v-for="movie in mockMovies"
      :key="movie.id"
      :movie="movie"
      :is-favorite="false"
    />
    <!-- :is-favorite="favorites.includes(movie.id)" -->
    <!-- @add-to-cart="addToCart" -->
    <!-- @toggle-fav="toggleFavorite" -->
  </div>
</template>
