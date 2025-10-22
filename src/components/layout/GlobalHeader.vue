<template>
  <a-layout-header class="!bg-white !px-6">
    <a-row :wrap="false">
      <!-- 左侧：Logo和标题 -->
      <a-col flex="200px">
        <RouterLink to="/">
          <div class="flex items-center gap-3">
            <img src="/logo.png" alt="logo" class="w-12 h-12">
            <h1 class="text-[#1890ff] text-[20px] m-0">NoCodeX</h1>
          </div>
        </RouterLink>
      </a-col>
      <!-- 中间：导航菜单 -->
      <a-col flex="auto">
        <a-menu
          v-model:selectedKeys="selectedKeys"
          mode="horizontal"
          :items="menuItems"
          @click="handleMenuClick"
        />
      </a-col>
      <!-- 右侧：用户操作区域 -->
      <a-col>
        <div class="user-login-status">
          <div v-if="loginUserStore.loginUser.id">
            <a-space>
              <a-avatar :src="loginUserStore.loginUser.userAvatar" :size="60">
                {{ loginUserStore.loginUser.userName ?? '神秘的用户' }}
              </a-avatar>
            </a-space>
          </div>
          <div v-else>
            <a-button type="primary">登录</a-button>
          </div>
        </div>
      </a-col>
    </a-row>
  </a-layout-header>
</template>

<script setup lang="ts">
import { h, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { MenuProps } from 'ant-design-vue'
import { useLoginUserStore } from '@/store/loginUser'

const loginUserStore = useLoginUserStore()
console.log(loginUserStore)

const router = useRouter()
// 当前选中菜单
const selectedKeys = ref<string[]>(['/'])
// 监听路由变化，更新当前选中菜单
router.afterEach((to, from, next) => {
  selectedKeys.value = [to.path]
})

// 菜单配置项
const menuItems = ref([
  {
    key: '/',
    label: '首页',
    title: '首页',
  },
  {
    key: '/about',
    label: '关于',
    title: '关于我们',
  },
  {
    key: '/others',
    label: '其他',
    title: '其他',
  },
])

// 处理菜单点击
const handleMenuClick: MenuProps['onClick'] = (e) => {
  console.log('看看 key', e.key)
  const key = e.key as string
  selectedKeys.value = [key]
  // 跳转到对应页面
  if (key.startsWith('/')) {
    router.push(key)
  }
}
</script>

<style scoped>
.ant-menu-horizontal {
  border-bottom: none !important;
}
</style>
