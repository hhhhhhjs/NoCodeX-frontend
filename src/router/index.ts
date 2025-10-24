import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/home.vue'
import ACCESS_ENUM from '@/access/accessEnum'

const routes = [
  {
    path: '/',
    name: '主页',
    component: Home,
    children: [
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
        meta: {
          access: ACCESS_ENUM.ADMIN,
        },
        name: '用户管理',
        component: () => import('@/views/admin/userManage.vue'),
      },
      {
        path: '/about',
        name: '关于',
        meta: {
          access: ACCESS_ENUM.USER,
        },
        component: () => import('@/views/about.vue'),
      },
    ],
  },
  // {
  //   path: '/user/login',
  //   name: '用户登录',
  //   component: () => import('@/views/User/login.vue'),
  // },
  // {
  //   path: '/user/register',
  //   name: '用户注册',
  //   component: () => import('@/views/User/register.vue'),
  // },
  // {
  //   path: '/admin/userManage',
  //   name: '用户管理',
  //   component: () => import('@/views/admin/userManage.vue'),
  // },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
