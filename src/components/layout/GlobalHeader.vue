<template>
  <a-layout-header class="!bg-white !px-6">
    <a-row :wrap="false">
      <!-- 左侧：Logo和标题 -->
      <a-col flex="200px">
        <RouterLink to="/">
          <div class="flex items-center gap-3">
            <img src="/logo.png" alt="logo" class="w-12 h-12" />
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
            <a-dropdown>
              <a-space>
                <a-avatar :src="loginUserStore.loginUser.userAvatar" :size="50" />
                {{ loginUserStore.loginUser.userName ?? '神秘的用户' }}
              </a-space>
              <template #overlay>
                <a-menu>
                  <a-menu-item @click="doLogout">
                    <LogoutOutlined />
                    退出登录
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>

          <div v-else>
            <a-button type="primary" @click="handleLogin">登录</a-button>
          </div>
        </div>
      </a-col>
    </a-row>
  </a-layout-header>
</template>

<script setup lang="ts">
  import { h, ref, computed, watch, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import type { MenuProps } from 'ant-design-vue'
  import { useLoginUserStore } from '@/store/loginUser'
  import {
    LogoutOutlined,
    HomeOutlined,
    UserOutlined,
    AliwangwangOutlined,
  } from '@ant-design/icons-vue'
  import { userLogout } from '@/api/userController'
  import { message } from 'ant-design-vue'
  import checkAccess from '@/access/checkAccess'
  import ACCESS_ENUM from '@/access/accessEnum'

  // 扩展菜单项类型，支持 access 权限属性
  interface CustomMenuItem {
    key: string
    icon?: () => any
    label: string
    title?: string
    access?: string
    hideInMenu?: boolean
  }

  // 用户注销
  const doLogout = async () => {
    const res = await userLogout()
    if (res.code === 0) {
      loginUserStore.setLoginUser({
        userName: '未登录',
      })
      message.success('退出登录成功')
      await router.push('/user/login')
    } else {
      message.error('退出登录失败，' + res.message)
    }
  }

  const loginUserStore = useLoginUserStore()
  console.log(loginUserStore)

  const router = useRouter()
  // 当前选中菜单
  const selectedKeys = ref<string[]>(['/'])
  // 监听路由变化，更新当前选中菜单
  router.afterEach(to => {
    selectedKeys.value = [to.path]
  })

  // 处理菜单点击
  const handleMenuClick: MenuProps['onClick'] = e => {
    const key = e.key as string
    selectedKeys.value = [key]
    // 跳转到对应页面
    if (key.startsWith('/')) {
      router.push(key)
    }
  }

  // 处理登录
  const handleLogin = () => {
    router.push('/user/login')
  }

  // 菜单配置项（扩展类型以支持 access 属性）
  const originItems: CustomMenuItem[] = [
    {
      key: '/',
      icon: () => h(HomeOutlined),
      label: '主页',
      title: '主页',
      access: ACCESS_ENUM.USER, // 不需要登录
    },
    {
      key: '/about',
      icon: () => h(AliwangwangOutlined),
      label: '关于',
      title: '关于',
      access: ACCESS_ENUM.NOT_LOGIN, // 不需要登录
    },
    {
      key: '/admin/userManage',
      icon: () => h(UserOutlined),
      label: '用户管理',
      title: '用户管理',
      access: ACCESS_ENUM.ADMIN, // 需要管理员权限
    },
  ]

  // 过滤菜单项（根据权限过滤）
  const filterMenus = (menus: CustomMenuItem[] = []): MenuProps['items'] => {
    return menus?.filter(menu => {
      // 检查菜单项是否隐藏
      if (menu.hideInMenu) {
        return false
      }
      // 获取菜单项需要的权限
      const menuAccess = menu.access ?? ACCESS_ENUM.NOT_LOGIN
      // 使用 checkAccess 函数检查当前用户是否有权限访问
      return checkAccess(loginUserStore.loginUser, menuAccess)
    }) as MenuProps['items']
  }

  // 展示在菜单的路由数组（使用 computed 响应式更新）
  const menuItems = computed<MenuProps['items']>(() => filterMenus(originItems))

  // 监听路由, 保证 a-menu 组件高亮正确
  watch(
    () => router.currentRoute.value.path,
    (newMes) => {
      selectedKeys.value[0] = newMes
    },
    { immediate: true }
  )

  onMounted(() => {
    console.log(router)
  })
</script>

<style scoped>
  .ant-menu-horizontal {
    border-bottom: none !important;
  }
</style>
