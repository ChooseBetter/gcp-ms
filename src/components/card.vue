<template>
  <el-card class="card">
    <template #header>
      <div class="card-header">
        <span>{{ title }}</span>
      </div>
    </template>
    <div class="item">
      <slot></slot>
    </div>
  </el-card>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
});
</script>

<style lang="less" scoped>
.card {
  &:deep(.el-card__header) {
    padding: 10px 20px !important;
  }
  &:deep(.el-card__body) {
    padding: 5px;
    height: 220px;
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 20px;
  font-size: 12px;
  span {
    color: #545c64;
    font-weight: bolder;
  }
}

.item {
  width: 100%;
}
</style>
