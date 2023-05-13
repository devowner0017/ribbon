import { createRouter, createWebHistory } from 'vue-router'
import { Question_One, Question_Two, Question_Three } from '../views/question'

import Home from '../views/Home.vue';
import Upbeat from '../views/question/Upbeat.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  mode: 'history',
  base: '/questions/1',
  routes: [
    {
      paht: '/',
      name: "Home",
      component: Home,
    },
    {
      path: '/questions/1',
      name: 'question1',
      component: Question_One
    },
    {
      path: '/questions/2',
      name: 'question2',
      component: Question_Two
    },
    {
      path: '/questions/3',
      name: 'question3',
      component: Question_Three
    },
    {
      path: '/questions/3/upbeat',
      name: 'upbeat',
      component: Upbeat
    },
  ]
})

export default router
