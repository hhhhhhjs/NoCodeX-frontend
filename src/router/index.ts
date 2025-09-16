import { createRouter, createWebHistory } from 'vue-router'
import login from '@/views/login.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: login
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router