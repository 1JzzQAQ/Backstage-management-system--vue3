/* eslint-disable @typescript-eslint/no-explicit-any */
//路由鉴权
import router from '@/router'
import Nprogress from 'nprogress'
import setting from './setting'
//引入进度条样式
import "nprogress/nprogress.css"
Nprogress.configure({ showSpinner: false })
import pinia from './stores'
//获取用户相关小仓库内部token数据，判断是否登录
import useUserStore from './stores/modules/user'

const userStore = useUserStore(pinia)

//全局守卫：项目中任意路由切换都会触发的钩子
//全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
    document.title = setting.title + ' - ' + to.meta.title
    //访问某个路由之前的守卫
    //to：将要访问 from：现在访问 next：路由的放行函数
    Nprogress.start()
    //获取token判断用户登录情况
    const token = userStore.token
    const username = userStore.username
    if (token) {
        if (to.path == '/login') {
            next({ path: '/' })
        } else {
            if (username) {
                next()
            } else {
                try {
                    await userStore.userInfo()
                    next()
                } catch (error) {
                    //token过期或手动修改本地存储token
                    //退出登录-》清空用户数据
                    await  userStore.userLogout()
                    next({ path: '/login', query: { redirect: to.path } })
                }
            }
        }
    } else {
        if (to.path == '/login') {
            next()
        } else {
            next({ path: '/login', query: { redirect: to.path } })
        }
    }
})
//全局后置守卫
router.afterEach((to: any, from: any) => {
    Nprogress.done()
})

//第一个问题：任意路由切换实现进度条任务：nprogress
//第二个问题：路由鉴权（路由组件访问权限设置）
//全部路由组件：登录｜404｜任意路由｜首页｜数据大屏｜权限管理（三个子路由）｜商品管理（四个子路由）

//用户未登录，只能访问login
//用户登录成功，不能访问login
