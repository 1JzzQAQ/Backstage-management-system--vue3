//创建用户相关的小仓库
import { defineStore } from 'pinia'
//引入接口
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
//引入数据类型
import type { UserState } from './types/types'
import type { loginFormData, loginResponseData, userInfoResponseData } from '@/api/user/type'
//引入操作本地存储的工具方法
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
//引入路由（常量路由）
import { constantRoute } from '@/router/routes'
//创建
const useUserStore = defineStore('User', {
    //存储数据的地方
    state: (): UserState => {
        return {
            token: GET_TOKEN(),//用户唯一标识token
            menuRoutes: constantRoute, //仓库存储生成菜单需要的数组（路由）
            username: '',
            avatar: '',
        }
    },
    //异步｜逻辑的地方
    actions: {
        //用户登录方法
        async userLogin(data: loginFormData) {
            const result: loginResponseData = await reqLogin(data)
            //登录请求成功200->token; 失败201
            if (result.code == 200) {
                //pinia仓库存储一下token
                this.token = (result.data as string)
                //本地持久化存储一份
                SET_TOKEN(result.data as string)
                //保证async返回一个成功的promise
                return 'ok'
            } else {
                return Promise.reject(new Error(result.data))
            }
        },
        //获取用户信息的方法
        async userInfo() {
            //获取用户信息存储仓库当中[头像，名字]
            const result: userInfoResponseData = await reqUserInfo();
            //如果获取用户信息成功就存储用户信息
            if (result.code == 200) {
                this.username = result.data.name
                this.avatar = result.data.avatar
                return 'ok'
            } else {
                return Promise.reject(new Error(result.message))
            }
        },
        //退出登录方法
        async userLogout() {
            const result: any = await reqLogout()
            if (result.code == 200) {
                this.token = ''
                this.username = ''
                this.avatar = ''
                REMOVE_TOKEN()
                return 'ok'
            } else {
                return Promise.reject(new Error(result.message))
            }
        }
    },
    getters: {

    }
})
//对外暴露获取小仓库的方法
export default useUserStore