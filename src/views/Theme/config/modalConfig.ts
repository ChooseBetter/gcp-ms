import {modalConfigType} from "@/components/types";

export const modalConfig: modalConfigType = {
  isInline: false,
  modalTitle: "标签",
  modalWidth: "50%",
  formItems: [
    {
      field: "squareName",
      label: "所属广场",
      type: "input",
      placeholder: "请输入所属广场",
      labelWidth: 100,
    },
    {
      field: "authorName",
      label: "发起人名称",
      type: "input",
      placeholder: "请输入发起人名称",
      labelWidth: 100,
    },
  ],
};
