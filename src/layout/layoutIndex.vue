<template>
    <div class="layout_container">
        <!-- 左侧菜单 -->
        <div class="layout_slider">
            <Logo></Logo>
            <!--展示菜单-->
            <!--滚动组件-->
            <el-scrollbar class="scrollbar">
                <!--菜单组件-->
                <el-menu background-color="#001529" text-color="white">
                    <!--根据路由动态生成菜单-->
                    <Menu :menuList="userStore.menuRoutes"></Menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <!-- 顶部导航 -->
        <div class="layout_tabbar">456</div>
        <!-- 主要内容区 -->
        <div class="layout_main">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup lang="ts">
//引入左侧菜单logo子组件
import Logo from './logo/logoIndex.vue'
//引入菜单组件
import Menu from './menu/menuIndex.vue'
//获取用户相关的小仓库
import useUserStore from '@/stores/modules/user'
const userStore = useUserStore();
</script>

<style scoped>
.layout_container {
    width: 100vw;
    height: 100vh;

    .layout_slider {
        width: 260px;
        height: 100vh;
        background: #001529;

        .scrollbar {
            width: 100%;
            height: calc(100vh - 50px);

            .el-menu {
                border-right: none;
            }
        }
    }

    .layout_tabbar {
        position: fixed;
        width: calc(100% - 260px);
        height: 50px;
        background: cyan;
        top: 0px;
        left: 260px;
    }

    .layout_main {
        position: absolute;
        width: calc(100% - 260px);
        height: calc(100vh - 50px);
        background-color: yellowgreen;
        left: 260px;
        top: 50px;
        padding: 20px;
        overflow: auto;
    }
}
</style>