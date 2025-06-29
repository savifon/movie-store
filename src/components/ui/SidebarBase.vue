<script setup lang="js">
import TooltipBase from '@/components/ui/TooltipBase.vue'

defineProps({
  title: String,
  itemCount: Number,
})

const emit = defineEmits(['clear'])
const isOpen = defineModel()

function handleClear() {
  emit('clear')
}

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
        <div class="h-full flex flex-col">
          <div
            class="flex items-center justify-between py-3 px-4 border-b border-neutral-700 bg-neutral-800"
          >
            <h3 class="text-lg font-semibold">{{ title }}</h3>
            <TooltipBase content="Remover todos os filmes">
              <button
                v-if="itemCount > 0"
                class="cursor-pointer text-sm border-b border-lime-600 text-lime-600"
                @click="handleClear"
              >
                Esvaziar
              </button>
            </TooltipBase>
          </div>

          <slot></slot>
        </div>
      </div>
    </Transition>
  </div>
</template>
