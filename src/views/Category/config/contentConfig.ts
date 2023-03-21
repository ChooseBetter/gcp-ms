import {contentConfigType} from "@/components/types";

export const contentConfig: contentConfigType = {
  title: "分类列表",
  ButtonTitle: "新建分类",
  tableList: [
    {
      prop: "avatar",
      label: "分类图片",
      minWidth: "90",
      slotName: "avatar",
      hasCustom: true,
    },
    {
      prop: "categoryName",
      label: "分类名称",
      minWidth: "90",
      slotName: "categoryName",
    },
    {
      prop: "remark",
      label: "备注",
      minWidth: "90",
      slotName: "remark",
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
