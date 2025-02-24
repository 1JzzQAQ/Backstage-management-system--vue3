<template>
    <div class="set">
        <el-button type="small" size="default" icon="Refresh" circle></el-button>
        <el-button type="small" size="default" icon="FullScreen" circle></el-button>
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
</script>

<style scoped>
.set{
    display: flex;
    align-items: center;
}
</style>
