import {formProps} from "@/components/types";

export const searchConfig: formProps = {
  isInline: true,
  formItems: [
    {
      field: "squareName",
      label: "广场名称",
      type: "input",
      labelWidth: 80,
      width: 160,
      placeholder: "请输入广场名称",
    },
  ],
};
