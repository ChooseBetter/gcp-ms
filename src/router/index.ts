import {createRouter, createWebHashHistory} from "vue-router";
// import Layout from "@/views/Layout.vue";
import Utils from "@/utils";

export const notFound = {
  path: "/:pathMatch(.*)*",
  name: "not-found",
  component: () => import("@/views/not-found.vue"),
};

const routes = [
  {
    path: "/",
    name: "layout",
    component: () => import("@/views/Layout.vue"),
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/views/Home/Home.vue"),
        meta: {
          title: "首页",
        },
      },
    ],
  },

  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"),
    meta: {
      title: "登录",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("@/views/not-found.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export let registerRouteFresh = true;

router.beforeEach(async (to, from, next) => {
  const token = Utils.LocalCache().getCache("token");
  if (!token) {
    if (to.path === "/login") {
      next();
    } else {
      next("/login");
    }
  } else {
    if (registerRouteFresh) {
      Utils.loadAsyncRoutes();
      next(to.path);
      registerRouteFresh = false;
    } else {
      next();
    }
  }
});

export default router;
