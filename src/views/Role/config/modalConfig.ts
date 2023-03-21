import {modalConfigType} from "@/components/types";

export const modalConfig: modalConfigType = {
  isInline: false,
  modalTitle: "角色",
  modalWidth: "30%",
  formItems: [
    {
      field: "roleName",
      label: "角色名称",
      type: "input",
      placeholder: "请输入角色名称",
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
