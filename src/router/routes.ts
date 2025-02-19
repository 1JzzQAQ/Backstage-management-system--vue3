//对外暴露配置路由(常量路由)
export const constantRoute = [
    {
        //登录路由
        path: '/login',
        component: () => import('@/views/login/indexLogin.vue'),
        name: 'login'
    },
    {
        //登录成功后展示数据的路由
        path: '/',
        component: () => import('@/layout/layoutindex.vue'),
        name: 'layout'
    },
    {
        //404
        path: '/404',
        component: () => import('@/views/404/index_404.vue'),
        name: '404'
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        name: 'Any'
    }
]