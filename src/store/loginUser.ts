import { defineStore } from 'pinia'
import { getLoginUser } from '@/api/userController.ts'

export const useLoginUserStore = defineStore('loginUser', {
  state: () => ({
    loginUser: {
      userName: '未登录',
      id: '',
      userAvatar: ''
    },
  }),
  getters: {},
  actions: {
    // 获取登录用户信息
    async fetchLoginUser() {
      try {
        const res = await getLoginUser()
        // 由于 axios 拦截器返回的是 data，所以 res 就是后端返回的数据
        if (res && (res as any).code === 0 && (res as any).data) {
          console.log('看看登录的用户', res)
          this.loginUser = (res as any).data
        }
      } catch (error) {
        console.error('获取登录用户信息失败:', error)
      }
    },
    // 更新登录用户信息
    setLoginUser(newLoginUser: any) {
      this.loginUser = newLoginUser
    },
  },
})
