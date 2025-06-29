<script setup lang="js">
defineProps({
  text: String,
  type: String('button' | 'submit'),
  isSecondaryButton: Boolean,
})
</script>

<template>
  <button
    :type="type"
    :class="[
      'w-full cursor-pointer rounded-sm sm:text-lg font-medium border-2  hover:bg-lime-800 disabled:cursor-not-allowed disabled:opacity-50 py-3 px-6 transition-all',
      isSecondaryButton
        ? 'bg-transparent border-lime-600'
        : 'border-transparent bg-lime-600',
    ]"
  >
    {{ text }}
  </button>
</template>
