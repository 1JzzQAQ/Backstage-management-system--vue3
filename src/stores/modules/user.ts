//创建用户相关的小仓库
import { defineStore } from 'pinia'
//引入接口
import { reqLogin } from '@/api/user'
//引入数据类型
import type { loginForm } from '@/api/user/type'
//创建
const useUserStore = defineStore('User', {
    //存储数据的地方
    state: () => {
        return {}
    },
    //异步｜逻辑的地方
    actions: {
        //用户登录方法
       async userLogin(data:loginForm) {
            const result = await reqLogin(data)
        }
    },
    getters: {

    }
})
//对外暴露获取小仓库的方法
export default useUserStore