import {formProps} from "@/components/types";
export const searchConfig: formProps = {
  isInline: true,
  formItems: [
    {
      field: "menuName",
      label: "菜单名称",
      type: "input",
      labelWidth: 80,
      width: 160,
      placeholder: "请输入菜单名称",
    },
    {
      field: "menuState",
      label: "菜单状态",
      type: "select",
      labelWidth: 80,
      width: 160,
      placeholder: "请选择菜单状态",
      default: 1,
      options: [
        {
          label: "正常",
          value: 1,
        },
        {
          label: "失效",
          value: 2,
        },
      ],
    },
  ],
};
