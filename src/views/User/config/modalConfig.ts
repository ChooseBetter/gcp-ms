import {modalConfigType} from "@/components/types";

export const modalConfig: modalConfigType = {
  isInline: false,
  modalTitle: "用户",
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
      field: "userName",
      label: "用户名",
      type: "input",
      labelWidth: 80,
      width: "250px",
      placeholder: "请输入用户名",
    },
    {
      field: "cellphone",
      label: "手机号码",
      type: "input",
      labelWidth: 80,
      width: "250px",
      placeholder: "请输入手机号码",
    },
    {
      field: "email",
      label: "用户邮箱",
      type: "input",
      labelWidth: 80,
      width: "250px",
      placeholder: "请输入用户邮箱",
      append: ".com",
    },
    {
      field: "sex",
      label: "性别",
      type: "select",
      labelWidth: 80,
      width: "100px",
      placeholder: "请选择性别",
      options: [
        {label: "男", value: 1},
        {label: "女", value: 2},
        {label: "未知", value: 3},
      ],
    },
  ],
  rules: {
    userName: [
      {required: true, message: "用户名称不能为空", trigger: "blur"},
      {min: 3, max: 5, message: "长度在3~5之间", trigger: "blur"},
    ],
    cellphone: [
      {
        message: "手机号码格式不正确",
        trigger: "blur",
        pattern: /^1[3578]\d{9}$/,
      },
    ],
    email: [
      {required: true, message: "邮箱不能为空", trigger: "blur"},
      {
        message: "邮箱格式不正确",
        trigger: "blur",
        pattern: /^[1-9][0-9]{4,}@qq$/,
      },
    ],
  },
};
