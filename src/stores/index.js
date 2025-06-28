import { createStore } from 'vuex'
import movies from '@/stores/modules/movies'
import cart from '@/stores/modules/cart'
import favorites from '@/stores/modules/favorites'
import user from '@/stores/modules/user'
import loading from '@/stores/modules/loading'

const store = createStore({
  modules: {
    movies,
    cart,
    favorites,
    user,
    loading,
  },
})

export default store
