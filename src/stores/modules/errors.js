export default {
  namespaced: true,
  state: () => ({
    error: '',
  }),
  mutations: {
    SET_ERROR(state, error) {
      state.error = error
    },
    CLEAR_ERROR(state) {
      state.error = ''
    },
  },
  actions: {
    setError({ commit }, error) {
      commit('SET_ERROR', error)
    },
    clearError({ commit }) {
      commit('CLEAR_ERROR')
    },
  },
  getters: {
    error: (state) => state.error,
  },
}
