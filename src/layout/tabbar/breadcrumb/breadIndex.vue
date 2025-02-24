<template>
  <div class="bread">
    <!--left  jingtai-->
    <el-icon style="margin-right:10px ;" @click="changeIcon">
      <component :is="LayOutSettingStore.fold ? 'Fold' : 'Expand'"></component>
    </el-icon>
    <!--left mianbao xie-->
    <el-breadcrumb separator-icon="ArrowRight">
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>

  </div>
</template>

<script setup lang="ts">
import useLayOutSettingStore from '@/stores/modules/setting';
const LayOutSettingStore = useLayOutSettingStore()
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
