import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
//svg插件需要配置代码
import 'virtual:svg-icons-register'
//引入自定义插件对象：注册整个项目的全局组件
import globalComponent from '@/components'
import App from './App.vue'
import router from './router'
//获取应用对象实例
const app = createApp(App)
app.use(createPinia())
app.use(router)
//安装element-plus插件
app.use(ElementPlus, {
  locale: zhCn,//国际化配置
})
//安装自定义插件
app.use(globalComponent)
//引入路由鉴权
import './permission'
//将应用挂载到挂载点上
app.mount('#app')
