import apiConfig from './api_config'
import axios from 'axios'
import * as types from '@/store/mutation-types'
import store from '@/store'
import Vue from 'vue';
import { Notify } from 'vant';

Vue.use(Notify);
const obj = {}
for(let i in apiConfig) {
  let config = apiConfig[i]
  obj[i] = (params) => {
    return new Promise((resolve, reject) => {
      let opt = {
        method: config.method || 'get',
        url:config.url
      }
      if (config.method === 'post') {
        opt.data = params
      } else {
        opt.params = params
      }
      store.commit(types.SHOW_LOADING)
      axios(opt).then(res => {
        if (res.data.code === '0000') {
          store.commit(types.HIDE_LOADING)
          resolve(res.data)
        } else {
          store.commit(types.HIDE_LOADING)
          Notify({ type: 'warning', message: res.data.message});
          reject(res.data)
        }
      }).catch(() => {
        store.commit(types.HIDE_LOADING)
        Notify({ type: 'danger', message: '网络异常，请稍后'});
      })
    })
  }
}
export default obj