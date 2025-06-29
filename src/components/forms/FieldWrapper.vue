<script setup lang="js">
defineProps({
  id: String,
  label: String,
  error: String,
})
</script>

<template>
  <div>
    <label
      :for="id"
      :class="['mb-1 flex', error ? 'text-red-400' : 'text-shadow-neutral-800']"
    >
      {{ label }}
    </label>

    <slot></slot>

    <span v-if="error" class="text-red-400">
      {{ error }}
    </span>
  </div>
</template>
