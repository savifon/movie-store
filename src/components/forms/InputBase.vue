<script setup lang="js">
import { vMaska } from 'maska/vue'
import { ref } from 'vue'

defineProps({
  name: String,
  mask: String,
  placeholder: String,
  required: Boolean,
  hasError: Boolean,
})

const model = defineModel()
const unmaskedModelValue = ref()

defineExpose({ unmaskedModelValue })
</script>

<template>
  <input
    v-maska:unmaskedModelValue.unmasked="mask"
    v-model="model"
    :id="name"
    :name="name"
    :placeholder="placeholder"
    :required="required"
    @input="model = unmaskedModelValue"
    :class="[
      'w-full py-2 px-3 bg-neutral-800 border-2  text-neutral-100 placeholder:text-neutral-500 focus:outline-none rounded-sm',
      hasError ? 'border-red-400' : 'border-lime-900 focus:border-lime-600',
    ]"
  />
</template>
