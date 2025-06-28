<script setup lang="js">
defineProps({
  text: String,
  type: String('button' | 'submit'),
})
</script>

<template>
  <button
    type="button"
    class="w-full text-lg font-medium bg-lime-600 hover:bg-lime-500 text-shadow-neutral-900 py-3 px-6 transition-all"
  >
    {{ text }}
  </button>
</template>
