<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form">
          <h1>Hello</h1>
          <h2>Welcome to Guiguzhenxuan</h2>
          <el-form-item>
            <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input type="password" 
            :prefix-icon="Lock" 
            v-model="loginForm.password"
            show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="login_btn" 
            type="primary" 
            size="default"
            @click="login"
            >登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import {User,Lock} from '@element-plus/icons-vue';
import { reactive } from 'vue';
//引入用户相关的小仓库
import useUserStore from '@/stores/modules/user'
const useStore = useUserStore()
//收集表单数据
const loginForm = reactive({username:'admin',password:'111111'})
//登录按钮回调
const login = ()=>{
  //点击登录信息干什么？
  //通知仓库发登录请求
  //请求成功->跳转到home
  //请求失败->弹出失败信息
  useStore.userLogin(loginForm)
}

</script>

<style scoped>
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
}
.login_form{
  position: relative;
  width: 80%;
  top: 25vh;
  background: url('@/assets/images/login_form.png') no-repeat;
  background-size: cover;
  padding: 10px 40px;
  h1{
    color: white;
    font-size: 40px;
    border-bottom:0px ;
  }
  h2{
    font-size: 20px;
    color: white;
    border-top: 0px;
  }
  .login_btn{
    width: 100%;
  }
}
</style>
