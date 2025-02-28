<template>
    <div class="set">
        <el-button type="small" size="default" icon="Refresh" circle @click="updateRefsh"></el-button>
        <el-button type="small" size="default" icon="FullScreen" circle @click="fullScreen"></el-button>
        <el-button type="small" size="default" icon="Setting" circle></el-button>
        <img :src="userStore.avatar" style="width:24px;height: 24px;margin:0 10px; border-radius: 10%;">
        <!--dropdown-->
        <el-dropdown>
            <span class="el-dropdown-link">
                {{ userStore.username }}
                <el-icon class="el-icon--right">
                    <arrow-down />
                </el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="logout">Exit</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup lang="ts">
//获取骨架的小仓库
import useLayOutSettingStore from '@/stores/modules/setting';
//获取用户相关小仓库
import useUserStore from '@/stores/modules/user';
import { useRouter, useRoute } from 'vue-router';
const $router = useRouter()
const $route = useRoute()
const layoutSettingStore = useLayOutSettingStore()
const userStore = useUserStore()
//refresh button click callback
const updateRefsh = () => {
    layoutSettingStore.refsh = !layoutSettingStore.refsh
}
//full screen button click callback
const fullScreen = () => {
    const full = document.fullscreenElement //dom对象的一个属性，用来判断当前是否全屏模式[fullscreen:true;no:false]
    if (!full) {
        document.documentElement.requestFullscreen()
    } else {
        document.exitFullscreen()
    }
}
//click exit callback
const logout = async () => {
    //1 step: 向服务器发请求[退出登录接口]
    //2 step: 仓库中关于用户相关的数据清空[token|username|avatar]
    await userStore.userLogout()
    //3 step: jump to login page
    $router.push({ path: '/login', query: { redirect: $route.path } })
}
</script>

<style scoped>
.set {
    display: flex;
    align-items: center;
}
</style>
