import Vue from 'vue'
import Vuex from 'vuex'
import city from './city'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isShowMovieMenu: true
  },
  mutations: {
    controlMovieMenu(state, flag){
      state.isShowMovieMenu = flag;
    }
  },
  actions: {
  },
  modules: {
    city
  }
})
