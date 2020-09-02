import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入mint-ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
//把Loading组件注册成全局组件
import Loading from '@/components/Loading'
Vue.component('Loading', Loading)

Vue.config.productionTip = false
Vue.use(MintUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
