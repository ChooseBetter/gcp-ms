import {modalConfigType} from "@/components/types";

export const modalConfig: modalConfigType = {
  isInline: false,
  modalTitle: "标签",
  modalWidth: "30%",
  formItems: [
    {
      field: "avatar",
      label: "广场图片",
      type: "upload",
      extraType: "image",
      labelWidth: 80,
    },
    {
      field: "squareName",
      label: "广场名称",
      type: "input",
      placeholder: "请输入广场名称",
      labelWidth: 80,
    },
    {
      field: "introduce",
      label: "介绍",
      type: "textarea",
      placeholder: "请输入介绍内容",
      labelWidth: 80,
      rows: 3,
    },
    {
      field: "announcement",
      label: "公告",
      type: "textarea",
      placeholder: "请输入公告内容",
      labelWidth: 80,
      rows: 3,
    },
  ],
};
