import {formProps} from "@/components/types";
import {CommonStore} from "@/store/common";
import {ref} from "vue";
const store = CommonStore();
let options = ref<any>([]);

export const searchConfig: formProps = {
  isInline: true,
  formItems: [
    {
      field: "title",
      label: "文章标题",
      type: "input",
      labelWidth: 80,
      width: 160,
      placeholder: "请输入文章标题",
    },
    {
      field: "author",
      label: "作者",
      type: "input",
      labelWidth: 80,
      width: 160,
      placeholder: "请输入作者名称",
    },
    {
      field: "category",
      label: "分类",
      type: "select",
      labelWidth: 60,
      width: 160,
      default: 0,
      options: options.value,
    },
  ],
};

store.$subscribe(
  (mutations, state: any) => {
    if (options.value.length !== 0) options.value = [];
    const result = [
      ...store.formatList("entireCategory", ["categoryName", "_id"]),
    ];

    result.unshift({label: "所有", value: 0});
    options.value.push(...result);
    searchConfig.formItems[2].options = options.value;
  },
  {detached: false, deep: true, immediate: true}
);
