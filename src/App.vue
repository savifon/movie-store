<script setup lang="js">
import HeaderNavbar from '@/components/ui/HeaderNavbar.vue'
import LoadingOverlay from '@/components/ui/LoadingOverlay.vue'
import ErrorDisplay from '@/components/ui/ErrorDisplay.vue'
</script>

<template>
  <LoadingOverlay />
  <ErrorDisplay />
  <HeaderNavbar />
  <main class="w-11/12 sm:w-10/12 py-6 sm:py-10 mx-auto">
    <RouterView />
  </main>
</template>
