<script setup lang="js">
import ButtonBase from '@/components/forms/ButtonBase.vue'
import SidebarBase from '@/components/ui/SidebarBase.vue'
import TooltipBase from '@/components/ui/TooltipBase.vue'
import { formatPrice } from '@/utils/formats'
import { TrashIcon } from '@heroicons/vue/24/solid'
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const cartCount = computed(() => store.getters['cart/cartCount'])
const cartItems = computed(() => store.getters['cart/cartItems'])
const cartTotalPrice = computed(() => store.getters['cart/cartTotalPrice'])
const isOpen = computed({
  get() {
    return store.getters['cart/cartIsOpen']
  },
  set() {
    store.dispatch('cart/closeCart')
  },
})

function handleRemoveFromCart(movieId) {
  store.dispatch('cart/removeFromCart', movieId)
}

function handleClearCart() {
  store.dispatch('cart/clearCart')
}
</script>

<template>
  <SidebarBase v-model="isOpen">
    <div class="h-full flex flex-col">
      <div
        class="flex items-center justify-between py-3 px-6 border-b border-neutral-700 bg-neutral-800"
      >
        <h3 class="text-lg font-semibold">Meu Carrinho</h3>
        <TooltipBase content="Remover todos os filmes do carrinho">
          <button
            v-if="cartCount > 0"
            class="cursor-pointer text-sm border-b border-lime-600 text-lime-600"
            @click="handleClearCart"
          >
            Esvaziar
          </button>
        </TooltipBase>
      </div>

      <div class="flex-1 text-sm divide-y divide-neutral-800">
        <div
          v-for="movie in cartItems"
          :key="movie.id"
          class="flex items-center gap-4 py-2 px-4"
        >
          <div class="flex-1 flex items-center gap-2">
            <img
              :src="`https://image.tmdb.org/t/p/w200${movie.backdrop_path}`"
              alt="Backdrop"
              class="aspect-square w-10 rounded-md"
            />
            <p class="line-clamp-2">{{ movie.title }}</p>
          </div>
          <p>{{ formatPrice(movie.popularity) }}</p>
          <TooltipBase content="Remover do carrinho">
            <button
              type="button"
              class="cursor-pointer"
              @click="handleRemoveFromCart(movie.id)"
            >
              <TrashIcon class="size-5 fill-lime-600" />
            </button>
          </TooltipBase>
        </div>
        <div
          v-if="cartCount == 0"
          class="h-full flex items-center justify-center p-4 text-center text-neutral-400"
        >
          Não há filmes adicionados no carrinho.
        </div>
      </div>

      <div class="space-y-4 p-6 border-t border-neutral-700 bg-neutral-800">
        <div class="flex items-center justify-between gap-2">
          <p class="">Total:</p>
          <p class="font-semibold text-lg">
            {{ formatPrice(cartTotalPrice) }}
          </p>
        </div>
        <ButtonBase text="Finalizar compra" :disabled="cartCount == 0" />
      </div>
    </div>
  </SidebarBase>
</template>
