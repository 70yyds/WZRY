import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import(/* webpackChunkName: "Moba" */ '@/views/Main'),
    redirect: '/Home',
    children: [
      {
        path: '/Home',
        name: 'Home',
        component: () => import(/* webpackChunkName: "Moba" */ '@/views/home/Home'),
      },
      {
        path: '/Match',
        name: 'Match',
        component: () => import(/* webpackChunkName: "Moba" */ '@/views/match/Match'),
      },
      {
        path: '/Some',
        name: 'Some',
        component: () => import(/* webpackChunkName: "Moba" */ '@/views/some/Some'),
      },
    ]
  },

]

const router = new VueRouter({
  routes
})

export default router
