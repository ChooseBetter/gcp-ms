<template>
  <div class="user-page">
    <page-search
      :searchConfig="searchConfig"
      @resetClick="handleReset"
      @queryClick="handleQuery"
    ></page-search>
    <page-content
      ref="pageContentRef"
      pageName="managers"
      :contentConfig="contentConfig"
      @newBtnClick="handleNewData"
      @editClick="handleEditData"
    >
      <template #avatar="scope">
        <img class="avatar" :src="scope.row.avatar" alt="" />
      </template>
      <template #cellphone="scope">
        {{ formatPhone(scope.row.cellphone) }}
      </template>
      <template #role="scope">
        <el-tag
          v-if="scope.row.role"
          :type="formatRole(scope.row.role) === '超级管理员' ? 'success' : ''"
          effect="light"
        >
          {{ formatRole(scope.row.role) }}
        </el-tag>
      </template>
    </page-content>
    <page-modal
      ref="pageModalRef"
      pageName="managers"
      :modalConfig="modalConfig"
      :defaultInfo="defaultInfo"
    >
    </page-modal>
  </div>
</template>

<script setup lang="ts">
import {searchConfig} from "./config/searchConfig";
import {contentConfig} from "./config/contentConfig";
import {modalConfig} from "./config/modalConfig";
import {usePageSearch} from "@/hooks/use-page-search";
import {usePageModal} from "@/hooks/use-page-modal";
import {CommonStore} from "@/store/common";

const [pageContentRef, handleReset, handleQuery] = usePageSearch();
const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
  usePageModal();

const store = CommonStore();

const formatPhone = (cellphone: string) => {
  if (typeof cellphone !== "undefined") {
    const phone = cellphone.replace(cellphone!.substring(3, 7), "****");
    return phone;
  }
};
const formatRole = (role: string) => {
  for (let item of store.formatRole) {
    if (item.value === role) {
      return item.label;
    }
  }
};
</script>

<style scoped lang="less">
.avatar {
  width: 50px;
  height: 50px;
}
</style>
