<template>
  <div class="user">
    <page-search
      :searchConfig="searchConfig"
      @resetClick="handleReset"
      @queryClick="handleQuery"
    ></page-search>
    <page-content
      ref="pageContentRef"
      pageName="users"
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
    </page-content>
    <page-modal
      ref="pageModalRef"
      pageName="users"
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

const [pageContentRef, handleReset, handleQuery] = usePageSearch();
const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
  usePageModal();

const formatPhone = (cellphone: string) => {
  if (typeof cellphone !== "undefined" && cellphone !== "") {
    const phone = cellphone.replace(cellphone!.substring(3, 7), "****");
    return phone;
  }
};
</script>

<style scoped>
.avatar {
  width: 50px;
  height: 50px;
}
</style>
