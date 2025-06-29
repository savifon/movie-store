<script setup lang="js">
import { watch } from 'vue'

const isOpen = defineModel()

const closeModal = () => {
  isOpen.value = false
}

watch(isOpen, () => {
  if (isOpen.value) {
    document.body.style.overflowY = 'hidden'
  } else {
    document.body.style.overflowY = 'auto'
  }
})
</script>

<template>
  <Transition
    enter-active-class="transition ease-out duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition ease-in duration-200"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isOpen"
      @click.self="closeModal"
      class="fixed inset-0 bg-neutral-950/80 z-50 flex items-center justify-center"
    >
      <Transition
        enter-active-class="transition ease-out duration-300"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <div
          v-if="isOpen"
          class="bg-neutral-900 rounded-md shadow-xl max-w-md w-full max-h-screen overflow-y-auto p-10"
        >
          <slot></slot>
        </div>
      </Transition>
    </div>
  </Transition>
</template>
