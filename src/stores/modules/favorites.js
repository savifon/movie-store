const FAVORITES_KEY = 'favorite-movies'

function saveToStorage(favs) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs))
}

function loadFromStorage() {
  const saved = localStorage.getItem(FAVORITES_KEY)
  return saved ? JSON.parse(saved) : []
}

export default {
  namespaced: true,
  state: () => ({
    favorites: loadFromStorage(),
  }),
  mutations: {
    TOGGLE_FAVORITE(state, movie) {
      const exists = state.favorites.find((p) => p.id === movie.id)
      if (exists) {
        state.favorites = state.favorites.filter((p) => p.id !== movie.id)
      } else {
        state.favorites.push(movie)
      }
      saveToStorage(state.favorites)
    },
  },
  actions: {
    toggleFavorite({ commit }, movie) {
      commit('TOGGLE_FAVORITE', movie)
    },
  },
  getters: {
    favorites: (state) => state.favorites,
    isFavorite: (state) => (id) => state.favorites.some((p) => p.id === id),
  },
}
