<template>
  <div class="nav-bar">
    <div class="logo">
      <img src="@/assets/vue.svg" alt="" />
      <span>后台管理系统</span>
    </div>
    <el-menu
      class="el-menu-vertical-demo"
      :default-active="curRoute.path"
      :collapse="isCollapse"
      background-color="#545c64"
      active-text-color="#ffd04b"
      text-color="#fff"
      router
      unique-opened
    >
      <el-menu-item index="/home">
        <el-icon><House /></el-icon>
        <template #title>
          <span style="margin-left: 15px">首页</span>
        </template>
      </el-menu-item>
      <template v-for="menu in managerMenus" :key="menu._id">
        <!-- 有子菜单 -->
        <el-sub-menu
          v-if="menu.parentId[0] === null && menu.children"
          :index="menu.path"
          :hide-timeout="100"
        >
          <template #title>
            <el-icon>
              <component :is="menu.icon"></component>
            </el-icon>
            <span style="margin-left: 15px">{{ menu.menuName }}</span>
          </template>
          <template v-for="item in menu.children" :index="item._id">
            <el-menu-item
              v-if="item.menuType == 1 && item.menuState !== 2"
              :index="item.path"
              :disabled="!item.children"
            >
              {{ item.menuName }}
            </el-menu-item>
          </template>
        </el-sub-menu>
        <!-- 无子菜单 -->
        <el-menu-item v-else-if="menu.menuState !== 2" :index="menu.path">
          <el-icon>
            <component :is="menu.icon"></component>
          </el-icon>
          <template #title>
            <span style="margin-left: 15px">{{ menu.menuName }}</span>
          </template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import {storeToRefs} from "pinia";
import {CommonStore} from "@/store/common";
import {managerStore} from "@/store/manager";

const props = defineProps({
  curRoute: {
    type: Object,
    default: () => ({}),
  },
});

const store = CommonStore();
const {managerMenus} = storeToRefs(managerStore());
const {isCollapse} = storeToRefs(store);
</script>

<style scoped lang="less">
.nav-bar {
  width: 100%;
  height: 100vh;
  .logo {
    display: flex;
    align-items: center;
    font-size: 18px;
    height: 50px;
    color: #fff;
    overflow: hidden;
    img {
      margin: 0 16px;
      width: 32px;
      height: 32px;
    }
    span {
      font-weight: bold;
    }
  }
  .el-menu {
    height: calc(100% - 50px);
    border: none;
  }
}
</style>
