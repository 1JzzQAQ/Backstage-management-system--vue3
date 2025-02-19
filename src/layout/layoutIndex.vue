<template>
    <div class="layout_container">
        <!-- 左侧菜单 -->
        <div class="layout_slider">123</div>
        <!-- 右侧内容 -->
        <div class="layout_content">
            <!-- 顶部导航 -->
            <div class="layout_tabbar">456</div>
            <!-- 主要内容区 -->
            <div class="layout_main">789</div>
        </div>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.layout_container {
    display: flex;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}

.layout_slider {
    flex: 0 0 260px;
    background: #001529;
}

.layout_content {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.layout_tabbar {
    height: 70px;
    background: cyan;
}

.layout_main {
    flex: 1;
    background-color: yellowgreen;
    padding: 20px;
    overflow: auto;
}
</style>