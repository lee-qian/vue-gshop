/*
路由器对象
*/
import Vue from 'vue'
import VueRouter from 'vue-router'

/*import Msite from '../pages/Msite/Msite.vue'
import Search from '../pages/Search/Search.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Login from '../pages/Login/Login.vue'*/

/*路由组件懒加载：需要的时候才去后台请求路由组件代码*/
const Msite = ()=> import('../pages/Msite/Msite.vue')
const Search = ()=> import('../pages/Search/Search.vue')
const Order = ()=> import('../pages/Order/Order.vue')
const Profile = ()=> import('../pages/Profile/Profile.vue')
const Login = ()=> import('../pages/Login/Login.vue')

import Shop from '../pages/Shop/Shop.vue'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods.vue'
import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings.vue'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo.vue'

/*const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}*/

//声明使用插件
Vue.use(VueRouter)

export default new VueRouter({
  //所有路由
  routes: [
    {
      path: '/msite',
      component: Msite,  //返回路由组件的函数,只有执行此函数才会加载路由组件，
      meta:{             //这个函数在请求对应的路由路径才会执行（第一次）
        showFooter: true
      }
    },
    {
      path: '/search',
      component: Search,
      meta:{
        showFooter: true
      }
    },
    {
      path: '/order',
      component: Order,
      meta:{
        showFooter: true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta:{
        showFooter: true
      }
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      redirect: '/msite'
    },
    {
      path: '/shop',
      component: Shop,
      children: [
        {
          path: '/shop/goods',
          component: ShopGoods
        },
        {
          path: '/shop/ratings',
          component: ShopRatings
        },
        {
          path: '/shop/info',
          component: ShopInfo
        },
        {
          path: '',
          redirect: '/shop/goods'
        },
      ]
    },
  ]
})
