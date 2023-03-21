import {contentConfigType} from "@/components/types";
export const contentConfig: contentConfigType = {
  title: "管理员列表",
  ButtonTitle: "新建管理员",
  tableList: [
    {
      prop: "avatar",
      label: "管理员头像",
      minWidth: "90",
      slotName: "avatar",
      hasCustom: true,
    },
    {
      prop: "managerName",
      label: "管理员名称",
      minWidth: "90",
      slotName: "managerName",
    },
    {
      prop: "cellphone",
      label: "手机号码",
      minWidth: "90",
      slotName: "cellphone",
      hasCustom: true,
    },
    {
      prop: "role",
      label: "管理员角色",
      minWidth: "80",
      slotName: "role",
      hasCustom: true,
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
