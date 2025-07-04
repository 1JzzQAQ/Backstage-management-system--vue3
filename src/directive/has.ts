import pinia from "@/stores"
import useUserStore from "@/stores/modules/user"
const userStore = useUserStore(pinia)
export const isHasButton = (app:any)=>{
    // 全局自定义指令实现按钮权限
    app.directive('has',{
        //代表使用这个全局自定义指令的dom|组件挂载完毕时会执行一次
        mounted(el:any,options:any){
            if(!userStore.buttons.includes(options.value)){
                el.parentNode.removeChild(el)
            }
        }
    })
}