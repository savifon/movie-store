<script setup lang="js">
const isOpen = defineModel()

function closeSidebar() {
  isOpen.value = false
}
</script>

<template>
  <div>
    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        @click="closeSidebar"
        class="fixed inset-0 bg-neutral-950/80 bg-opacity-50 z-40"
      ></div>
    </Transition>

    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="transform translate-x-full"
      enter-to-class="transform translate-x-0"
      leave-active-class="transition ease-in duration-300"
      leave-from-class="transform translate-x-0"
      leave-to-class="transform translate-x-full"
    >
      <div
        v-if="isOpen"
        class="fixed top-0 right-0 h-full w-80 bg-neutral-900 border-l border-lime-500 shadow-2xl z-50 overflow-y-auto"
      >
        <slot />
      </div>
    </Transition>
  </div>
</template>
