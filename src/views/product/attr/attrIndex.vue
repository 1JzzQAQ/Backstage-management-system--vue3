<template>
  <div>
    <!--三级分类全局组件-->
    <Category :scene="scene" />
    <el-card style="margin: 10px 0;">
      <div v-show="scene == 0">
        <el-button @click="addAttr" type="primary" size="default" icon="plus"
          :disabled="categoryStore.c3Id ? false : true">添加属性</el-button>
        <el-table border style="margin: 10px 0;" :data="attrArr">
          <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
          <el-table-column label="属性名称" width="120px" prop="attrName"></el-table-column>
          <el-table-column label="属性值名称">
            <template #="{ row, $index }">
              <el-tag style="margin: 5px;" v-for="(item, index) in row.attrValueList" :key="item.id">{{ item.valueName
              }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120px">
            <template #="{ row, $index }">
              <!--修改已有属性值-->
              <el-button @click="updateAttr(row)" size="small" type="primary" icon="Edit"></el-button>
              <el-popconfirm :title="`你确定删除已有的${row.attrName}吗？`" width="200px" @confirm="deleteAttr(row.id)">
                <template #reference>
                  <el-button size="small" type="danger" icon="Delete"></el-button>
                </template>
              </el-popconfirm>

            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="scene == 1">
        <!--展示添加属性与修改属性的结构-->
        <el-form :inline="true">
          <el-form-item label="属性名称">
            <el-input placeholder="请输入属性名称 " v-model="attrParams.attrName"></el-input>
          </el-form-item>
        </el-form>
        <el-button @click="addAttrValue" :disabled="attrParams.attrName ? false : true" type="primary" size="default"
          icon="Plus">添加属性值</el-button>
        <el-button type="primary" size="danger" @click="cancel">取消</el-button>
        <el-table border style="margin:10px 0;" :data="attrParams.attrValueList">
          <el-table-column label="序号" width="80px" type="index" align="center"></el-table-column>
          <el-table-column label="属性值名称">
            <template #="{ row, $index }">
              <el-input :ref="(vc: any) => inputArr[$index] = vc" v-if="row.flag" @blur="toLook(row, $index)"
                placeholder="请输入属性值名称" v-model="row.valueName"></el-input>
              <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #="{ row, $index }">
              <el-button type="danger" size="small" icon="Delete"
                @click="attrParams.attrValueList.splice($index, 1)"></el-button>

            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" size="default" @click="save"
          :disabled="attrParams.attrValueList.length > 0 ? false : true">保存</el-button>
        <el-button type="primary" size="danger" @click="cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, reactive, nextTick, onBeforeUnmount } from 'vue'
//引入获取已有属性和属性值的接口方法
import { reqAttr, reqAddOrUpdateAttr, reqDeleteAttr } from '@/api/product/attr';
//获取分类仓库
import useCategoryStore from '@/stores/modules/category';
import type { Attr, AttrResponseData, AttrValue } from '@/api/product/attr/type';
import { ElMessage } from 'element-plus';
const categoryStore = useCategoryStore()
//存储已有的属性和属性值
const attrArr = ref<Attr[]>([])
//定义卡片组件内容切换变量
const scene = ref<number>(0)
//收集新增属性的数据
const attrParams = reactive<Attr>({
  attrName: "", //新增属性名字
  attrValueList: [],//新增属性数组
  categoryId: "", //三级分类id
  categoryLevel: 3 //三级分类
})
//准备数组：将来存储对应的组件实例el-input
const inputArr = ref<any>([])
//监听仓库三级分类ID的变化
watch(() => categoryStore.c3Id, () => {
  //清空上一次查询的属性与属性值
  attrArr.value = []
  //保证有三级分类id才能发请求
  if (!categoryStore.c3Id) { return }
  getAttr()
})
//获取已有属性和属性值方法
const getAttr = async () => {
  //获取分类的id
  const { c1Id, c2Id, c3Id } = categoryStore
  //获取分类下已有的属性和属性值
  const result: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id)
  if (result.code == 200) {
    attrArr.value = result.data
  }
}
//添加属性按钮回调
const addAttr = () => {
  //每次点击时先清空数据
  Object.assign(attrParams, {
    attrName: "", //新增属性名字
    attrValueList: [],//新增属性数组
    categoryId: categoryStore.c3Id, //三级分类id
    categoryLevel: 3 //三级分类
  })
  scene.value = 1
}
//修改属性按钮回调
const updateAttr = (row: Attr) => {
  scene.value = 1
  //将已有的属性对象复制给attrparams对象
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
}
//取消按钮的回调
const cancel = () => {
  scene.value = 0
}
//添加属性值按钮的回调
const addAttrValue = () => {
  //点击此按钮就向数组添加一个属性值对象
  attrParams.attrValueList.push({
    valueName: '',
    flag: true//控制每个属性值的编辑/查看模式
  })
  nextTick(() => {
    inputArr.value[attrParams.attrValueList.length - 1].focus()
  })
}
//保存按钮的回调
const save = async () => {
  const result: any = await reqAddOrUpdateAttr(attrParams)
  if (result.code == 200) {
    scene.value = 0
    ElMessage({
      type: 'success',
      message: attrParams.id ? '修改成功' : '添加成功'
    })
    //获取全部已有的
    getAttr()
  } else {
    ElMessage({
      type: 'error',
      message: attrParams.id ? '修改失败' : '添加失败'
    })
  }
}
//属性值表单元素失去焦点回调
const toLook = (row: AttrValue, $index: number) => {
  //非法情况判断1
  if (row.valueName.trim() == '') {
    //删除对应属性值为空的元素
    attrParams.attrValueList.splice($index, 1)
    ElMessage({
      type: 'error',
      message: '属性值不能为空'
    })
    return
  }
  //非法情况判断2
  const repeat = attrParams.attrValueList.find((item) => {
    //切记把当前失去焦点的属性值对象从当前数组扣除判断
    if (item != row) {
      return item.valueName === row.valueName
    }
  })
  if (repeat) {
    //删除重复属性值
    attrParams.attrValueList.splice($index, 1)
    ElMessage({
      type: 'error',
      message: '属性值不能重复'
    })
    return
  }
  row.flag = false
}
const toEdit = (row: AttrValue, $index: number) => {
  row.flag = true
  //nextTick响应式数据发生变化后获取更新的dom
  nextTick(() => {
    inputArr.value[$index].focus()
  })
}
const deleteAttr = async (attrId: number) => {
  const result: any = await reqDeleteAttr(attrId)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    //获取剩下已有属性（值）
    getAttr()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败'
    })
  }
}
//路由组件销毁时清空仓库分类相关数据
onBeforeUnmount(() => {
  //清空仓库数据
  categoryStore.$reset()
})
</script>

<style scoped></style>
