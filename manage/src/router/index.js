import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/Home.vue')
const login = () => import('../components/login.vue')
const Welcome = () => import('../components/Welcome.vue')
const Users = () => import('../components/user/Users.vue')
const bookList = () => import('../components/books/bookList.vue')
const Cate = () => import('../components/books/Cate.vue')
const Order = () => import('../components/order/Order.vue')
const evaluationList = () => import('../components/evaluation/evaluationList.vue')
const News = () => import('../components/news/News.vue')
const Admins = () => import('../components/user/Admins.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/', redirect: 'login'
  },
  {
    path: '/login', component: login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/Welcome',
    children: [
      {
        path: '/Welcome', component: Welcome
      },
      {
        path: '/users', component: Users
      },
      {
        path: '/bookList', component: bookList
      },
      {
        path: '/categories', component: Cate
      },
      {
        path: '/Order', component: Order
      },
      {
        path: '/evaluationList', component: evaluationList
      },
      {
        path: '/News', component: News
      },
      {
        path: '/administrators', component: Admins
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
