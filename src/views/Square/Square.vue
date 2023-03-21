<template>
  <div class="category">
    <page-search
      :searchConfig="searchConfig"
      @resetClick="handleReset"
      @queryClick="handleQuery"
    ></page-search>
    <page-content
      ref="pageContentRef"
      pageName="squares"
      :contentConfig="contentConfig"
      @newBtnClick="handleNewData"
      @editClick="handleEditData"
    >
      <template #avatar="scope">
        <img class="avatar" :src="scope.row.avatar" alt="" />
      </template>
    </page-content>
    <page-modal
      ref="pageModalRef"
      pageName="squares"
      :modalConfig="modalConfig"
      :defaultInfo="defaultInfo"
    ></page-modal>
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
</script>

<style scoped>
.avatar {
  width: 50px;
  height: 50px;
}
</style>
