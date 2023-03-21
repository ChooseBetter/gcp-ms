import {formProps} from "@/components/types";
import {CommonStore} from "@/store/common";
import {ref} from "vue";
const store = CommonStore();
let options = ref<any>([]);

export const searchConfig: formProps = {
  isInline: true,
  formItems: [
    {
      field: "managerName",
      label: "管理员名称",
      type: "input",
      labelWidth: 90,
      width: 160,
      placeholder: "请输入管理员名称",
    },
    {
      field: "role",
      label: "角色",
      type: "select",
      labelWidth: 60,
      width: 160,
      default: 0,
      options: options.value,
    },
  ],
};

store.$subscribe(
  (mutations: any, state: any) => {
    if (options.value.length !== 0) options.value = [];
    const result = [...store.formatList("entireRole", ["roleName", "_id"])];
    result.unshift({label: "所有", value: 0});
    options.value.push(...result);
    searchConfig.formItems[1].options = options.value;
  },
  {detached: false, deep: true, immediate: false}
);
