<script setup lang="js">
import ModalBase from '@/components/ui/ModalBase.vue'
import ButtonBase from '@/components/forms/ButtonBase.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const isOpen = computed({
  get() {
    return !!store.getters['errors/error']
  },
  set(newValue) {
    if (!newValue) {
      store.dispatch('errors/clearError')
    }
    isOpen.value = newValue
  },
})
const error = computed(() => store.getters['errors/error'])

function handleClose() {
  isOpen.value = false
}
</script>

<template>
  <ModalBase v-model="isOpen">
    <div class="flex flex-col text-center items-center gap-5 sm:gap-10">
      <div>
        <h3 class="text-3xl font-semibold text-red-500">Houve um erro! :'(</h3>
        <span class="text-sm text-neutral-700">({{ error }})</span>
      </div>
      <p>Verifique o motivo acima ou tente novamente mais tarde.</p>
      <ButtonBase type="button" text="OK" @click="handleClose" />
    </div>
  </ModalBase>
</template>
