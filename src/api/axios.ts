import axios from 'axios'
import useRouterInstance from './userouter'

const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 5000, // 规定最大阈值为 5s
    withCredentials: true
})

// 请求拦截器
instance.interceptors.request.use((config) => {
    // 请求前配置
    // 例如添加 token
    // config.headers.Authorization = `Bearer ${token}`

    return config
},
(error:Error) => {
    // 请求错误处理
    return Promise.reject(error)
})

// 响应拦截器

instance.interceptors.response.use((res) => {
    const { data } = res
    if(data.code === 400100) {
        // token 过期
        // 跳转到登录页
        
        useRouterInstance.push('/login')
    }
    return res
},(error:Error) => {
    return Promise.reject(error)
})
export default instance