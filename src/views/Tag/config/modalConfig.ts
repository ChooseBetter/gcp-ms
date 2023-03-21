import {modalConfigType} from "@/components/types";

export const modalConfig: modalConfigType = {
  isInline: false,
  modalTitle: "标签",
  modalWidth: "30%",
  formItems: [
    {
      field: "tagName",
      label: "标签名称",
      type: "input",
      placeholder: "请输入标签名称",
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
