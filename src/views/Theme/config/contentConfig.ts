import {contentConfigType} from "@/components/types";

export const contentConfig: contentConfigType = {
  title: "话题列表",
  tableList: [
    {
      prop: "squareName",
      label: "所属广场",
      minWidth: "90",
      slotName: "squareName",
    },
    {
      prop: "authorName",
      label: "发起人名称",
      minWidth: "90",
      slotName: "authorName",
    },
    {
      prop: "likeCount",
      label: "点赞数",
      minWidth: "90",
      slotName: "likeCount",
    },
    {
      prop: "commentCount",
      label: "评论数",
      minWidth: "90",
      slotName: "commentCount",
    },
    {
      prop: "createTime",
      label: "创建时间",
      minWidth: "150",
      slotName: "createTime",
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
