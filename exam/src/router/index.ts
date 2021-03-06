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
    path: '/semesters',
    component: () => import('../views/semesters/SemestersIndex.vue')
  },
  {
    path: '/semesters/:id',
    component: () => import('../views/subjects/SubjectsIndex.vue')
  },
  {
    path: '/subjects/:id',
    component: () => import('../views/subjects/SubjectDetails.vue')
  },
  {
    path: '/submissions/:id',
    component: () => import('../views/submissions/GradeSubmission.vue')
  },
  {
    path: '/submissions/:id/create',
    component: () => import('../views/submissions/CreateSubmission.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
