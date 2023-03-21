<template>
  <div class="nav-header">
    <div class="left">
      <el-icon :size="20" v-if="!isCollapse" @click="changeCollapse">
        <Fold />
      </el-icon>
      <el-icon :size="20" v-else @click="changeCollapse"><Expand /></el-icon>
      <breadcrumb :curRoute="curRoute"></breadcrumb>
    </div>
    <div class="right">
      <el-dropdown
        class="avatar"
        trigger="click"
        @visible-change="visibleChange"
        @command="handleCommand"
      >
        <span class="el-dropdown-link">
          <el-avatar
            :size="40"
            :src="managerInfo.avatar"
            style="border: 1px solid #ddd"
          />
          <el-icon class="el-icon--right" :class="isDown ? 'rotate' : ''">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item icon="User">
              {{ managerInfo.managerName || "***" }}
            </el-dropdown-item>
            <el-dropdown-item divided icon="SwitchButton" command="logout">
              退出
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import LocalCache from "@/utils/cache";
import {CommonStore} from "@/store/common";
import {managerStore} from "@/store/manager";
import {useRouter} from "vue-router";
import {managerInfoType} from "@/store/type";

interface Props {
  isCollapse: boolean;
  managerInfo: managerInfoType;
  curRoute: any;
}
const props = withDefaults(defineProps<Props>(), {
  isCollapse: true,
  managerInfo: () => ({
    _id: "",
    avatar: "",
    role: "",
    managerName: "",
    cellphone: "",
  }),
  curRoute: () => ({}),
});
const router = useRouter();
const store = CommonStore();
// 修改左侧菜单展开/收起
const changeCollapse = () => {
  store.changeCollapse(!props.isCollapse);
};

// 修改下拉菜单箭头
const isDown = ref(false);
const visibleChange = () => {
  isDown.value = !isDown.value;
};

const handleCommand = (command: string | number | object) => {
  if (command === "logout") {
    // 清空本地存储
    LocalCache.deleteCache("token");
    LocalCache.deleteCache("userInfo");
    // 清空pinia中的数据
    const {Logout} = managerStore();
    Logout();
    router.push("/login");
  }
};
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  .left {
    display: flex;
    justify-content: left;
    align-items: center;
  }
  .right {
    .avatar {
      .el-dropdown-link {
        display: flex;
        justify-content: space-around;
        align-items: center;
        text-align: center;
      }
    }
  }
}

.el-icon--right {
  transition: all 0.3s ease;
}
.rotate {
  transform: rotate(180deg);
}
</style>
