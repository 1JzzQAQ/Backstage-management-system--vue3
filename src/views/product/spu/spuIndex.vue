<template>
    <div>
        <!--san ji fen lei-->
        <Category :scence="scence"></Category>
        <el-card style="margin: 10px 0;">
            <el-button type="primary" size="default" icon="Plus">添加SPU</el-button>
            <el-table border style="margin: 10px 0;">
                <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
                <el-table-column label="SPU名称"></el-table-column>
                <el-table-column label="SPU描述"></el-table-column>
                <el-table-column label="SPU操作"></el-table-column>
            </el-table>
            <!--pagenation -->
            <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 9]"
                :background="true" :size="size" :disabled="disabled" layout=" prev, pager, next, jumper,->,sizes,total"
                :total="400" />
        </el-card>

    </div>
</template>

<script setup lang="ts">
import type { ComponentSize } from 'element-plus';
import { ref } from 'vue';
const scence = ref<number>(0)
//分页器页码
const pageNo = ref<number>(1)
//每一页几条数据
const pageSize = ref<number>(3)
const size = ref<ComponentSize>('default')
const disabled = ref(false)
</script>

<style scoped></style>
