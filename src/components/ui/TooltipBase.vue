<script setup lang="js">
import Popper from 'vue3-popper'

defineProps({
  content: String,
})
</script>

<template>
  <Popper :hover="true" placement="bottom" class="border-none mx-0">
    <slot></slot>
    <template v-if="content" #content>
      <div
        class="text-xs rounded-md border border-lime-600 px-2 py-1 bg-lime-950/50 backdrop-blur-lg"
      >
        {{ content }}
      </div>
    </template>
  </Popper>
</template>
