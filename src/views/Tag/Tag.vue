<template>
  <div class="category">
    <page-search
      :searchConfig="searchConfig"
      @resetClick="handleReset"
      @queryClick="handleQuery"
    ></page-search>
    <page-content
      ref="pageContentRef"
      pageName="tags"
      :contentConfig="contentConfig"
      @newBtnClick="handleNewData"
      @editClick="handleEditData"
    ></page-content>
    <page-modal
      ref="pageModalRef"
      pageName="tags"
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

<style scoped></style>
