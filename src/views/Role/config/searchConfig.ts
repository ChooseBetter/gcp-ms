import {formProps} from "@/components/types";

export const searchConfig: formProps = {
  isInline: true,
  formItems: [
    {
      field: "roleName",
      label: "角色名称",
      type: "input",
      labelWidth: 80,
      width: 160,
      placeholder: "请输入角色名称",
    },
  ],
};
