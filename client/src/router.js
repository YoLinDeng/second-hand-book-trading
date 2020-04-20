import Vue from 'vue'
import Router from 'vue-router'

const Index = () => import('@/views/Index')
const Login = () => import('@/views/Login')
const Register = () => import('@/views/Register')
const Search = () => import('@/views/Search')
const SearchResult = () => import('@/views/SearchResult')
const Car = () => import('@/views/Car')
const Home = () => import('@/views/person/Home')
const PersonInfo = () => import('@/views/person/PersonInfo')
const SuperPraise = () => import('@/views/person/SuperPraise')
const FollowPage = () => import('@/views/person/FollowPage')
const FansPage = () => import('@/views/person/FansPage')
const MyPublish = () => import('@/views/person/MyPublish')
const MySell = () => import('@/views/person/MySell')
const MyBuy = () => import('@/views/person/MyBuy')
const Collection = () => import('@/views/person/Collection')
const LookHistory = () => import('@/views/person/LookHistory')
const UserInfoPage = () => import('@/views/person/UserInfoPage')
const OrderDetail = () => import('@/views/person/OrderDetail')
const Publish = () => import('@/views/Publish')
const EditPage = () => import('@/views/person/EditPage')
const BookDetail = () => import('@/views/BookDetail')
const ConfirmOrder = () => import('@/views/ConfirmOrder')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/searchResult',
      name: 'searchResult',
      component: SearchResult
    },
    {
      path: '/bookDetail',
      name: 'bookDetail',
      component: BookDetail
    },
    {
      path: '/orderDetail',
      name: 'orderDetail',
      component: OrderDetail
    },
    {
      path: '/confirmOrder',
      name: 'confirmOrder',
      component: ConfirmOrder
    },
    {
      path: '/car',
      name: 'car',
      component: Car
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/personInfo',
      name: 'personInfo',
      component: PersonInfo
    },
    {
      path: '/superPraise',
      name: 'superPraise',
      component: SuperPraise
    },
    {
      path: '/followPage',
      name: 'followPage',
      component: FollowPage
    },
    {
      path: '/fansPage',
      name: 'fansPage',
      component: FansPage
    },
    {
      path: '/editPage',
      name: 'editPage',
      component: EditPage
    },
    {
      path: '/myPublish',
      name: 'myPublish',
      component: MyPublish
    },
    {
      path: '/mySell',
      name: 'mySell',
      component: MySell
    },
    {
      path: '/myBuy',
      name: 'myBuy',
      component: MyBuy
    },
    {
      path: '/collection',
      name: 'collection',
      component: Collection
    },
    {
      path: '/lookHistory',
      name: 'lookHistory',
      component: LookHistory
    },
    {
      path: '/userInfoPage',
      name: 'userInfoPage',
      component: UserInfoPage
    },
    {
      path: '/publish',
      name: 'publish',
      component: Publish
    }
  ],
  scrollBehavior () { // 解决vue页面之间跳转，页面不是在顶部的问题
    return { x: 0, y: 0 }
  }
})

