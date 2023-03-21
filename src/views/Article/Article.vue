<template>
  <div class="article">
    <page-search
      :searchConfig="searchConfig"
      @resetClick="handleReset"
      @queryClick="handleQuery"
    ></page-search>
    <page-content
      ref="pageContentRef"
      pageName="articles"
      :contentConfig="contentConfig"
      @newBtnClick="handleNewData"
      @editClick="handleEditData"
    >
      <template #category="scope">
        {{ formatCategory(scope.row.category) }}
      </template>
      <template #extraBtn="scope">
        <el-button
          icon="Search"
          type="primary"
          size="small"
          @click="handleViewClick(scope.item)"
          >查看
        </el-button>
      </template>
    </page-content>
    <page-modal
      ref="pageModalRef"
      pageName="articles"
      :modalConfig="modalConfig"
      :defaultInfo="defaultInfo"
    >
      <text-editor :editorHTML="editorHTML"> </text-editor>
      <template #footer>
        <div class="btnHandler">
          <el-button type="primary" @click="handleSubmit">确定</el-button>
        </div>
      </template>
    </page-modal>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
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
const formatCategory = (category: string) => {
  for (let item of store.formatCategory) {
    if (item.value === category) {
      return item.label;
    }
  }
};

// 查看操作
const editorHTML = ref({});
const handleViewClick = (item: any) => {
  const ref = (pageModalRef as any).value;
  const {title, content} = item;
  editorHTML.value = {title, content};
  ref.dialogVisible = true;
  ref.dialogTitle = "查看" + ref.modalTitle;
};

// 确定操作
const handleSubmit = () => {
  const ref = (pageModalRef as any).value;
  ref.dialogVisible = false;
};
</script>

<style scoped>
.btnHandler {
  display: flex;
  justify-content: right;
}
</style>
