import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import book from './modules/book'
import loading from './modules/loading'

Vue.use(Vuex)

const plugin = store => {
  const storage = window.sessionStorage
  for (let i = 0, length = storage.length; i < length; i++) {
    if (storage.key(i).indexOf('bookClient') === 0) {
      const _keys = storage.key(i).split('_')
      _keys.shift()
      let value = storage.getItem(storage.key(i))
      try {
        value = JSON.parse(value)
      } catch (error) {
        // console.log(value + ', value might be a string')
      }
      store.state[_keys.shift()][_keys.join('_')] = value
    }
  }
  store.subscribe(({ type, payload }) => {
    if (type.indexOf('record') > -1 && payload !== undefined) {
      const key = type.indexOf('/') === -1 ? type : type.split('/')[1]
      storage.setItem(key.replace('record', 'bookClient'), typeof payload === 'string' ? payload : JSON.stringify(payload))
    }
  })
}

export default new Vuex.Store({
  modules: {
    user,
    book,
    loading
  },
  plugins: [plugin]
})