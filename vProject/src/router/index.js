import { createRouter, createWebHistory } from 'vue-router'

import Return from '@/views/Return.vue';
import About from '@/views/About.vue';
import Qa from '@/views/Qa.vue';

const routes = [
  {
    path: '/',
    name: 'Return',
    component: Return
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/qa',
    name: 'Qa',
    component: Qa
  },
]
let history = createWebHistory();

const router = createRouter({ history, routes });

export default router
