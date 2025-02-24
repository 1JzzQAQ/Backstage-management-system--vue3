<template>
    <div class="layout_container">
        <!-- 左侧菜单 -->
        <div class="layout_slider" :class="{ fold: LayOutSettingStore.fold ? true : false }">
            <Logo></Logo>
            <!--展示菜单-->
            <!--滚动组件-->
            <el-scrollbar class="scrollbar">
                <!--菜单组件-->
                <el-menu :collapse="LayOutSettingStore.fold?true:false" :default-active="$route.path" background-color="#001529" text-color="white">
                    <!--根据路由动态生成菜单-->
                    <Menu :menuList="userStore.menuRoutes"></Menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <!-- 顶部导航 -->
        <div class="layout_tabbar" :class="{ fold: LayOutSettingStore.fold ? true : false }">
            <!--layout top navigation tabbar-->
            <Tabbar></Tabbar>
        </div>
        <!-- 主要内容区 -->
        <div class="layout_main" :class="{ fold: LayOutSettingStore.fold ? true : false }">
            <Main></Main>
        </div>
    </div>
</template>

<script setup lang="ts">
//获取路由对象
import { useRoute } from 'vue-router'
//引入左侧菜单logo子组件
import Logo from './logo/logoIndex.vue'
//引入菜单组件
import Menu from './menu/menuIndex.vue'
//右侧内容的展示区
import Main from './main/mainIndex.vue'
//引入tabbar
import Tabbar from './tabbar/tabbarIndex.vue'
//获取用户相关的小仓库
import useUserStore from '@/stores/modules/user'
import useLayOutSettingStore from '@/stores/modules/setting'
const userStore = useUserStore();
//获取layout配置仓库
const LayOutSettingStore = useLayOutSettingStore()
//获取路由对象
const $route = useRoute()
</script>

<style scoped>
.layout_container {
    width: 100vw;
    height: 100vh;

    .layout_slider {
        width: 260px;
        height: 100vh;
        background: #001529;
        color: white;
        transition: all 0.3s;

        .scrollbar {
            width: 100%;
            height: calc(100vh - 50px);

            .el-menu {
                border-right: none;
            }
        }

        &.fold {
            width: 50px;
        }
    }

    .layout_tabbar {
        position: fixed;
        width: calc(100% - 260px);
        height: 50px;
        top: 0px;
        left: 260px;
        transition: all 0.3s;

        &.fold {
            width: calc(100% - 50px);
            left: 50px;
        }
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
        transition: all 0.3s;

        &.fold {
            width: calc(100% - 50px);
            left: 50px;
        }
    }
}
</style>