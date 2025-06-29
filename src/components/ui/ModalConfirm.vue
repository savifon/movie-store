<script setup lang="js">
import ModalBase from '@/components/ui/ModalBase.vue'
import ButtonBase from '@/components/forms/ButtonBase.vue'

const isOpen = defineModel()
const emit = defineEmits(['confirm', 'cancel'])

function handleConfirm() {
  emit('confirm')
}

function handleCancel() {
  emit('cancel')
}
</script>

<template>
  <ModalBase v-model="isOpen">
    <div class="flex flex-col text-center items-center gap-5 sm:gap-10">
      <h3 class="text-3xl font-semibold text-lime-600">Confirme sua ação</h3>
      <p>Deseja prosseguir com esta ação?</p>
      <div class="w-full grid grid-cols-2 gap-4">
        <ButtonBase type="button" text="Não" isSecondaryButton @click="handleCancel" />
        <ButtonBase type="button" text="Sim" @click="handleConfirm" />
      </div>
    </div>
  </ModalBase>
</template>
