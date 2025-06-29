<script setup lang="js">
import { useStore } from 'vuex'
import { computed } from 'vue'
import { ArrowPathIcon } from '@heroicons/vue/24/outline'

const store = useStore()
const countLoading = computed(() => {
  const count = store.getters['loading/count']

  if (count > 0) {
    document.body.style.overflowY = 'hidden'
  } else {
    document.body.style.overflowY = 'auto'
  }

  return count
})
</script>

<template>
  <div
    v-if="countLoading > 0"
    class="w-[100vw] h-[100vh] flex items-center justify-center fixed z-50 bg-neutral-950/50"
  >
    <ArrowPathIcon class="size-20 stroke-lime-600 animate-spin" />
  </div>
</template>
