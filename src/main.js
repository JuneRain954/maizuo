import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入mint-ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
//引入v-touch
import VueTouch from 'vue-touch'

//把Loading组件注册成全局组件
import Loading from '@/components/Loading'
Vue.component('Loading', Loading)

// 把Loader组件注册成全局组件
import Loader from '@/components/Loader';
Vue.component('Loader', Loader);

Vue.config.productionTip = false

Vue.use(MintUI)
Vue.use(VueTouch, {name: 'v-touch'})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
