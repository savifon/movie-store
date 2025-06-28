const INITIAL_DATA = {
  name: '',
  cpf: '',
  celular: '',
  email: '',
  address: {
    zipCode: '',
    address: '',
    city: '',
    state: '',
  },
}

export default {
  namespaced: true,
  state: () => ({
    checkoutData: { ...INITIAL_DATA },
  }),
  mutations: {
    UPDATE_CHECKOUT_DATA(state, payload) {
      state.checkoutData = { ...state.checkoutData, ...payload }
    },
    RESET_CHECKOUT_DATA(state) {
      state.checkoutData = { ...INITIAL_DATA }
    },
  },
  actions: {
    updateCheckoutData({ commit }, data) {
      commit('UPDATE_CHECKOUT_DATA', data)
    },
    resetCheckoutData({ commit }) {
      commit('RESET_CHECKOUT_DATA')
    },
  },
  getters: {
    checkoutData: (state) => state.checkoutData,
  },
}
