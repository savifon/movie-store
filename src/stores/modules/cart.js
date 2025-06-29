const CART_KEY = 'cart-items'

function saveToStorage(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart))
}

function loadFromStorage() {
  const saved = localStorage.getItem(CART_KEY)
  return saved ? JSON.parse(saved) : []
}

export default {
  namespaced: true,
  state: () => ({
    items: loadFromStorage(),
    isOpen: false,
  }),
  mutations: {
    ADD_TO_CART(state, movie) {
      state.items.push(movie)
      saveToStorage(state.items)
    },
    REMOVE_FROM_CART(state, id) {
      state.items = state.items.filter((item) => item.id !== id)
      saveToStorage(state.items)
    },
    CLEAR_CART(state) {
      state.items = []
      saveToStorage(state.items)
    },
    OPEN_CART(state) {
      state.isOpen = true
    },
    CLOSE_CART(state) {
      state.isOpen = false
    },
  },
  actions: {
    addToCart({ commit }, movie) {
      commit('ADD_TO_CART', movie)
    },
    removeFromCart({ commit }, id) {
      commit('REMOVE_FROM_CART', id)
    },
    clearCart({ commit }) {
      commit('CLEAR_CART')
    },
    openCart({ commit }) {
      commit('OPEN_CART')
    },
    closeCart({ commit }) {
      commit('CLOSE_CART')
    },
  },
  getters: {
    cartIsOpen: (state) => state.isOpen,
    cartItems: (state) => state.items,
    cartCount: (state) => state.items.length,
    cartTotalPrice: (state) => {
      return state.items.reduce((total, item) => {
        return total + (item.popularity || 0)
      }, 0)
    },
    movieIsAdded: (state) => (id) => state.items.some((p) => p.id === id),
  },
}
