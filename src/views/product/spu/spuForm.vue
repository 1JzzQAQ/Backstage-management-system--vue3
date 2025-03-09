<template>
    <div>
        <el-form label-width="100px">
            <el-form-item label="SPU名称">
                <el-input placeholder="请输入SPU名称"></el-input>
            </el-form-item>
            <el-form-item label="SPU品牌">
                <el-select style="width: 120px;">
                    <el-option label="Huawei"></el-option>
                    <el-option label="OPPO"></el-option>
                    <el-option label="VIVO"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="SPU描述">
                <el-input type="textarea" placeholder="请输入SPU描述"></el-input>
            </el-form-item>
            <el-form-item label="SPU图标">
                <el-upload v-model:file-list="fileList"
                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" list-type="picture-card"
                    :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                    <el-icon>
                        <Plus />
                    </el-icon>
                </el-upload>

                <el-dialog v-model="dialogVisible">
                    <img w-full :src="dialogImageUrl" alt="Preview Image" />
                </el-dialog>

            </el-form-item>
            <el-form-item label="SPU销售属性">
                <!--展示销售属性下拉菜单-->
                <el-select style="width: 120px;">
                    <el-option label="Huawei"></el-option>
                    <el-option label="OPPO"></el-option>
                    <el-option label="VIVO"></el-option>
                </el-select>
                <el-button type="primary" icon="Plus" style="margin-left:5px;">添加属性值</el-button>
                <!--展示销售属性和属性值-->
                <el-table border style="margin: 10px 0;">
                    <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                    <el-table-column label="销售属性名" width="120px"></el-table-column>
                    <el-table-column label="销售属性值"></el-table-column>
                    <el-table-column label="操作" width="100px"></el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="default">保存</el-button>
                <el-button size="default" @click="cancel">取消</el-button>
            </el-form-item>

        </el-form>

    </div>
</template>

<script setup lang="ts">
import { reqAllSaleAttr, reqAllTradeMark, reqSpuHasSaleAttr, reqSpuImageList } from '@/api/product/spu';
import type { Trademark, AllTradeMark, HasSaleAttr, HasSaleAttrResponseData, SaleAttr, SaleAttrResponseData, SpuData, SpuHasImg, SpuImg } from '@/api/product/spu/types';
import { ref } from 'vue';

const $emit = defineEmits(['changeScence'])
//子组件点击取消按钮通知父组件切换场景为0展示已有spu数据
const cancel = () => {
    $emit('changeScence', 0)
}
//存储已有spu 数据
const allTradeMark = ref<Trademark[]>([])
const imgList = ref<SpuImg[]>([])
const saleAttr = ref<SaleAttr[]>([])
const allSaleAttr = ref<HasSaleAttr[]>([])

const initHasSpuData = async (spu: SpuData) => {
    //spu:即为父组件传来的spu对象（不完整）
    //获取全部品牌数据
    const result: AllTradeMark = await reqAllTradeMark()
    //获取某个品牌旗下全部售卖商品图片
    const result1: SpuHasImg = await reqSpuImageList((spu.id as number))
    //获取已有spu销售属性
    const result2: SaleAttrResponseData = await reqSpuHasSaleAttr((spu.id as number))
    //获取项目全部spu销售属性
    const result3: HasSaleAttrResponseData = await reqAllSaleAttr()
    allTradeMark.value = result.data
    imgList.value = result1.data
    saleAttr.value = result2.data
    allSaleAttr.value = result3.data
}
defineExpose({ initHasSpuData })
</script>

<style scoped></style>
