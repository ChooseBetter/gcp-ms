import axios from "axios";
import type {AxiosInstance} from "axios";
import type {
  HYRequestConfig,
  HYRequestInterceptors,
  RequestConfig,
} from "./type";

import {ElLoading, ElMessage} from "element-plus";
import {LoadingInstance} from "element-plus/lib/components/loading/src/loading";
import router from "@/router";
import LocalCache from "@/utils/cache";

const DEFAULT_LOADING = true;
const TOKEN_INVALID = "Token认证失败，请重新登录";
const NETWORK_EROR = "网络请求异常，请稍后重试";

class HYRequest {
  instance: AxiosInstance;
  interceptors?: HYRequestInterceptors;
  showLoading: boolean;
  loading?: LoadingInstance;

  // 创建axios实例
  constructor(config: HYRequestConfig<any>) {
    this.instance = axios.create(config);

    // 保存基本信息
    this.interceptors = config.interceptors;
    this.showLoading = config.showLoading ?? DEFAULT_LOADING;

    // 使用拦截器
    // 1.从config中去除的拦截器是对应的实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );

    // 2.添加所有实例都有的拦截器
    this.instance.interceptors.request.use(
      (config: any) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: "正在请求...",
            background: "rgba(0,0,0,0.5)",
          });
          return config;
        }
      },
      (err) => {
        return err;
      }
    );

    this.instance.interceptors.response.use(
      (res: any) => {
        this.loading?.close();
        if (res.data) {
          const {code, msg} = res.data;
          if (code === 200) {
            return res.data;
          } else {
            ElMessage.error(msg || NETWORK_EROR);
            return Promise.reject(msg || NETWORK_EROR);
          }
        } else if (res?.response.data.code === 50001) {
          ElMessage.error(TOKEN_INVALID);
          setTimeout(() => {
            router.push({
              path: "/login",
              query: {redirect: router.currentRoute.value.path},
            });
          }, 1500);
          return Promise.reject(TOKEN_INVALID);
        } else {
          return;
        }
      },
      (err: any) => {
        if (err.response.status === 404) {
          return Promise.reject("404");
        }
        return err;
      }
    );
  }

  request<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1.单个请求对请求config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }

      // 2.判断是否需要显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading;
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 1.单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }
          // 2.将showLoading设置为true，否则会影响下一个请求
          this.showLoading = DEFAULT_LOADING;

          // 3.将结果resolve返回出去
          resolve(res);
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING;
          reject(err);
          return err;
        });
    });
  }

  get<T = any>(url: string, params?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>({url, params, ...config, method: "GET"});
  }
  post<T = any>(url: string, data: any, config?: RequestConfig): Promise<T> {
    return this.request<T>({url, data, ...config, method: "POST"});
  }
  delete<T = any>(url: string, data: any, config?: RequestConfig): Promise<T> {
    return this.request<T>({url, data, ...config, method: "DELETE"});
  }
  patch<T = any>(url: string, data: any, config?: RequestConfig): Promise<T> {
    return this.request<T>({url, data, ...config, method: "PATCH"});
  }
}

export default HYRequest;
