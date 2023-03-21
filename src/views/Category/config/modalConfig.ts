import {modalConfigType} from "@/components/types";

export const modalConfig: modalConfigType = {
  isInline: false,
  modalTitle: "分类",
  modalWidth: "30%",
  formItems: [
    {
      field: "avatar",
      label: "分类图片",
      type: "upload",
      extraType: "image",
      labelWidth: 80,
    },
    {
      field: "categoryName",
      label: "分类名称",
      type: "input",
      placeholder: "请输入分类名称",
      labelWidth: 80,
    },
    {
      field: "remark",
      label: "备注",
      type: "textarea",
      placeholder: "请输入备注内容",
      labelWidth: 80,
      rows: 3,
    },
  ],
};
