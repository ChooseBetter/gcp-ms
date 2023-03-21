<template>
  <div class="category">
    <page-search
      :searchConfig="searchConfig"
      @resetClick="handleReset"
      @queryClick="handleQuery"
    ></page-search>
    <page-content
      ref="pageContentRef"
      pageName="themes"
      :contentConfig="contentConfig"
      @newBtnClick="handleNewData"
      @editClick="handleEditData"
    >
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
      pageName="themes"
      :modalConfig="modalConfig"
      :defaultInfo="defaultInfo"
    >
      <text-editor :editorStyle="{height: '100px'}" :editorHTML="editorHTML">
      </text-editor>
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

const [pageContentRef, handleReset, handleQuery] = usePageSearch();
const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
  usePageModal();

const editorHTML = ref();
const handleViewClick = (item: any) => {
  const ref = (pageModalRef as any).value;
  const {content} = item;
  editorHTML.value = {content};
  (defaultInfo as any).value = {
    squareName: item.squareName,
    authorName: item.authorName,
  };
  ref.dialogVisible = true;
  ref.dialogTitle = "查看" + ref.modalTitle;
};
</script>

<style scoped></style>
