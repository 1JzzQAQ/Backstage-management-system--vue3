<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForms">
          <h1>Hello</h1>
          <h2>Welcome to Guiguzhenxuan</h2>
          <el-form-item prop="username">
            <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" :prefix-icon="Lock" v-model="loginForm.password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" class="login_btn" type="primary" size="default" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue';
import { reactive, ref } from 'vue';
import { useRouter,useRoute } from 'vue-router'
import { ElNotification } from 'element-plus'
//引入用户相关的小仓库
import useUserStore from '@/stores/modules/user'
import { getTime } from '@/utils/time'
const useStore = useUserStore()
//获取el-form组件
const loginForms = ref()
//获取路由器
const $router = useRouter()
const $route = useRoute()
//定义变量控制按钮加载动画
const loading = ref(false)
//收集表单数据
const loginForm = reactive({ username: 'admin', password: '111111' })
//登录按钮回调
const login = async () => {
  //保证表单项校验通过再发请求
  await loginForms.value.validate()
  loading.value = true
  //点击登录信息干什么？
  //通知仓库发登录请求
  //请求成功->跳转到home
  //请求失败->弹出失败信息
  try {
    //可以书写.then的语法
    await useStore.userLogin(loginForm)
    //编程式导航跳转到展示数据的首页
    // judge route has query or not
    const rediret:any = $route.query.rediret
    $router.push({path:rediret || '/'})
    //登录成功的提示信息
    ElNotification({
      type: 'success',
      message: '欢迎回来',
      title: `Hi,${getTime()}好`
    })
    loading.value = false
  } catch (error) {
    loading.value = false
    //登录失败的提示信息
    ElNotification({
      type: 'error',
      message: error.message
    })
  }
}
//自定义校验规则
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validatorUserName = (rule: any, value: any, callback: any) => {
  //rule:校验规则对象  value：表单元素的文本内容  callback：函数，如果符合条件就放行，不符合注入错误提示信息
  if (value.length >= 5) {
    callback()
  } else {
    callback(new Error('账号长度至少5位'))
  }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validatorPassword = (rule: any, value: any, callback: any) => {
  if (value.length >= 6) {
    callback()
  } else {
    callback(new Error('密码长度至少6位'))
  }
}
//定义表单校验需要的配置对象
const rules = {
  username: [
    //{ required: true, message: '用户名不能为空', trigger: 'blur' },
    //{ min: 3, max: 5, message: '用户名长度必须要3-5位', trigger: 'change' },
    { trigger: 'change', validator: validatorUserName }
  ],
  password: [
    //{ required: true, min: 6, max: 15, message: '密码长度必须要6-15位', trigger: 'change' }，
    { trigger: 'change', validator: validatorPassword }
  ]
}
</script>

<style scoped>
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
}

.login_form {
  position: relative;
  width: 80%;
  top: 25vh;
  background: url('@/assets/images/login_form.png') no-repeat;
  background-size: cover;
  padding: 10px 40px;

  h1 {
    color: white;
    font-size: 40px;
    border-bottom: 0px;
  }

  h2 {
    font-size: 20px;
    color: white;
    border-top: 0px;
  }

  .login_btn {
    width: 100%;
  }
}
</style>
