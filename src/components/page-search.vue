<template>
  <div class="search-page">
    <el-card>
      <base-form v-bind="searchConfig" v-model:formData="formData">
        <template #header> </template>
        <template #footer>
          <div class="handle-btns">
            <el-button icon="Refresh" @click="handleResetClick">重置</el-button>
            <el-button type="primary" icon="Search" @click="handleQueryClick">
              搜索
            </el-button>
          </div>
        </template>
      </base-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
const props = defineProps({
  searchConfig: {
    type: Object,
    required: true,
  },
});
const emits = defineEmits(["resetClick", "queryClick"]);

const formItems = props.searchConfig?.formItems ?? [];

// 表单数据初始状态
const formOriginData: any = {};
for (const item of formItems) {
  if (item.type === "select" || item.type === "radio") {
    formOriginData[item.field] = item.default;
  } else if (item.type === "checkbox" || item.type === "upload") {
    formOriginData[item.field] = [];
  } else {
    formOriginData[item.field] = undefined;
  }
}
const formData = ref({...formOriginData});

// 重置
const handleResetClick = () => {
  formData.value = formOriginData;
  emits("resetClick");
};
// 搜索
const handleQueryClick = () => {
  emits("queryClick", formData.value);
};
</script>

<style scoped lang="less">
.search-page {
  .handle-btns {
    display: flex;
    justify-content: right;
  }
}
</style>
