<template>
    <el-card>
        <el-form :inline="true">
            <el-form-item label="一级分类">
                <el-select :disabled="scence == 0 ? false : true" style="width: 220px;" v-model="categoryStore.c1Id"
                    @change="handler">
                    <!--label:show data value:select menu collect data -->
                    <el-option v-for="(c1, index) in categoryStore.c1Arr" :key="c1.id" :label="c1.name"
                        :value="c1.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类">
                <el-select :disabled="scence == 0 ? false : true" style="width: 220px;" v-model="categoryStore.c2Id"
                    @change="handler1">
                    <el-option v-for="(c2, index) in categoryStore.c2Arr" :key="c2.id" :label="c2.name"
                        :value="c2.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="三级分类">
                <el-select :disabled="scence == 0 ? false : true" style="width: 220px;" v-model="categoryStore.c3Id">
                    <el-option v-for="(c3, index) in categoryStore.c3Arr" :key="c3.id" :label="c3.name"
                        :value="c3.id"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script setup lang="ts">
//接收父组件传递过来的props
defineProps(['scence'])
//引入生命周期函数钩子
import { onMounted } from 'vue';
//引入分类相关仓库
import useCategoryStore from '@/stores/modules/category';
const categoryStore = useCategoryStore()
//全局组件挂载完毕，通知仓库发请求获取一级分类数据
onMounted(() => {
    getC1()
})

//通知仓库获取一级分类的方法
const getC1 = () => {
    //通知分类仓库发请求获取一级分类数据
    categoryStore.getC1()
}
//此方法即为一级分类的下拉菜单change事件（选中值触发）
const handler = () => {
    //需要清空二级和三级数据
    categoryStore.c2Id = ''
    categoryStore.c3Id = ''
    categoryStore.c3Arr = []
    // 通知仓库获取二级分类数据
    categoryStore.getC2()
}
const handler1 = () => {
    //需要清空三级数据
    categoryStore.c3Id = ''
    categoryStore.getC3()
}
</script>

<style scoped></style>
