/* eslint-disable @typescript-eslint/no-explicit-any */
//引入项目中全部的全局组件
import SvgIcon from './SvgIcon/IndexSvg.vue'
import Pagenation from './Pagenation/IndexPagenation.vue'
import Category from './Category/catgoryIndex.vue'
//引入element-plus提供的全部图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
//全局对象

const allGlobalComponent: any = { SvgIcon, Pagenation, Category }
//对外暴露插件对象
export default {
  //务必叫做install方法
  install(app: any) {
    //注册项目全部的全局组件
    Object.keys(allGlobalComponent).forEach(key => {
      //注册为全局组件
      app.component(key, allGlobalComponent[key])
    });
    //将图标注册为全局组件 
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  }
}
