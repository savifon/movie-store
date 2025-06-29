import viacep from '@/services/viacep'

export default {
  namespaced: true,
  state: () => ({
    address: {},
  }),
  mutations: {
    SET_ADDRESS(state, address) {
      state.address = address
    },
  },
  actions: {
    async fetchAddress({ dispatch, commit }, cep) {
      dispatch('loading/startLoading', null, { root: true })
      try {
        const response = await viacep.getAddressByCep(cep)
        commit('SET_ADDRESS', response.data)
      } catch (error) {
        dispatch('errors/setError', error.message, { root: true })
      }
      dispatch('loading/stopLoading', null, { root: true })
    },
  },
  getters: {
    address: (state) => state.address,
  },
}
