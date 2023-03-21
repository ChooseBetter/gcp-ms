<template>
  <div class="role">
    <page-search
      :searchConfig="searchConfig"
      @resetClick="handleReset"
      @queryClick="handleQuery"
    ></page-search>
    <page-content
      ref="pageContentRef"
      pageName="roles"
      :contentConfig="contentConfig"
      @newBtnClick="handleNewData"
      @editClick="handleEditData"
    >
      <template #permissionList="scope">
        {{ formatTree(scope.row.permissionList) }}
      </template>
    </page-content>
    <page-modal
      ref="pageModalRef"
      pageName="roles"
      :modalConfig="modalConfig"
      :defaultInfo="defaultInfo"
      :otherInfo="otherInfo"
    >
      <div style="margin-left: 10px">权限列表</div>
      <el-scrollbar height="150px" style="margin: 20px 0">
        <el-tree
          class="filter-tree"
          ref="elTreeRef"
          show-checkbox
          node-key="_id"
          :data="menuList"
          :props="{children: 'children', label: 'menuName', id: '_id'}"
          :default-checked-keys="checkedArr"
          @check="handleCheckChange"
        />
      </el-scrollbar>
    </page-modal>
  </div>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
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

// 完整的树结构
const menuList = ref([]);
const subscribe = store.$subscribe(
  (mutations, state: any) => {
    menuList.value = state.entireMenu;
  },
  {detached: false, deep: true, immediate: true}
);

const otherInfo = ref({});
// 传递给 data 属性的数组中该节点所对应的对象、树目前的选中状态对象，包含 checkedNodes、checkedKeys、halfCheckedNodes、halfCheckedKeys 四个属性
const handleCheckChange = (checkedItem: any, checkedState: any) => {
  const checkedKeys = checkedState.checkedKeys;
  const halfCheckedKeys = checkedState.halfCheckedKeys;
  otherInfo.value = {
    permissionList: {
      checkedKeys,
      halfCheckedKeys,
    },
  };
};

// 树形默认选中的数据
const checkedArr = ref<any>([]);
watch(
  () => defaultInfo,
  (newValue: any) => {
    checkedArr.value = [];
    // 判断是否为空对象
    if (Object.keys(newValue.value).length !== 0) {
      const {checkedKeys} = (newValue as any).value.permissionList;
      checkedArr.value.push(...checkedKeys);
    }
  },
  {deep: true}
);

// 格式化权限列表
const formatTree = (data: any) => {
  if (data.checkedKeys.length === 0) return "";
  // 勾选的id
  const checkedKeys = [...data.checkedKeys];
  // 完整菜单信息
  const entireMenu = JSON.parse(JSON.stringify(store.entireMenu));
  let secondMenu = <any>[];
  // 获取二级菜单
  entireMenu.forEach((item: any) => {
    if (item.children) secondMenu.push(...item.children);
  });
  let result = [];
  for (let item of secondMenu) {
    for (let key of checkedKeys) {
      if (item._id === key) result.push(item.menuName);
    }
  }
  return result.join("，");
};
</script>

<style scoped></style>
