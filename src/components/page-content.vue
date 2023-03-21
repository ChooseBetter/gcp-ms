<template>
  <el-card class="table-page">
    <base-table
      ref="baseTableRef"
      v-bind="contentConfig"
      :tableData="tableData"
      :total="total"
      v-model:page="pageInfo"
      @handlePageInfo="changePageInfo"
    >
      <template #headerHandler>
        <slot name="headerHandlerExtra"></slot>

        <el-button
          type="primary"
          size="default"
          v-if="contentConfig.ButtonTitle"
          :disabled="!isCreate"
          @click="handleNewClick"
        >
          {{ contentConfig.ButtonTitle }}
        </el-button>
        <el-button
          type="danger"
          v-if="contentConfig.showSelectColumn"
          :disabled="!isDelete"
          @click="handlerBatchDel"
        >
          批量删除
        </el-button>
      </template>
      <template #createTime="scope">
        <span v-dateFormat>{{ scope.row.createTime }}</span>
      </template>
      <template #updateTime="scope">
        <span v-dateFormat>{{ scope.row.updateTime }}</span>
      </template>
      <template #handler="scope">
        <slot name="handler">
          <div class="handle-btns">
            <slot name="extraBtn" :item="scope.row"></slot>
            <el-button
              type="primary"
              icon="Edit"
              size="small"
              v-if="isEdit"
              :disabled="!isEdit"
              @click="handleEditClick(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              type="danger"
              icon="Delete"
              size="small"
              :disabled="!isDelete"
              @click="handleDeleteClick(scope.row)"
            >
              删除
            </el-button>
          </div>
        </slot>
      </template>
      <!-- 动态插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row">{{
            otherPropSlots.length
          }}</slot>
        </template>
      </template>
    </base-table>
  </el-card>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import {CommonStore} from "@/store/common";
import {tableListType, pageInfoType} from "./types";
import {ElMessage} from "element-plus";
import Utils from "@/utils";
import usePermission from "@/hooks/use-permission";

const props = defineProps({
  contentConfig: {
    type: Object,
    required: true,
  },
  pageName: {
    type: String,
    required: true,
  },
});
const emits = defineEmits(["newBtnClick", "editClick"]);
const store = CommonStore();
const baseTableRef = ref();

// 获取操作的权限
const isCreate = usePermission(props.pageName, "create");
const isEdit = usePermission(props.pageName, "edit");
const isDelete = usePermission(props.pageName, "delete");

// 获取其他的动态插槽名称
const otherPropSlots: any = props.contentConfig.tableList.filter(
  (item: tableListType) => {
    if (!item.hasCustom) return false; // 是否自定义
    if (item.slotName === "createTime") return false;
    if (item.slotName === "updateTime") return false;
    if (item.slotName === "handler") return false;
    return true;
  }
);

// 页数信息：当前页码，数据条数
const pageInfo = ref<pageInfoType>({currentPage: 1, pageSize: 10});
// 表格内容
const tableData = ref<any>([]);
// 数据总数
const total = ref<any>(0);
// 监视页数信息
watch(pageInfo, () => getPageData(), {deep: true});
// 监视store中的数据
const subscribe = store.$subscribe(
  (mutation: any, state: any) => {
    if (
      mutation?.events.key === `${props.pageName}List` ||
      mutation?.events.key === `${props.pageName}Count`
    ) {
      tableData.value = state[`${props.pageName}List`] || [];
      total.value = state[`${props.pageName}Count`] || 0;
    }
  },
  {detached: false, deep: true, immediate: false}
);

// 获取表格内容
const getPageData = async (queryInfo: any = {}) => {
  await store.getPageDataAction({
    pageName: props.pageName,
    queryInfo: {
      offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
      size: pageInfo.value.pageSize,
      ...queryInfo,
    },
  });
};
getPageData();

// 新建
const handleNewClick = () => {
  emits("newBtnClick");
};
// 编辑
const handleEditClick = (item: any) => {
  emits("editClick", item);
};
// 删除
const handleDeleteClick = (item: any) => {
  store.deletePageDataAction({
    pageName: props.pageName,
    ids: [item._id],
  });
};
// 批量删除
const handlerBatchDel = () => {
  const multipleSelection = baseTableRef.value.multipleSelection;
  const ids = multipleSelection.map((item: any) => {
    return item._id;
  });
  if (ids.length === 0) {
    ElMessage({
      showClose: true,
      message: "请选择需要删除的信息",
      type: "warning",
    });
  } else {
    store.deletePageDataAction({
      pageName: props.pageName,
      ids,
    });
  }
};

// 最大数据数和当前页
const changePageInfo = (info: pageInfoType) => {
  pageInfo.value = info;
};

defineExpose({
  getPageData,
});
</script>

<style scoped lang="less">
.table-page {
  margin-top: 20px;
  background-color: #fff;
}
</style>
