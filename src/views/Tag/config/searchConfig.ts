import {formProps} from "@/components/types";

export const searchConfig: formProps = {
  isInline: true,
  formItems: [
    {
      field: "tagName",
      label: "标签名称",
      type: "input",
      labelWidth: 80,
      width: 160,
      placeholder: "请输入分类名称",
    },
  ],
};
