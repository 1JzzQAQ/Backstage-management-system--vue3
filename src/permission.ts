/* eslint-disable @typescript-eslint/no-explicit-any */
//路由鉴权
import router from '@/router'
import Nprogress from 'nprogress'
//引入进度条样式
import "nprogress/nprogress.css"
//全局守卫：项目中任意路由切换都会触发的钩子
//全局前置守卫
router.beforeEach((to: any, from: any, next: any) => {
    //访问某个路由之前的守卫
    //to：将要访问 from：现在访问 next：路由的放行函数
    Nprogress.start()
    next()
})
//全局后置守卫
router.afterEach((to: any, from: any) => {
    Nprogress.done()
})