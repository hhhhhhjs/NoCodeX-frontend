import { createApp } from 'vue'
import './taildwind.css'
import 'ant-design-vue/dist/reset.css'
import Antd from 'ant-design-vue'
import router from '@/router/index.ts'
import App from './App.vue'

const app = createApp(App)
app.use(Antd)
app.use(router)
app.mount('#app')
