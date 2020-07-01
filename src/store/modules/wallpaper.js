
const state = () => ({
  isMobile: null,
  bg: "",
  bgMotion: "",
  bgSpeed: "",
  bgAngle: "",
  count: 0,
  message: "asergasgf"
})

// getters
const getters = {
  cartProducts: (state, getters, rootState) => {
    return "something"
  },
}

// actions
const actions = {
  checkout ({ commit, state }, products) {
    const savedCartItems = [...state.items]
    commit('setCheckoutStatus', null)
  }
}

// mutations
const mutations = {
  mutName (state, { varName }) {
    state.var = varName
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
