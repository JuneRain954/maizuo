import Vue from 'vue'
import VueRouter from 'vue-router'
import movieRouter from './movie'
import mineRouter from './mine'
import cinemaRouter from './cinema'

Vue.use(VueRouter)

  const routes = [
    movieRouter,
    mineRouter,
    cinemaRouter,
    {
      // 重定向，当网址与上面三个路由不匹配时重定向到/movie/nowPlaying
      path: '/*',
      redirect: '/movie/nowPlaying'
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
