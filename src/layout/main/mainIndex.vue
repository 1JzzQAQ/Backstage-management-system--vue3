<template>
  <div>
    <!--路由组件出口位置-->
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <!--渲染layout一级路由组件的子路由-->
        <component :is="Component" v-if="flag" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import useLayOutSettingStore from '@/stores/modules/setting';
import { ref, watch, nextTick } from 'vue';
const layoutSettingStore = useLayOutSettingStore()

//控制组件是否销毁重建
const flag = ref(true)

//监听仓库内数据是否变化，如果变化说明用户点击了刷新按钮
watch(() => layoutSettingStore.refsh, () => {
  //点击刷新，路由组件要销毁
  flag.value = false
  nextTick(()=>{
    flag.value = true
  })
})
</script>

<style scoped>
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 1s;
}

.fade-enter-to {
  opacity: 1;
}
</style>
