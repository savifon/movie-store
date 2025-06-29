<script setup lang="js">
import ModalBase from '@/components/ui/ModalBase.vue'
import ButtonBase from '../forms/ButtonBase.vue'

const isOpen = defineModel()
const emit = defineEmits(['close'])

defineProps({
  clientName: String,
})
</script>

<template>
  <ModalBase v-model="isOpen">
    <div class="flex flex-col items-center gap-10">
      <h3 class="text-3xl font-semibold text-lime-600">
        Obrigado {{ clientName.split(' ')[0] }}!
      </h3>
      <p>Sua compra foi finalizada com sucesso!</p>
      <RouterLink to="/" @click="emit('close')">
        <ButtonBase type="button" text="Ir para a loja" />
      </RouterLink>
    </div>
  </ModalBase>
</template>
