import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/home.vue'

const routes = [
  {
    path: '/',
    name: '主页',
    component: Home,
  },
  {
    path: '/user/login',
    name: '用户登录',
    component: () => import('@/views/User/login.vue'),
  },
  {
    path: '/user/register',
    name: '用户注册',
    component: () => import('@/views/User/register.vue'),
  },
  {
    path: '/admin/userManage',
    name: '用户管理',
    component: () => import('@/views/admin/userManage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
