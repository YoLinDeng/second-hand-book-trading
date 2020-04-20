import apiConfig from './api_config'
import axios from 'axios'
import { Message } from 'element-ui';

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
      axios(opt).then(res => {
        if (res.data.code === '0000') {
          resolve(res.data)
          opt.method === 'post' && Message({
            message: res.data.message,
            type: 'success'
          })
        } else {
          reject(res.data)
          Message({
            message: res.data.message,
            type: 'warning'
          })
        }
      }).catch(() => {
        Message.error('网络错误!')
      })
    })
  }
}
export default obj

// 用法
// this.API.login.({ adminName: 'admin', password: '123456' }).then(res => { }).catch(err => {})