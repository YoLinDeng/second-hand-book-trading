import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import 'lib-flexible/flexible'
import Vant from 'vant'
import 'vant/lib/index.css'
import API from '@/api/api.js'
Vue.prototype.API = API
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
