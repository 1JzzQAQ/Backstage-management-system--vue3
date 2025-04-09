<template>
  <div class="tabbar">
    <div class="tabbar_left">
      <BreadCrumb></BreadCrumb>
    </div>
    <div class="tabbar_right">
      <Setting></Setting>
    </div>
  </div>
</template>


<script setup lang="ts">
import BreadCrumb from './breadcrumb/breadIndex.vue'
import Setting from './setting/settingIndex.vue'
</script>

<style scoped>
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  

  .tabbar_left {
    display: flex;
    align-items: center;
    margin-left: 20px;
  }

  .tabbar_right {
    display: flex;
    align-items: center;
    margin-right: 20px;
  }
}
</style>
