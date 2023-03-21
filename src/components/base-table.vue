<template>
  <div class="base-table">
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <el-table
      style="width: 100%"
      :data="tableData"
      :max-height="tableStyle.maxHeight"
      :stripe="tableStyle.hasStripe"
      :row-key="tableTree.id"
      lazy
      :tree-props="tableTree.treeProps"
      @selection-change="handleSelectionChange"
    >
      <!-- 勾选 -->
      <el-table-column type="selection" width="30" v-if="showSelectColumn" />
      <!-- 序号 -->
      <el-table-column
        type="index"
        label="序号"
        width="80"
        align="center"
        v-if="showIndexColumn"
      />
      <template v-for="tableItem in tableList" :key="tableItem.prop">
        <el-table-column
          v-bind="tableItem"
          align="center"
          show-overflow-tooltip
        >
          <template #default="scope">
            <slot :name="tableItem.slotName" :row="scope.row">
              {{ scope.row[tableItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <el-pagination
          v-model:currentPage="page.currentPage"
          v-model:page-size="page.pageSize"
          :page-sizes="[10, 20, 30, 40]"
          :small="paginationStyle.small"
          :disabled="paginationStyle.disabled"
          :background="paginationStyle.background"
          layout="total, sizes, prev, pager, next, ->, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import {PropType, ref} from "vue";
import {
  pageInfoType,
  tableTreeType,
  tableStyleType,
  paginationStyleType,
} from "./types";
interface tableItemType {
  prop: string;
  label: string;
  slotName: string;
  minWidth: string;
}
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  tableData: {
    type: Array,
    required: true,
  },
  tableList: {
    type: Array as PropType<tableItemType[]>,
    required: true,
  },
  showIndexColumn: {
    type: Boolean,
    default: false,
  },
  showSelectColumn: {
    type: Boolean,
    default: false,
  },
  showFooter: {
    type: Boolean,
    default: true,
  },
  tableTree: {
    type: Object as PropType<tableTreeType>,
    default: () => ({
      id: "",
      treeProps: {},
    }),
  },
  // 总页数
  total: {
    type: Number,
    default: 0,
  },
  // 分页信息
  page: {
    type: Object,
    default: () => ({pageSize: 10, currentPage: 1}),
  },
  // 表格样式
  tableStyle: {
    type: Object as PropType<tableStyleType>,
    default: () => ({
      maxHeight: 370,
      hasStripe: true,
    }),
  },
  // 分页样式
  paginationStyle: {
    type: Object as PropType<paginationStyleType>,
    default: () => ({
      small: false,
      disabled: false,
      background: false,
    }),
  },
});

const emits = defineEmits(["handleSelections", "handlePageInfo"]);

// 选中的数据
const multipleSelection = ref<any[]>([]);
// 多选
const handleSelectionChange = (val: any[]) => {
  multipleSelection.value = val;
  emits("handleSelections", multipleSelection.value);
};

// 最大数据数和当前页
const pageInfo = ref<pageInfoType>({currentPage: 1, pageSize: 10});
const handleSizeChange = (pageSize: number) => {
  pageInfo.value.pageSize = pageSize;
  emits("handlePageInfo", pageInfo.value);
};
const handleCurrentChange = (currentPage: number) => {
  pageInfo.value.currentPage = currentPage;
  emits("handlePageInfo", pageInfo.value);
};
defineExpose({
  multipleSelection,
});
</script>

<style scoped lang="less">
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .handler {
    align-items: center;
  }
}

.footer {
  margin-top: 15px;

  .el-pagination {
    text-align: right;
  }
}
</style>
