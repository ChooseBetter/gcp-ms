import {defineStore} from "pinia";
import {managerStateType, LoginDataType, managerInfoType} from "./type";
import {LoginRequest, getPermissionList} from "@/service/login";
import LocalCache from "@/utils/cache";

export const managerStore = defineStore("manager", {
  persist: {
    key: "manager",
    storage: window.sessionStorage,
    paths: ["managerInfo", "token", "managerMenus", "managerAction"],
  },
  state: (): managerStateType => {
    return {
      token: "",
      managerInfo: {
        _id: "",
        avatar: "",
        managerName: "",
        cellphone: "",
        role: "",
        roleName: "",
        loginTime: "",
      },
      managerMenus: [],
      managerAction: [],
    };
  },
  getters: {},
  actions: {
    // 登录
    async LoginAction(payload: LoginDataType) {
      // 获取用户信息和token
      const res = await LoginRequest(payload);
      if (!res.data) return;
      const {token, ...managerInfo} = res.data;
      this.setPermissionList();
      this.setBaseInfo(token, managerInfo);
    },
    setBaseInfo(token: string, managerInfo: managerInfoType) {
      this.token = token;
      this.managerInfo = managerInfo;
      LocalCache.setCache("token", token);
      LocalCache.setCache("managerInfo", managerInfo);
    },
    async setPermissionList() {
      // 获取用户的权限列表
      const res = await getPermissionList();
      if (!res.data) return;
      const {menuList, actionList} = res.data;
      this.managerMenus = menuList;
      this.managerAction = actionList;
    },
    //退出
    Logout() {
      // 重置数据
      this.token = "";
      this.managerInfo = {
        _id: "",
        avatar: "",
        managerName: "",
        cellphone: "",
        role: "",
        roleName: "",
        loginTime: "",
      };
      this.managerMenus = [];
      this.managerAction = [];
      LocalCache.deleteCache("token");
      LocalCache.deleteCache("managerInfo");
    },
  },
});
