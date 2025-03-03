<template>
    <el-card class="box-card">
        <!--card top add brand-->
        <el-button type="primary" size="default" icon="plus" @click="addTrademark">添加品牌</el-button>
        <!--table:use to show brand data-->
        <el-table style="margin: 10px 0;" border :data="trademarkArr">
            <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
            <el-table-column label="品牌名称">
                <template #default="scope">
                    <div style="color: goldenrod;">{{ scope.row.tmName }}</div>
                </template>
            </el-table-column>
            <el-table-column label="品牌LOGO">
                <template #default="scope">
                    <img :src="scope.row.logoUrl" alt="图片加载失败" style="width:100px; height: 100px;">
                </template>
            </el-table-column>
            <el-table-column label="品牌操作">
                <template #default="scope">
                    <el-button type="primary" size="default" icon="Edit" @click="updateTrademark"></el-button>
                    <el-button type="danger" size="default" icon="Delete"></el-button>

                </template>
            </el-table-column>
        </el-table>
        <!--pagenation-->
        <el-pagination v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[3, 5, 7, 9]" :size="size"
            :disabled="disabled" :background="background" layout="prev, pager, next, jumper,-> ,sizes, total"
            :total="total" @current-change="getHasTrademark" @size-change="sizeChange" />
    </el-card>
    <!--dialog-->
    <el-dialog v-model="dialogFormVisible" title="添加品牌">
        <el-form>
            <el-form-item label="品牌名称" label-width="100px">
                <el-input placeholder="请输入品牌名称" v-model="trademarkParams.tmName"></el-input>
            </el-form-item>
            <el-form-item label="品牌LOGO" label-width="100px">
                <!--upload
                action:action服图片上传路径书写/api
                -->
                <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload" :show-file-list="false"
                    :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>

            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">
                确定
            </el-button>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import type { ComponentSize } from 'element-plus';
import { ref, onMounted, reactive } from 'vue'
import { reqHasTrademark } from '@/api/product/trademark';
import type { Records, TradeMark, TradeMarkResponseData } from '@/api/product/trademark/type';
import type { UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'
const pageNo = ref<number>(1)
const limit = ref<number>(3)
const size = ref<ComponentSize>('default')
const background = ref(false)
const disabled = ref(false)
const total = ref<number>(0)
const dialogFormVisible = ref<boolean>(false)
//定义收集新增品牌数据
const trademarkParams = reactive<TradeMark>({
    tmName: '',
    logoUrl: ''
})
// 存储已有品牌的数据
const trademarkArr = ref<Records>([])
const getHasTrademark = async (pager = 1) => {
    pageNo.value = pager
    const result: TradeMarkResponseData = await reqHasTrademark(pageNo.value, limit.value);
    if (result.code == 200) {
        total.value = result.data.total
        trademarkArr.value = result.data.records
    }
}
//组件挂载完毕钩子--发一次请求获取第一页数据
onMounted(() => {
    getHasTrademark()
})

//分页器当前页码变化时触发
// const changePageNo = ()=>{
//     getHasTrademark()
// }
const sizeChange = () => {
    getHasTrademark()
}
//添加品牌按钮回调
const addTrademark = () => {
    dialogFormVisible.value = true

}
//修改已有品牌
const updateTrademark = () => {
    dialogFormVisible.value = true

}
//上传图片组件限制
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.type !== 'image/jpeg') {
        ElMessage.error('Avatar picture must be JPG format!')
        return false
    } else if (rawFile.size / 1024 / 1024 > 4) {
        ElMessage.error('Avatar picture size can not exceed 4MB!')
        return false
    }
    return true
}

</script>

<style scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>