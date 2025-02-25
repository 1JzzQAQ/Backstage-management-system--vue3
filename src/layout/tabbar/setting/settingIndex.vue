<template>
    <div class="set">
        <el-button type="small" size="default" icon="Refresh" circle @click="updateRefsh"></el-button>
        <el-button type="small" size="default" icon="FullScreen" circle @click="fullScreen"></el-button>
        <el-button type="small" size="default" icon="Setting" circle></el-button>
        <img src="../../../../favicon.ico" style="width:24px;height: 24px;margin:0 10px;">
        <!--dropdown-->
        <el-dropdown>
            <span class="el-dropdown-link">
                admin
                <el-icon class="el-icon--right">
                    <arrow-down />
                </el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>Exit</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup lang="ts">
//获取小仓库
import useLayOutSettingStore from '@/stores/modules/setting';
const layoutSettingStore = useLayOutSettingStore()
//refresh button click callback
const updateRefsh = () => {
    layoutSettingStore.refsh = !layoutSettingStore.refsh
}
//full screen button click callback
const fullScreen = () => {
    const full = document.fullscreenElement //dom对象的一个属性，用来判断当前是否全屏模式[fullscreen:true;no:false]
    if (!full) {
        document.documentElement.requestFullscreen()
    }else{
        document.exitFullscreen()
    }
}
</script>

<style scoped>
.set {
    display: flex;
    align-items: center;
}
</style>
