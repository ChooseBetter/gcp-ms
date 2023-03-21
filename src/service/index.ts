// service 统一出口
import HYRequest from "./request";
import {BASE_URL, TIME_OUT} from "./request/config";
import localCche from "@/utils/cache";
import router from "@/router";

const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config: any) => {
      //携带token的拦截
      const token = localCche.getCache("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        router.push("/login");
      }
      config.headers!["Content-Type"] =
        config.headers!["Content-Type"] || "application/json;charset=UTF-8";
      config.headers!["Accept"] = "application/json;charset=UTF-8";
      return config;
    },
    requestInterceptorCatch(error) {
      return error;
    },
    responseInterceptor(res) {
      return res;
    },
    responseInterceptorCatch(error) {
      return error;
    },
  },
});

export default hyRequest;
