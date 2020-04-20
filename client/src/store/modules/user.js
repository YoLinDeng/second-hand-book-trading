import * as types from '../mutation-types'

const state = {
  token: null,
  info: {}
}

const getters = {
}

const actions = {
}

const mutations = {
  [types.RECORD_USER_TOKEN] (state, token) {
    state.token = token
  },
  [types.RECORD_USER_INFO] (state, info) {
    state.info = info
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
