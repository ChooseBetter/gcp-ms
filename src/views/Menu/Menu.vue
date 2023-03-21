<template>
  <div class="menu">
    <page-search
      :searchConfig="searchConfig"
      @resetClick="handleReset"
      @queryClick="handleQuery"
    ></page-search>
    <page-content
      ref="pageContentRef"
      pageName="menus"
      :contentConfig="contentConfig"
      @newBtnClick="handleNewData"
      @editClick="handleEditData"
    >
      <template #extraBtn="scope">
        <el-button
          type="primary"
          size="small"
          :disabled="!isCreate"
          @click="handleNewMenu(scope.item)"
        >
          新增
        </el-button>
      </template>
      <template #menuType="scope">
        <el-tag :type="scope.row.menuType == 1 ? 'success' : ''" effect="light">
          {{ formatType(scope.row.menuType) }}
        </el-tag>
      </template>
      <template #menuState="scope">
        <el-tag :type="scope.row.menuState == 1 ? 'success' : 'danger'">
          {{ formatState(scope.row.menuState) }}
        </el-tag>
      </template>
    </page-content>
    <page-modal
      ref="pageModalRef"
      pageName="menus"
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
import usePermission from "@/hooks/use-permission";

const [pageContentRef, handleReset, handleQuery] = usePageSearch();
const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
  usePageModal();

// 获取操作的权限
const isCreate = usePermission("menus", "create");

const formatType = (value: number) => {
  switch (value) {
    case 1:
      return "菜单";
    case 2:
      return "按钮";
    default:
      break;
  }
};
const formatState = (value: number) => {
  switch (value) {
    case 1:
      return "正常";
    case 2:
      return "失效";
    default:
      break;
  }
};

// 新增
const handleNewMenu = (item: any) => {
  const ref = (pageModalRef as any).value;
  if (ref) {
    let parentId = [];
    if (item.parentId[0] === null) {
      parentId.push(item._id);
    } else {
      parentId.push(...item.parentId, item._id);
    }
    (defaultInfo as any).value = {parentId};
    ref.dialogVisible = true;
    ref.dialogTitle = "新建" + ref.modalTitle;
  }
};
</script>

<style scoped></style>
