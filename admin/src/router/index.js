import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CateList from '../views/CateList.vue'
import ItemsEdit from '../views/items/ItemsEdit.vue'
import ItemsList from '../views/items/ItemsList.vue'
import HeroList from '../views/hero/HeroList.vue'
import HeroEdit from '../views/hero/HeroEdit.vue'
import articleEdit from '../views/article/articleEdit.vue'
import articleList from '../views/article/articleList.vue'
import UserEdit from '../views/user/UserEdit.vue'
import UserList from '../views/user/UserList.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
    meta: { isPublic: true }
  },
  {
    path: '/',
    name: 'Main',
    component: Main,
    redirect: '/categories/create',
    children: [
      // 分类
      {
        path: '/categories/create',
        name: 'createcate',
        component: CategoryEdit
      },

      {
        path: '/categories/list',
        name: 'catelist',
        component: CateList
      },
      //物品
      {
        path: '/items/create',
        name: 'createitems',
        component: ItemsEdit
      },
      {
        path: '/items/list',
        name: 'itemslist',
        component: ItemsList
      },
      // 英雄
      {
        path: '/hero/create',
        name: 'createhero',
        component: HeroEdit
      },
      {
        path: '/hero/list',
        name: 'herolist',
        component: HeroList
      },
      // 文章
      {
        path: '/article/create',
        name: 'createarticle',
        component: articleEdit
      },
      {
        path: '/article/list',
        name: 'articlelist',
        component: articleList
      },
      //管理员
      {
        path: '/user/create',
        name: 'createuser',
        component: UserEdit
      },
      {
        path: '/user/list',
        name: 'userlist',
        component: UserList
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

//前端的页面校验  没有token和ispulic不允许进入除登录外的其他页面
router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.getItem('token')) {
    return next('/login')
  }
  next()
})

export default router
