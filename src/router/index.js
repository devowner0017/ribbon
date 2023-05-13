import { createRouter, createWebHistory } from 'vue-router'
import { Question_One, Question_Two, Question_Three, Question_Four } from '../views/question'
import Upbeat from '../views/question/Upbeat.vue';
import Home from '../views/Home.vue';
import Four_continue from '../views/question/Four_continue.vue';
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
      path: '/questions/4',
      name: 'question4',
      component: Question_Four
    },
    {
      path: '/questions/3/upbeat',
      name: 'upbeat',
      component: Upbeat,
    },
    {
      path: '/questions/4/continue',
      name:'continue',
      component: Four_continue,
    }
  ]
})

export default router
