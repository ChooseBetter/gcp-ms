import {contentConfigType} from "@/components/types";

export const contentConfig: contentConfigType = {
  title: "广场列表",
  ButtonTitle: "新建广场",
  tableList: [
    {
      prop: "avatar",
      label: "广场图片",
      minWidth: "90",
      slotName: "avatar",
      hasCustom: true,
    },
    {
      prop: "squareName",
      label: "广场名称",
      minWidth: "90",
      slotName: "squareName",
    },
    {
      prop: "introduce",
      label: "介绍",
      minWidth: "90",
      slotName: "introduce",
    },
    {
      prop: "announcement",
      label: "公告",
      minWidth: "90",
      slotName: "announcement",
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
