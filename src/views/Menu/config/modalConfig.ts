import {modalConfigType} from "@/components/types";
import {CommonStore} from "@/store/common";
import {ref} from "vue";
const store = CommonStore();
let options = ref<any>([]);

export const modalConfig: modalConfigType = {
  isInline: false,
  modalTitle: "菜单",
  modalWidth: "30%",
  formItems: [
    {
      field: "parentId",
      label: "父级菜单",
      type: "cascader",
      labelWidth: 80,
      width: "250px",
      placeholder: "不选，则默认创建一级菜单",
      props: {
        value: "_id",
        label: "menuName",
        children: "children",
        checkStrictly: true,
      },
      options: options.value,
    },
    {
      field: "menuType",
      label: "菜单类型",
      type: "radio",
      labelWidth: 80,
      width: "200px",
      default: 1,
      options: [
        {label: "菜单", value: 1},
        {label: "按钮", value: 2},
      ],
    },
    {
      field: "menuName",
      label: "菜单名称",
      type: "input",
      labelWidth: 80,
      width: "250px",
      placeholder: "请输入菜单名称，例：系统管理",
    },
    {
      field: "icon",
      label: "菜单图标",
      type: "input",
      labelWidth: 80,
      width: "250px",
      placeholder: "请输入菜单图标，例：Setting",
      hidden: {
        hiddenKey: "menuType",
        hiddenValue: 1,
      },
    },
    {
      field: "path",
      label: "路由地址",
      type: "input",
      labelWidth: 80,
      width: "250px",
      placeholder: "请输入路由地址，例：/system/user",
      hidden: {
        hiddenKey: "menuType",
        hiddenValue: 1,
      },
    },
    {
      field: "menuCode",
      label: "权限标识",
      type: "input",
      labelWidth: 80,
      width: "250px",
      placeholder: "请输入权限标识，例：user-create、user-edit",
      hidden: {
        hiddenKey: "menuType",
        hiddenValue: 2,
      },
    },
    {
      field: "component",
      label: "组件路径",
      type: "input",
      labelWidth: 80,
      width: "250px",
      placeholder: "请输入组件地址，例：User、Menu",
      hidden: {
        hiddenKey: "menuType",
        hiddenValue: 1,
      },
    },
    {
      field: "menuState",
      label: "菜单状态",
      type: "radio",
      labelWidth: 80,
      width: "200px",
      default: 1,
      options: [
        {label: "正常", value: 1},
        {label: "停用", value: 2},
      ],
    },
  ],
};

const subscribe = store.$subscribe(
  (mutations, state: any) => {
    if (options.value.length !== 0) options.value = [];
    options.value.push(...state.menusList);
    modalConfig.formItems[0].options = options.value;
  },
  {detached: false, deep: true, immediate: true}
);
