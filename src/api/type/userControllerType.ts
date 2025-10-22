export interface User {
    id: string;
    userAccount: string;
    userName: string;
    userAvatar: string;
    userRole: string;
    createTime: string;
    updateTime?: string;
}

export interface UserLogin {
    userAccount: string;
    userPassword: string;
}

export interface addUserOptions {
    userName: string;
    userAccount: string;
    userAvatar: string;
    userProfile?: string; // 用户简介
    userRole: 'user' | 'admin'; // 用户角色
}

export interface UserRegisterRequest {
    userAccount: string;
    userPassword: string;
    checkPassword: string;
}

export interface listUserVoByPageOptions {
    id: number;
    username: string;
    uerAccount: string;
    userProfile: string; // 用户简介
    userRole: 'user' | 'admin'; // 用户角色
}

export interface UserUpdateRequest {
    id: string;
    userName: string;
    userAvatar: string;
    userProfile?: string; // 用户简介
    userRole: 'user' | 'admin'; // 用户角色
}
