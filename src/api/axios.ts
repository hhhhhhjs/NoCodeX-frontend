import axios from 'axios'
import { message } from 'ant-design-vue'

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api`,
  timeout: 10000, // 规定最大阈值为 10s
  withCredentials: true,
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 请求前配置
    // 例如添加 token
    // config.headers.Authorization = `Bearer ${token}`

    return config
  },
  (error: Error) => {
    // 请求错误处理
    return Promise.reject(error)
  }
)

// 响应拦截器

instance.interceptors.response.use(
  res => {
    const { data } = res
    // 检查是否是未登录状态（根据后端返回的状态码）
    // 不是获取用户信息的请求，并且用户目前不是已经在用户登录页面，则跳转到登录页面
    if (data && data.code === 40100) {
      // token 过期或未登录
      if ( !res.request.responseURL.includes('user/get/login') && !window.location.pathname.includes('/user/login')) {
        message.warning('请先登录')
        window.location.href = `/user/login?redirect=${window.location.href}`
      }
    }
    return data
  },
  (error: Error) => {
    return Promise.reject(error)
  }
)
export default instance
