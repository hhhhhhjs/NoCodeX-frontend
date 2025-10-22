export interface User {
    id: string;
    userAccount: string;
    userName: string;
    userAvatar: string;
    userRole: string;
    createTime: string;
    updateTime?: string;
}

export interface addUserOptions {
    userName: string;
    userAccount: string;
    userAvatar: string;
    userProfile?: string; // 用户简介
    userRole: 'user' | 'admin'; // 用户角色
}