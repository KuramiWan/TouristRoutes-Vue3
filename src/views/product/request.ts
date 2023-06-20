import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { get } from 'lodash-es';
import { getLocalToken, getTenantId } from './header';

/** 创建请求实例 */
function createService() {
  // 创建一个 axios 实例
  const service = axios.create();
  // 请求拦截
  service.interceptors.request.use(
    (config: any) => config,
    // 发送失败
    (error: any) => Promise.reject(error)
  );
  // 响应拦截（可根据具体业务作出相应的调整）
  service.interceptors.response.use(
    (response: AxiosResponse<any>) => {
      // apiData 是 api 返回的数据
      const apiData = response.data as any;

      // 这个 code 是和后端约定的业务 code
      const code = apiData.code;

      // 如果没有 code, 代表这不是项目后端开发的 api
      if (code === undefined) {
        // ElMessage.error('非本系统的接口');
        return Promise.reject(new Error('非本系统的接口'));
      } else {
        switch (code) {
          case 0:
            // code === 0 代表没有错误
            return apiData;
          case 200:
            // code === 20000 代表没有错误
            return apiData;
          default:
            // 不是正确的 code
            // ElMessage.error(apiData.msg || 'Error');
            return Promise.reject(new Error('Error'));
        }
      }
    },
    (error: any) => {
      // status 是 HTTP 状态码
      const status = get(error, 'response.status');
      switch (status) {
        case 400:
          error.message = '请求错误';
          break;
        case 401:
          error.message = '未授权，请登录';
          break;
        case 403:
          // // token 过期时，直接退出登录并强制刷新页面（会重定向到登录页）
          // useUserStoreHook().logout()
          // location.reload()
          break;
        case 404:
          error.message = '请求地址出错';
          break;
        case 408:
          error.message = '请求超时';
          break;
        case 500:
          error.message = '服务器内部错误';
          break;
        case 501:
          error.message = '服务未实现';
          break;
        case 502:
          error.message = '网关错误';
          break;
        case 503:
          error.message = '服务不可用';
          break;
        case 504:
          error.message = '网关超时';
          break;
        case 505:
          error.message = 'HTTP版本不受支持';
          break;
        case 530:
          error.message = '账号或密码错误';
          break;
        case 531:
          error.message = '公司代码不存在';
          break;
        default:
          break;
      }
      // ElMessage.error(error.message);
      return Promise.reject(error);
    }
  );
  return service;
}

/** 创建请求方法 */
function createRequestFunction(service: AxiosInstance) {
  return function (config: AxiosRequestConfig) {
    const configDefault = {
      headers: {
        // 携带 token
        // token: getToken(),
        'Content-Type': get(config, 'headers.Content-Type', 'application/json'),
        'X-Access-Token': getLocalToken(),
      },
      timeout: 5000,
      baseURL: import.meta.env.VITE_BASE_API,
      data: {},
    };
    return service(Object.assign(configDefault, config));
  };
}
//** 创建tenant-id请求 *
function createTenantRequestFunction(service: AxiosInstance) {
  return function (config: AxiosRequestConfig) {
    const configDefault = {
      headers: {
        // 携带 token
        // token: getToken(),
        'X-Access-Token': getLocalToken(),
        'Tenant-id': getTenantId(),
        'Content-Type': get(config, 'headers.Content-Type', 'application/json'),
      },
      timeout: 5000,
      baseURL: import.meta.env.VITE_BASE_API,
      data: {},
    };
    return service(Object.assign(configDefault, config));
  };
}

//为了请求后端端口的测试请求如果不适用此请同时修改courseManager.js
function createCoursePreview(service: AxiosInstance) {
  return function (config: AxiosRequestConfig) {
    const configDefault = {
      headers: {
        // 携带 token
        // token: getToken(),
        'X-Access-Token': getLocalToken(),
        'Tenant-id': getTenantId(),
        'Content-Type': get(config, 'headers.Content-Type', 'application/json'),
      },
      timeout: 5000,
      baseURL: import.meta.env.VITE_BASE_API,
      data: {},
    };
    return service(Object.assign(configDefault, config));
  };
}

/** 用于网络请求的实例 */
export const service = createService();
/** 用于网络请求的方法 */
export const request = createRequestFunction(service);
export const requestTenant = createTenantRequestFunction(service);

export const requestCoursePreview = createCoursePreview(service);
