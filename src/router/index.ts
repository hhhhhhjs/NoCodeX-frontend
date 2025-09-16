import { createRouter, createWebHistory } from 'vue-router'
import Hello from '../views/hello.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: Hello
    },
    {
        path: '/second',
        name: 'second',
        component: () => import('../views/second.vue')
    }
]


const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router