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
  },
  actions: {
    addToCart({ commit }, movie) {
      commit('ADD_TO_CART', movie)
    },
    removeFromCart({ commit }, id) {
      commit('REMOVE_FROM_CART', id)
    },
  },
  getters: {
    cartItems: (state) => state.items,
    cartCount: (state) => state.items.length,
  },
}
