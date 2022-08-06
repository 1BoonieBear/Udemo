import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: HomeView,
    children:[
{path:'/',redirect:"/shouye"},
{path:'/shouye',component:()=>import('../views/shouye.vue')},
{path:'/fabu',component:()=>import('../views/fabu.vue')},
{path:'/my',component:()=>import('../views/my.vue')},
    ]
  },

  {path:'/wzxq/:id',component:()=>import('../views/wzxq.vue')},
  {path:'/geren',component:()=>import('../views/geren.vue')},
  {path:'/login',component:()=>import('../views/login.vue')},
  {path:'/password',component:()=>import('../views/password.vue')},
  {path:'/Search',component:()=>import('../views/Search.vue')},
  {path:'/shoucang',component:()=>import('../views/收藏/shoucang.vue')},







 
  

]

const router = new VueRouter({
  routes
})

export default router
