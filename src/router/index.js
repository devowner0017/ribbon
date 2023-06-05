import { createRouter, createWebHistory } from 'vue-router'
import { First_Question, Second_Question, Third_Question_Draft1, Fourth_Question, Draft2, Draft3, Draft_More, Done } from '../views/generate';
import Home from '../views/Home.vue';
const router = createRouter({
 
  routes: [
    {
      paht: '/',
      name: "Home",
      component: Home,
    },
    {
      path: '/questions/1',
      name: 'question1',
      component: First_Question,
    },
    {
      path: '/questions/2',
      name: 'question2',
      component: Second_Question,
      props: (route) => ({ question1: route.query.question1 })
    },
    {
      path: '/questions/3/draft2/:question',
      name: 'draft2',
      component: Draft2,
      props: (route) => ({
        question1: route.query.question1,
        question2: route.query.question2,
        question3: route.query.question3,
      })
    },
    {
      path: '/questions/3',
      name: 'question3',
      component: Third_Question_Draft1,
      props: (route) => ({
        question1: route.query.question1,
        question2: route.query.question2,
      })
    },
    {
      path: '/questions/4',
      name: 'question4',
      component: Fourth_Question,
      props: (route) => ({
        question1: route.query.question1,
        question2: route.query.question2,
        question3: route.query.question3,
      })
    },
    {
      path: '/questions/4/draft3/:selected',
      name: 'draft3',
      component: Draft3,
      props: (route) => ({
        question1: route.query.question1,
        question2: route.query.question2,
        question3: route.query.question3,
      })
    },
    {
      path: '/generate_three_version',
      name: 'generate',
      component: Draft_More,
      props: (route) => ({
        question1: route.query.question1,
        question2: route.query.question2,
        question3: route.query.question3,
        question4: route.query.question4,
      })
    },
    {
      path: '/done/:selected',
      name: 'done',
      props: (route) => ({
        question3: route.query.question3,
        question4: route.query.question4,
      }),
      component: Done,
    }
  ]
})

export default router
