<template>
  <div class="layout">
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <nav-bar :curRoute="curRoute"></nav-bar>
      </el-aside>
      <el-container>
        <el-header>
          <nav-header
            :isCollapse="isCollapse"
            :managerInfo="managerInfo"
            :curRoute="curRoute"
          ></nav-header>
        </el-header>
        <el-main>
          <router-view v-slot="{Component, route}">
            <!-- <keep-alive>
              <component :is="Component" :key="route.name"></component>
            </keep-alive> -->
            <component :is="Component" :key="route.name"></component>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import {ref, watch, onBeforeMount} from "vue";
import {CommonStore} from "@/store/common";
import {managerStore} from "@/store/manager";
import {storeToRefs} from "pinia";
import {useRouter} from "vue-router";
import Utils from "@/utils";
const store = CommonStore();
const {isCollapse} = storeToRefs(store);
const {token, managerInfo} = storeToRefs(managerStore());

const curRoute = ref({});
const router = useRouter();
watch(
  () => router.currentRoute.value,
  (newValue) => {
    curRoute.value = newValue;
  },
  {immediate: true, deep: true}
);

onBeforeMount(() => {
  if (!token.value) {
    const token = Utils.LocalCache().getCache("token");
    const managerInfo = Utils.LocalCache().getCache("managerInfo");
    managerStore().setBaseInfo(token, managerInfo);
  }
});
store.getEntireDataAction();
</script>

<style scoped lang="less">
.layout {
  .el-aside {
    background-color: #545c64;
    transition: width 0.3s linear;

    &::-webkit-scrollbar {
      display: none;
    }
  }
  .el-header {
    display: flex;
    text-align: center;
    align-items: center;
  }

  .el-main {
    padding: none;
    background: #eef0f3;
  }
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 50px);
}
</style>
