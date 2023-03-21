import {formProps} from "@/components/types";

export const searchConfig: formProps = {
  isInline: true,
  formItems: [
    {
      field: "userName",
      label: "用户名称",
      type: "input",
      labelWidth: 90,
      width: 160,
      placeholder: "请输入用户名称",
    },
    {
      field: "email",
      label: "邮箱",
      type: "input",
      labelWidth: 90,
      width: 160,
      placeholder: "请输入邮箱",
    },
    {
      field: "sex",
      label: "性别",
      type: "select",
      labelWidth: 60,
      width: 160,
      default: 0,
      options: [
        {label: "所有", value: 0},
        {label: "男", value: 1},
        {label: "女", value: 2},
        {label: "未知", value: 3},
      ],
    },
  ],
};
