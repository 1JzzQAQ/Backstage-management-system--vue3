import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
//暗黑模式需要的样式
import 'element-plus/theme-chalk/dark/css-vars.css'
//svg插件需要配置代码
import 'virtual:svg-icons-register'
//引入自定义插件对象：注册整个项目的全局组件
import globalComponent from '@/components'
import App from './App.vue'
import router from './router'
import pinia from './stores'
//获取应用对象实例
const app = createApp(App)
app.use(pinia)
app.use(router)
//安装element-plus插件
app.use(ElementPlus, {
  locale: zhCn,//国际化配置
})
//安装自定义插件
app.use(globalComponent)
//引入路由鉴权
import './permission'
import './directive/has'
import { isHasButton } from './directive/has'
isHasButton(app)
//将应用挂载到挂载点上
app.mount('#app')
