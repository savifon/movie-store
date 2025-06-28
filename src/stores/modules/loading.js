export default {
  namespaced: true,
  state: () => ({
    count: 0,
  }),
  mutations: {
    START_LOADING(state) {
      state.count++
    },
    STOP_LOADING(state) {
      state.count--
    },
    STOP_ALL_LOADINGS(state) {
      state.count = 0
    },
  },
  actions: {
    startLoading({ commit }) {
      commit('START_LOADING')
    },
    stopLoading({ commit }) {
      console.log('aquiii')
      commit('STOP_LOADING')
    },
    stopAllLoadings({ commit }) {
      commit('STOP_ALL_LOADINGS')
    },
  },
  getters: {
    count: (state) => state.count,
  },
}
