import { createStore } from 'vuex'
import movies from '@/stores/modules/movies'
import cart from '@/stores/modules/cart'
import favorites from '@/stores/modules/favorites'
import loading from '@/stores/modules/loading'
import zipCode from '@/stores/modules/zipCode'
import errors from '@/stores/modules/errors'

const store = createStore({
  modules: {
    movies,
    cart,
    favorites,
    loading,
    zipCode,
    errors,
  },
})

export default store
