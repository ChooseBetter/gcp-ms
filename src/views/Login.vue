<template>
  <div class="login">
    <el-form
      class="container"
      ref="ruleFormRef"
      :model="loginData"
      :rules="rules"
    >
      <div class="title">登录</div>
      <el-form-item prop="managerName">
        <el-input
          class="commonInput"
          type="text"
          placeholder="用户名"
          v-model="loginData.managerName"
        />
      </el-form-item>
      <el-form-item prop="managerPwd">
        <el-input
          class="commonInput"
          type="password"
          placeholder="密码"
          v-model="loginData.managerPwd"
          @keyup.enter.native="handleLogin(ruleFormRef)"
        />
      </el-form-item>
      <el-form-item>
        <el-button class="loginBtn" @click="handleLogin(ruleFormRef)">
          登录
        </el-button>
      </el-form-item>
    </el-form>
    <div class="square">
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
    <div class="circle">
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import {storeToRefs} from "pinia";
import {useRouter} from "vue-router";
import {ElMessage, FormInstance, FormRules} from "element-plus";
import {managerStore} from "@/store/manager";
import {Md5} from "ts-md5";
import Utils from "@/utils";

const store = managerStore();
const router = useRouter();
const ruleFormRef = ref<FormInstance>();
const loginData = reactive({
  managerName: "",
  managerPwd: "",
});
const rules = reactive<FormRules>({
  managerName: [
    {
      required: true,
      message: "用户名不能为空",
      trigger: "blur",
    },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      message: "用户名必须是5-10个字母或数字",
      trigger: "blur",
    },
  ],
  managerPwd: [
    {
      required: true,
      message: "密码不能为空",
      trigger: "blur",
    },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: "密码必须是3位以上的字母或数字",
      trigger: "blur",
    },
  ],
});

// 登录操作
const handleLogin = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (!valid) {
      ElMessage({
        type: "warning",
        message: "登录信息验证不通过!",
      });
      return false;
    } else {
      // 对密码进行加密
      const md5 = new Md5();
      const salt = Utils.randomSeed(2.28);
      md5.appendStr(loginData.managerPwd + salt);
      const password = md5.end() as string;
      await store.LoginAction({
        managerName: loginData.managerName,
        managerPwd: password,
      });
      const {token} = storeToRefs(store);
      // 如果token不存在，说明登录失败
      if (!token) return false;
      await Utils.loadAsyncRoutes();
      router.push("/");
    }
  });
};
</script>

<style scoped lang="less">
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  /* 背景渐变 */
  background: linear-gradient(200deg, #e3c5eb, #a9c1ed);
  overflow: hidden;

  .container {
    position: relative;
    z-index: 1;
    background-color: #fff;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 21.875rem;
    height: 18.75rem;
    box-shadow: 0 0.3125rem 1.25rem rgba(0, 0, 0, 0.1);

    .title {
      margin: 2.1875rem auto 2.5rem auto;
      font-size: 1.625rem;
      font-weight: bold;
    }
    .commonInput {
      width: 17.5rem;
      height: 1.875rem;
      text-indent: 0.5rem;
    }
    .loginBtn {
      width: 17.5rem;
      height: 2.5rem;
      margin: 0.625rem auto;
      border: none;
      background: linear-gradient(-200deg, #fac0e7, #aac2ee);
      color: #fff;
      font-weight: bold;
      /* 减少文字间间距 */
      letter-spacing: 0.5rem;
      border-radius: 0.625rem;
      cursor: pointer;
      /* 动画过渡 */
      transition: 0.5s;
    }
    button:hover {
      background: linear-gradient(-200deg, #aac2ee, #fac0e7);
      background-position-x: -17.5rem;
    }
  }
  ul li {
    position: absolute;
    border: 0.0625rem solid #fff;
    background-color: #fff;
    width: 1.875rem;
    height: 1.875rem;
    list-style: none;
    opacity: 0;
  }
  .square {
    li {
      top: 40vh;
      left: 30vw;
      animation: square 10s linear infinite;
    }
    :nth-child(2) {
      top: 80vh;
      left: 10vw;
      animation-delay: 2s;
    }
    :nth-child(3) {
      top: 80vh;
      left: 85vw;
      animation-delay: 1s;
    }
    :nth-child(4) {
      top: 10vh;
      left: 70vw;
      animation-delay: 0.5s;
    }
    :nth-child(5) {
      top: 10vh;
      left: 5vw;
      animation-delay: 1s;
    }
  }
  .circle {
    li {
      bottom: 0;
      left: 15vw;
      animation: circle 10s linear infinite;
    }
    :nth-child(2) {
      bottom: 10vh;
      left: 80vw;
      animation-delay: 2s;
    }
    :nth-child(3) {
      bottom: 5vh;
      left: 30vw;
      animation-delay: 4s;
    }
    :nth-child(4) {
      bottom: 20vh;
      left: 55vw;
      animation-delay: 1s;
    }
    :nth-child(5) {
      bottom: 25vh;
      left: 70vw;
      animation-delay: 0.5s;
    }
  }
  @keyframes square {
    0% {
      transform: scale(0) rotateY(0deg);
      opacity: 1;
    }
    100% {
      transform: scale(5) rotateY(1000deg);
      opacity: 0;
    }
  }
  @keyframes circle {
    0% {
      transform: scale(0) rotateY(0deg);
      opacity: 1;
      bottom: 0;
      border-radius: 0;
    }
    100% {
      transform: scale(5) rotateY(1000deg);
      opacity: 0;
      bottom: 90vh;
      border-radius: 50%;
    }
  }
}
</style>
