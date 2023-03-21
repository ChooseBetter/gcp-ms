import {contentConfigType} from "@/components/types";

export const contentConfig: contentConfigType = {
  title: "标签列表",
  ButtonTitle: "新建标签",
  tableList: [
    {
      prop: "tagName",
      label: "标签名称",
      minWidth: "90",
      slotName: "tagName",
    },
    {
      prop: "remark",
      label: "备注",
      minWidth: "90",
      slotName: "remark",
    },
    {
      prop: "",
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
