<template>
  <div class="breadcrumb">
    <el-breadcrumb style="margin-left: 10px" separator="/">
      <template v-if="curRoute">
        <el-breadcrumb-item v-if="curRoute.meta.parentRoute">
          {{ curRoute.meta.parentRoute }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          {{ curRoute.meta.title }}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
interface Props {
  curRoute: {
    meta: {
      title: string;
      parentRoute: string;
    };
  };
}
const props = withDefaults(defineProps<Props>(), {});
</script>

<style scoped></style>
