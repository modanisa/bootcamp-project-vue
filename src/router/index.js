import Vue from 'vue'
import VueRouter from 'vue-router'
import ProductDetail from "@/views/ProductDetail";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/views/Layout')
  },
  {
    path: '/:slug',
    name: 'ProductDetail',
    component: () => import('@/views/ProductDetail'),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
