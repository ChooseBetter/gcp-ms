import {contentConfigType} from "@/components/types";

export const contentConfig: contentConfigType = {
  title: "文章列表",
  tableList: [
    {
      prop: "title",
      label: "文章标题",
      minWidth: "90",
      slotName: "title",
    },
    {
      prop: "author",
      label: "作者",
      minWidth: "90",
      slotName: "author",
    },
    {
      prop: "category",
      label: "所属分类",
      minWidth: "90",
      slotName: "category",
      hasCustom: true,
    },
    {
      prop: "view",
      label: "查看数",
      minWidth: "90",
      slotName: "view",
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
