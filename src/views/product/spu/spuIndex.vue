<template>
    <div>
        <!--san ji fen lei-->
        <Category :scence="scence"></Category>
        <el-card style="margin: 10px 0;">
            <el-button type="primary" size="default" icon="Plus"
                :disabled="categoryStore.c3Id ? false : true">添加SPU</el-button>
            <!--展示已有的spu-->
            <el-table border style="margin: 10px 0;" :data="records">
                <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
                <el-table-column label="SPU名称" prop="spuName"></el-table-column>
                <el-table-column label="SPU描述" prop="discription" show-overflow-tooltip></el-table-column>
                <el-table-column label="SPU操作">
                    <template #="{ row, $index }">
                        <el-button type="primary" size="small" icon="Plus"></el-button>
                        <el-button type="warning" size="small" icon="Edit"></el-button>
                        <el-button type="info" size="small" icon="View"></el-button>
                        <el-button type="danger" size="small" icon="Delete"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--pagenation -->
            <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 9]"
                :background="true" :size="size" :disabled="disabled" layout=" prev, pager, next, jumper,->,sizes,total"
                :total="total" @current-change="getHasSpu" @size-change="changeSize" />
        </el-card>

    </div>
</template>

<script setup lang="ts">
import type { ComponentSize } from 'element-plus';
import { ref, watch } from 'vue';
//引入分类的仓库
import useCategoryStore from '@/stores/modules/category';
import { reqHasSpu } from '@/api/product/spu';
import type { HasSpuResponseData, Records } from '@/api/product/spu/types';
import { getShebang } from 'typescript';
const categoryStore = useCategoryStore()
//场景的数据
const scence = ref<number>(0)
//分页器页码
const pageNo = ref<number>(1)
//每一页几条数据
const pageSize = ref<number>(3)
const size = ref<ComponentSize>('default')
const disabled = ref(false)
//存储已有spu
const records = ref<Records>()
const total = ref<number>()
//监听三级分类id变化
watch(() => categoryStore.c3Id, () => {
    //务必保证c3id
    if (!categoryStore.c3Id) return;
    getHasSpu()
});

//此方法执行可以获取某个三级分类下以有的spu
const getHasSpu = async (pager = 1) => {
    pageNo.value = pager
    const result: HasSpuResponseData = await reqHasSpu(pageNo.value, pageSize.value, categoryStore.c3Id)
    if (result.code == 200) {
        records.value = result.data.records
        total.value = result.data.total
    }
}

//分页器下拉菜单变化发请求
const changeSize = () => {
    getHasSpu()
}
</script>

<style scoped></style>
