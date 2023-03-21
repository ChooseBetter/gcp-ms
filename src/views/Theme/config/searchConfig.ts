import {formProps} from "@/components/types";
import {CommonStore} from "@/store/common";
import {ref} from "vue";
const store = CommonStore();
let options = ref<any>([]);

export const searchConfig: formProps = {
  isInline: true,
  formItems: [
    {
      field: "squareId",
      label: "所属广场",
      type: "select",
      labelWidth: 80,
      width: 160,
      default: 0,
      options: options.value,
    },
    {
      field: "authorName",
      label: "发起人名称",
      type: "input",
      placeholder: "请输入发起人名称",
      labelWidth: 100,
    },
    {
      field: "content",
      label: "话题内容",
      type: "input",
      placeholder: "请输入话题内容",
      labelWidth: 80,
    },
  ],
};

store.$subscribe(
  (mutations: any, state: any) => {
    if (options.value.length !== 0) options.value = [];
    const result = [...store.formatList("entireSquare", ["squareName", "_id"])];
    result.unshift({label: "所有", value: 0});
    options.value.push(...result);
    searchConfig.formItems[0].options = options.value;
  },
  {detached: false, deep: true, immediate: true}
);
