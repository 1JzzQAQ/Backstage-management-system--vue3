//小仓库：layout组件相关配置仓库
import { defineStore } from 'pinia'

const useLayOutSettingStore = defineStore('SettingStore', {
    state: () => {
        return {
            fold: false,//用于控制菜单折叠还是收起的控制
            refsh:false,//control refresh
        }
    }
})

export default useLayOutSettingStore