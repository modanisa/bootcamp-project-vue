import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/views/Layout')
  },
  {
    path: '/favorite-list',
    name: 'FavoriteList',
    component: () => import('@/views/FavoriteList')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
