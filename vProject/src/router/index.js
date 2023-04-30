import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Return',
    component: () => import('../views/Return.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue')
  },
  {
    path: '/qa',
    name: 'qa',
    component: () => import('../views/Qa.vue')
  },
]
let history = createWebHistory();

const router = createRouter({ history, routes });

export default router
