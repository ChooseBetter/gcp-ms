import {defineStore} from "pinia";
import {CommonType} from "./type";
import {
  getPageListData,
  createPageData,
  editPageData,
  deletePageData,
} from "@/service/system";

import {managerStore} from "@/store/manager";
import Utils from "@/utils";

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

export const CommonStore = defineStore("common", {
  state: (): CommonType => {
    return {
      isCollapse: false,
      entireMenu: [],
      entireRole: [],
      entireCategory: [],
      entireTag: [],
      entireSquare: [],
      managersList: [],
      managersCount: 0,
      menusList: [],
      rolesList: [],
      rolesCount: 0,
      categorysList: [],
      categorysCount: 0,
      usersList: [],
      usersCount: 0,
      tagsList: [],
      tagsCount: 0,
      articlesList: [],
      articlesCount: 0,
      themesList: [],
      themesCount: 0,
      squaresList: [],
      squaresCount: 0,
    };
  },
  getters: {
    formatRole(state) {
      return state.entireRole.map((item: any) => {
        return {
          label: item.roleName,
          value: item._id,
        };
      });
    },
    formatCategory(state) {
      return state.entireCategory.map((item: any) => {
        return {
          label: item.categoryName,
          value: item._id,
        };
      });
    },
    formatTag(state) {
      return state.entireTag.map((item: any) => {
        return {
          label: item.tagName,
          value: item._id,
        };
      });
    },
    formatList(state) {
      return (key: string, value: any) =>
        (state as any)[key].map((item: any) => {
          return {
            label: item[value[0]],
            value: item[value[1]],
          };
        });
    },
  },
  actions: {
    // 控制左侧栏
    changeCollapse(payload: boolean) {
      this.isCollapse = payload;
    },
    // 获取table信息
    async getPageDataAction(payload: any) {
      // 获取当前页面名称，根据名称设置请求url
      const pageName = payload.pageName;
      const pageUrl = `/${pageName}/list`;
      const pageResult = await getPageListData(pageUrl, payload.queryInfo);
      // 根据名称进行相应赋值
      (this as any)[`${pageName}List`] = pageResult.data["list"];
      if (pageResult.data["total"]) {
        (this as any)[`${pageName}Count`] = pageResult.data["total"];
      }
    },
    // 新建
    async createPageDataAction(payload: any) {
      // 1.创建数据的请求
      const {pageName, newData} = payload;
      const pageUrl = `/${pageName}/create`;
      // 当页面为管理员或用户时，设置请求头为"Content-Type": "multipart/form-data",
      if (
        pageName === "managers" ||
        pageName === "users" ||
        pageName === "categorys" ||
        pageName === "squares"
      ) {
        await createPageData(pageUrl, newData, config);
      } else {
        await createPageData(pageUrl, newData);
      }
      this.getPageDataAction({
        pageName,
        queryInfo: {
          offset: 0,
          size: 10,
        },
      });
      // 如果页面名称为菜单或角色时，触发请求完整数据操作
      if (pageName === "menus" || pageName === "roles") {
        this.getEntireDataAction();
      }
    },
    // 编辑
    async editPageDataAction(payload: any) {
      const {pageName, editData, id} = payload;
      const pageUrl = `/${pageName}/edit/${id}`;
      if (
        pageName === "managers" ||
        pageName === "users" ||
        pageName === "categorys" ||
        pageName === "squares"
      ) {
        await editPageData(pageUrl, editData, config);
      } else {
        await editPageData(pageUrl, editData);
      }
      this.getPageDataAction({
        pageName,
        queryInfo: {
          offset: 0,
          size: 10,
        },
      });
      if (pageName === "menus" || pageName === "roles") {
        this.getEntireDataAction();
      }
    },
    // 删除
    async deletePageDataAction(payload: any) {
      const {pageName, ids} = payload;
      const pageUrl = `/${pageName}/delete`;
      await deletePageData(pageUrl, ids);
      this.getPageDataAction({
        pageName,
        queryInfo: {
          offset: 0,
          size: 10,
        },
      });
      if (pageName === "menus" || pageName === "roles") {
        this.getEntireDataAction();
      }
    },
    // 获取完整信息
    async getEntireDataAction() {
      const queryInfo = {
        offset: 0,
        size: 1000,
      };
      const [res1, res2, res3, res4, res5] = await Promise.all([
        getPageListData("/menus/list", queryInfo),
        getPageListData("/roles/list", queryInfo),
        getPageListData("/categorys/list", queryInfo),
        getPageListData("/tags/list", queryInfo),
        getPageListData("/squares/list", queryInfo),
      ]);
      this.entireMenu = res1.data.list;
      this.entireRole = res2.data.list;
      this.entireCategory = res3.data.list;
      this.entireTag = res4.data.list;
      this.entireSquare = res5.data.list;

      // 获取登录用户的权限列表
      const store = managerStore();
      store.setPermissionList();
      // 加载动态路由
      Utils.loadAsyncRoutes();
    },
  },
});
