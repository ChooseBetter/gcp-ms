import {modalConfigType} from "@/components/types";
import {CommonStore} from "@/store/common";
import {ref} from "vue";
const store = CommonStore();
let options = ref<any>([]);

export const modalConfig: modalConfigType = {
  isInline: false,
  modalTitle: "管理员",
  modalWidth: "30%",
  formItems: [
    {
      field: "avatar",
      label: "头像",
      type: "upload",
      extraType: "image",
      labelWidth: 80,
    },
    {
      field: "managerName",
      label: "用户名",
      type: "input",
      labelWidth: 80,
      width: "200px",
      placeholder: "请输入用户名",
    },
    {
      field: "cellphone",
      label: "手机号码",
      type: "input",
      labelWidth: 80,
      width: "200px",
      placeholder: "请输入手机号码",
    },
    {
      field: "sex",
      label: "性别",
      type: "select",
      labelWidth: 80,
      width: "200px",
      placeholder: "请选择性别",
      options: [
        {value: 1, label: "男"},
        {value: 2, label: "女"},
        {value: 3, label: "未知"},
      ],
    },
    {
      field: "role",
      label: "角色",
      type: "select",
      labelWidth: 80,
      width: "200px",
      placeholder: "请选择身份",
      default: 0,
      options: options.value,
    },
  ],
};

store.$subscribe(
  (mutations: any, state: any) => {
    if (options.value.length !== 0) options.value = [];
    const result = [...store.formatList("entireRole", ["roleName", "_id"])];
    options.value.push(...result);
    modalConfig.formItems[4].options = options.value;
  },
  {detached: false, deep: true, immediate: true}
);
