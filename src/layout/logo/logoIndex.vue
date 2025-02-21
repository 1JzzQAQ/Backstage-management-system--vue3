<template>
  <div class="logo">
    <img :src="setting.logo" alt="">
    <p>{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
import setting from '@/setting';
</script>

<style scoped>
.logo {
  width: 100%;
  height: 50px;
  color: white;
  display: flex;
  align-items: center;
  padding: 10px;

  img {
    height: 40px;
    width: 40px;
  }

  p {
    font-size: 20px;
    margin-left: 10px;
  }
}
</style>