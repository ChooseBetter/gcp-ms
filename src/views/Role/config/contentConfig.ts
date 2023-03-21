import {contentConfigType} from "@/components/types";

export const contentConfig: contentConfigType = {
  title: "角色列表",
  ButtonTitle: "新建角色",
  tableList: [
    {
      prop: "roleName",
      label: "角色名称",
      minWidth: "90",
      slotName: "roleName",
    },
    {
      prop: "remark",
      label: "备注",
      minWidth: "90",
      slotName: "remark",
    },
    {
      prop: "permissionList",
      label: "权限列表",
      minWidth: "90",
      slotName: "permissionList",
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
  showIndexColumn: false,
  showSelectColumn: true,
  showFooter: true,
};
