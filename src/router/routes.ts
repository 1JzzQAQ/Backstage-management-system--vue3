//对外暴露配置路由(常量路由)
export const constantRoute = [
    {
        //登录路由
        path: '/login',
        component: () => import('@/views/login/indexLogin.vue'),
        name: 'login',
        meta: {
            title: '登录', //菜单标题
            hidden: true, //代表是否隐藏标题在菜单中
        }
    },
    {
        //登录成功后展示数据的路由
        path: '/',
        component: () => import('@/layout/layoutIndex.vue'),
        name: 'layout',
        meta: {
            title: '',
            hidden: false,
            icon: ''
        },
        redirect: '/home',
        children: [
            {
                path: '/home',
                component: () => import('@/views/home/indexHome.vue'),
                meta: {
                    title: '首页',
                    hidden: false,
                    icon: 'HomeFilled'
                }
            },
        ]
    },
    {
        //404
        path: '/404',
        component: () => import('@/views/404/index_404.vue'),
        name: '404',
        meta: {
            title: '404',
            hidden: true,
        }
    },
    {
        path: '/screen',
        component: () => import('@/views/screen/screenIndex.vue'),
        name: 'screen',
        meta: {
            title: '数据大屏',
            hidden: false,
            icon: 'Platform'
        }
    },
    {
        path: '/acl',
        component: () => import('@/layout/layoutIndex.vue'),
        name: 'Acl',
        meta: {
            title: '权限管理',
            hidden: false,
            icon: 'Lock'
        },
        redirect:'/acl/user',
        children: [
            {
                path: '/acl/user',
                component: () => import('@/views/acl/user/userIndex.vue'),
                name: 'User',
                meta: {
                    title: '用户管理',
                    hidden: false,
                    icon: 'User'
                }
            },
            {
                path: '/acl/role',
                component: () => import('@/views/acl/role/roleIndex.vue'),
                name: 'Role',
                meta: {
                    title: '角色管理',
                    hidden: false,
                    icon: 'UserFilled'
                }
            },
            {
                path: '/acl/permission',
                component: () => import('@/views/acl/permission/perIndex.vue'),
                name: 'Permission',
                meta: {
                    title: '菜单管理',
                    hidden: false,
                    icon: 'Monitor'
                }
            },
        ]
    },
    {
        path: '/product',
        component: () => import('@/layout/layoutIndex.vue'),
        name: 'Product',
        meta: {
            title: '商品管理',
            hidden: false,
            icon: 'Goods'
        },
        redirect:'/product/trademark',
        children: [
            {
                path: '/product/trademark',
                component: () => import('@/views/product/trademark/trademarIndex.vue'),
                name: 'Trademark',
                meta: {
                    title: '品牌管理',
                    hidden: false,
                    icon: 'ShoppingCartFull'
                }
            },
            {
                path: '/product/attr',
                component: () => import('@/views/product/attr/attrIndex.vue'),
                name: 'Attr',
                meta: {
                    title: '属性管理',
                    hidden: false,
                    icon: 'Eleme'
                }
            },
            {
                path: '/product/spu',
                component: () => import('@/views/product/spu/spuIndex.vue'),
                name: 'Spu',
                meta: {
                    title: 'SPU管理',
                    hidden: false,
                    icon: 'List'
                }
            },
            {
                path: '/product/sku',
                component: () => import('@/views/product/sku/skuIndex.vue'),
                name: 'Sku',
                meta: {
                    title: 'SKU管理',
                    hidden: false,
                    icon: 'List'
                }
            },
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        name: 'Any',
        meta: {
            title: '任意路由',
            hidden: true,
        }
    }
]