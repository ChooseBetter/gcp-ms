import router, {notFound} from "@/router";
import {managerStore} from "@/store/manager";
import Utils from "@/utils";

// 生成动态路由
export function generateRoute(treeMenu: any) {
  let routes = <any>[];
  const deepList = (parent: any, list: any) => {
    while (list.length) {
      let item = list.pop();
      // 当item有action时将值push给routes,也获取二级路由
      if (item.action) {
        routes.push({
          name: item.component,
          path: item.path,
          meta: {
            title: item.menuName,
            parentRoute: parent.menuName,
          },
          component: item.component,
        });
      } else if (item.children && !item.action) {
        //一级路由
        deepList(item, item.children);
      }
    }
  };
  deepList(null, treeMenu);
  return routes;
}

// 加载异步路由
export function loadAsyncRoutes() {
  const {managerMenus} = managerStore();
  let routes = generateRoute(JSON.parse(JSON.stringify(managerMenus)));
  router.removeRoute("not-found");
  routes.map((route: any) => {
    if (router.hasRoute(route.name)) return;
    let url = `./../views/${route.name}/${route.component}.vue`;
    route.component = () => import(/* @vite-ignore */ url);
    router.addRoute("layout", route);
  });
  router.addRoute(notFound);
}
