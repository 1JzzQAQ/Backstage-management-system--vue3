<template>
  <div class="bread">
    <!--left  jingtai-->
    <el-icon style="margin-right:10px ;" @click="changeIcon">
      <component :is="LayOutSettingStore.fold ? 'Fold' : 'Expand'"></component>
    </el-icon>
    <!--left mianbao xie-->
    <el-breadcrumb separator-icon="ArrowRight">
      <!--动态展示路由名字和标题-->
      <el-breadcrumb-item v-for="(item,index) in $route.matched" :key="index" v-show="item.meta.title" :to="item.path">
        <el-icon style="align-items: center;">
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>

  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import useLayOutSettingStore from '@/stores/modules/setting';
const LayOutSettingStore = useLayOutSettingStore()
const $route = useRoute()
//click func
const changeIcon = () => {
  LayOutSettingStore.fold = !LayOutSettingStore.fold
}
</script>

<style scoped>
.bread {
  display: flex;
  align-items: center;
}
</style>
