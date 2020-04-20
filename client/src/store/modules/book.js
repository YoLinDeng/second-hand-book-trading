import * as types from '../mutation-types'

const state = {
  queryName: ''
}

const getters = {
}

const actions = {
  // changeHistroyBookName ({ commit }, params) {
  // },
}

const mutations = {
  [types.RECORD_BOOK_QUERYNAME] (state, name) {
    state.queryName = name
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
