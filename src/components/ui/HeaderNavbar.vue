<script setup lang="js">
import { HeartIcon, MagnifyingGlassIcon, ShoppingCartIcon } from '@heroicons/vue/24/solid'
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
        <HeartIcon class="fill-lime-500 size-10" />
        <ShoppingCartIcon class="fill-lime-500 size-10" />
      </div>
    </div>
  </header>
</template>
