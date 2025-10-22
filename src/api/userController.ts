import request from '@/api/axios'
import type {
  User,
  addUserOptions,
  listUserVoByPageOptions,
  UserLogin,
  UserRegisterRequest,
  UserUpdateRequest
} from '@/api/type/userControllerType'

// 获取已经登陆的用户
export const getLoginUser = async (options?: object): Promise<User> => {
  return request.get('user/get/login', {
    params: {
      ...(options || {}),
    },
  })
}

// 添加用户
export const addUser = (options: addUserOptions): Promise<any> => {
  return request.post('user/add', {
    ...options,
  })
}

// 根据 id 删除用户
export const deleteUser = (id: number): Promise<any> => {
  return request.post('user/delete', {
    id,
  })
}

// 根据 id 查询用户
export const getUserById = (id: number): Promise<User> => {
  return request.get('user/get', {
    params: {
      id,
    },
  })
}

// 根据 id 查询用户
export const getUserVoById = (id: number): Promise<User> => {
  return request.get('user/get/vo', {
    params: {
      id,
    },
  })
}

// 分页查询用户
export const listUserVoByPage = (options: listUserVoByPageOptions): Promise<any> => {
  return request.post('user/list/page/vo', {
    ...options,
  })
}

// 用户登录
export const userLogin = (options: UserLogin): Promise<any> => {
  return request.post('user/login', {
    ...options,
  })
}

// 用户登出
// 这里的后端机制是直接清除相关的用户 session 信息，所以不需要传递参数
export const userLogout = (): Promise<any> => {
  return request.post('user/logout')
}

// 用户注册
export const userRegister = (options: UserRegisterRequest): Promise<any> => {
  return request.post('user/register', {
    ...options,
  })
}

// 更新用户信息
export const updateUser = (options: UserUpdateRequest): Promise<any> => {
  return request.post('user/update', {
    ...options,
  })
}
