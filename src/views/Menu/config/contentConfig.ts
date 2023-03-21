import {contentConfigType} from "@/components/types";
export const contentConfig: contentConfigType = {
  title: "菜单列表",
  ButtonTitle: "新增菜单",
  tableList: [
    {
      prop: "menuName",
      label: "菜单名称",
      minWidth: "70",
      slotName: "menuName",
    },
    {
      prop: "icon",
      label: "图标",
      minWidth: "70",
      slotName: "icon",
    },
    {
      prop: "menuType",
      label: "菜单类型",
      minWidth: "50",
      slotName: "menuType",
      hasCustom: true,
    },
    {
      prop: "menuCode",
      label: "权限标识",
      minWidth: "70",
      slotName: "menuCode",
    },
    {
      prop: "path",
      label: "路由地址",
      minWidth: "70",
      slotName: "path",
    },
    {
      prop: "component",
      label: "组件地址",
      minWidth: "70",
      slotName: "component",
    },
    {
      prop: "menuState",
      label: "菜单状态",
      minWidth: "50",
      slotName: "menuState",
      hasCustom: true,
    },
    {
      prop: "updateTime",
      label: "更新时间",
      minWidth: "120",
      slotName: "updateTime",
    },
    {
      label: "操作",
      minWidth: "150",
      slotName: "handler",
    },
  ],
  showIndexColumn: false,
  showSelectColumn: false,
  showFooter: false,
  tableTree: {
    id: "_id",
    treeProps: {children: "children", hasChildren: "hasChildren"},
  },
};
