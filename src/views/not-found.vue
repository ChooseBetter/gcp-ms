<template>
  <div class="not-found">
    <div class="content">
      <h1>404</h1>
      <el-button @click="goHome">回首页</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useRouter} from "vue-router";
const router = useRouter();
const goHome = () => {
  router.push("/");
};
</script>

<style scoped lang="less">
.not-found {
  display: flex;
  justify-content: center;
  margin: 150px auto;
  .content {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 500px;
    h1 {
      font-size: 70px;
      font-weight: bold;
      color: #337ecc;
    }
    .el-button {
      width: 150px;
    }
  }
}
</style>
