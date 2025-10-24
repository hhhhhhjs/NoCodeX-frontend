<template>
  <div id="login">
    <h2 class="title">NoCodeX - 用户登录</h2>
    <div class="desc">不写一行代码，生成完整应用</div>
    <a-form :model="formState" name="basic" autocomplete="off" @finish="debounceSubmit">
      <a-form-item name="userAccount" :rules="[{ required: true, message: '请输入账号' }]">
        <a-input v-model:value="formState.userAccount" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item
        name="userPassword"
        :rules="[
          { required: true, message: '请输入密码' },
          { min: 8, message: '密码不能小于 8 位' },
        ]"
      >
        <a-input-password v-model:value="formState.userPassword" placeholder="请输入密码" />
      </a-form-item>
      <div class="tips">
        没有账号？
        <RouterLink to="/user/register">去注册</RouterLink>
      </div>
      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 100%">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue'
  import { useRouter } from 'vue-router'
  import { useLoginUserStore } from '@/store/loginUser'
  import type { UserLogin } from '@/api/type/userControllerType'
  import { userLogin } from '@/api/userController'
  import { message } from 'ant-design-vue'
  import { debounce } from 'lodash'

  const formState = reactive<UserLogin>({
    userAccount: '',
    userPassword: '',
  })

  const router = useRouter()
  const loginUserStore = useLoginUserStore()

  /**
   * 提交表单
   * @param values
   */

  const handleSubmit = async (values: UserLogin) => {
    const res = await userLogin(values)
    // 登录成功，把登录态保存到全局状态中
    if (res.code === 0 && res.data) {
      await loginUserStore.fetchLoginUser()
      message.success('登录成功')
      router.push({
        path: '/',
        replace: true,
      })
    } else {
      message.error('登录失败，' + res.message)
    }
  }

  // 提交函数增加防抖机制
   const debounceSubmit = debounce(handleSubmit, 150)
</script>

<style scoped>
  #login {
    max-width: 360px;
    margin: 0 auto;
  }

  .title {
    text-align: center;
    margin-bottom: 16px;
  }

  .desc {
    text-align: center;
    color: #bbb;
    margin-bottom: 16px;
  }

  .tips {
    margin-bottom: 16px;
    color: #bbb;
    font-size: 13px;
    text-align: right;
  }
</style>
