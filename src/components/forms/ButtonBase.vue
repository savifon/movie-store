<script setup lang="js">
defineProps({
  text: String,
  type: String('button' | 'submit'),
})
</script>

<template>
  <button
    type="button"
    class="w-full cursor-pointer rounded-sm text-lg font-medium bg-lime-600 hover:bg-lime-800 disabled:cursor-not-allowed disabled:opacity-50 py-3 px-6 transition-all"
  >
    {{ text }}
  </button>
</template>
