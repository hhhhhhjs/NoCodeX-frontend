import { createApp } from 'vue'
import './taildwind.css'
import 'ant-design-vue/dist/reset.css'
import Antd from 'ant-design-vue'
import router from '@/router/index.ts'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)
app.use(Antd)
app.use(router)
app.use(pinia)
app.mount('#app')
