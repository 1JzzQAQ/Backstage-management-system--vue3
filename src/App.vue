<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { RouterView} from 'vue-router'
</script>

<style scoped></style>

<style>
/* 这里的样式是全局的 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}
</style>