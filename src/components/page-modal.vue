<template>
  <div class="page-modal" v-show="dialogVisible">
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      :width="modalConfig.modalWidth"
      :lock-scroll="false"
      center
      destroy-on-close
    >
      <slot name="modal">
        <div class="modal">
          <base-form
            ref="BaseFormRef"
            v-bind="modalConfig"
            v-model:formData="formData"
          >
          </base-form>
        </div>
        <slot></slot>
      </slot>
      <div class="footer">
        <slot name="footer">
          <div class="btnHandler">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="handleSubmit"> 确定 </el-button>
          </div>
        </slot>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {ref, watch, nextTick} from "vue";
import BaseForm from "@/components/base-form.vue";
import {CommonStore} from "@/store/common";

const store = CommonStore();
const props = defineProps({
  modalConfig: {
    type: Object,
    required: true,
  },
  defaultInfo: {
    type: Object,
    default: () => ({}),
  },
  pageName: {
    type: String,
    required: true,
  },
  otherInfo: {
    type: Object,
    default: () => ({}),
  },
});

const dialogVisible = ref(false);
const formData: any = ref({});
const dialogTitle = ref();
const modalTitle = props.modalConfig.modalTitle;
const BaseFormRef = ref<InstanceType<typeof BaseForm>>();

// 监视defaultInfo，设置formData的值
watch(
  () => props.defaultInfo,
  (newValue) => {
    for (const item of props.modalConfig.formItems) {
      // 判断item的类型是否为radio，且没有值时，设置默认值
      if (
        item.type === "radio" &&
        typeof newValue[`${item.field}`] === "undefined"
      ) {
        formData.value[`${item.field}`] = item.default;
      } else {
        formData.value[`${item.field}`] = newValue[`${item.field}`];
      }
    }
    nextTick(() => {
      if (newValue.avatar && BaseFormRef.value) {
        BaseFormRef.value.imageUrl = newValue.avatar;
      }
    });
  },
  {deep: true}
);

const handleSubmit = async () => {
  await BaseFormRef.value?.ruleFormRef?.validate((valid, fields) => {
    if (valid) {
      dialogVisible.value = false;

      if (props.defaultInfo._id) {
        store.editPageDataAction({
          pageName: props.pageName,
          editData: {...formData.value, ...props.otherInfo},
          id: props.defaultInfo._id,
        });
      } else {
        store.createPageDataAction({
          pageName: props.pageName,
          newData: {
            ...formData.value,
            ...props.otherInfo,
          },
        });
      }
    }
  });
};

defineExpose({
  modalTitle,
  dialogVisible,
  dialogTitle,
});
</script>

<style scoped lang="less">
.el-popup-parent--hidden {
  padding-right: 0 !important;
}
.page-modal {
  .footer {
    .btnHandler {
      display: flex;
      justify-content: right;
    }
  }
}
</style>
