import * as types from '../mutation-types'

const state = {
  loading: false
}

const getters = {
  loading: state => state.loading,
}

const actions = {
  // changeHistroyBookName ({ commit }, params) {
  // },
}

const mutations = {
  [types.SHOW_LOADING] (state) {
    state.loading = true
  },
  [types.HIDE_LOADING] (state) {
    state.loading = false
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
