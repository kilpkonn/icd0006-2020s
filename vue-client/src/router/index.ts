import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/auth/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/auth/Register.vue')
  },
  {
    path: '/cars',
    component: () => import('../views/cars/CarsList.vue')
  },
  {
    path: '/cars/:id',
    component: () => import('../views/cars/CarDetails.vue')
  },
  {
    path: '/cars/create',
    component: () => import('../views/cars/CarCreate.vue')
  },
  {
    path: '/types',
    component: () => import('../views/types/TypesList.vue')
  },
  {
    path: '/types/:id',
    component: () => import('../views/types/TypeDetails.vue')
  },
  {
    path: '/types/create',
    component: () => import('../views/types/TypeCreate.vue')
  },
  {
    path: '/models',
    component: () => import('../views/models/ModelsList.vue')
  },
  {
    path: '/models/:id',
    component: () => import('../views/models/ModelDetails.vue')
  },
  {
    path: '/models/create',
    component: () => import('../views/models/ModelCreate.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
