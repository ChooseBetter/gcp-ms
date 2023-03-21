import {contentConfigType} from "@/components/types";
export const contentConfig: contentConfigType = {
  title: "用户列表",
  ButtonTitle: "新建用户",
  tableList: [
    {
      prop: "avatar",
      label: "用户头像",
      minWidth: "90",
      slotName: "avatar",
      hasCustom: true,
    },
    {
      prop: "userName",
      label: "用户名称",
      minWidth: "90",
      slotName: "userName",
    },
    {
      prop: "cellphone",
      label: "手机号码",
      minWidth: "90",
      slotName: "cellphone",
      hasCustom: true,
    },
    {
      prop: "email",
      label: "用户邮箱",
      minWidth: "80",
      slotName: "email",
    },
    {
      prop: "createTime",
      label: "创建时间",
      minWidth: "150",
      slotName: "createTime",
    },
    {
      prop: "updateTime",
      label: "更新时间",
      minWidth: "150",
      slotName: "updateTime",
    },
    {
      label: "操作",
      minWidth: "120",
      slotName: "handler",
    },
  ],
  showIndexColumn: true,
  showSelectColumn: true,
  showFooter: true,
};
