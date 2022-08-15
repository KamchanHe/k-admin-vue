import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import qs from 'qs';
import { ElMessage, ElMessageBox } from 'element-plus';
import { getToken } from '@/utils/auth';
import { useUserStore } from '@/store';

export type ResultType<T> = {
  code: number;
  message: string;
  data: T;
};

class Service {
  instance: AxiosInstance;

  baseConfig: AxiosRequestConfig = {
    baseURL: window.config.baseUrl,
    timeout: 1000 * 30
  };

  constructor(config?: AxiosRequestConfig) {
    this.instance = axios.create(Object.assign(this.baseConfig, config));

    this.instance.interceptors.request.use((request: AxiosRequestConfig) => {
      if (!request.headers) {
        throw new Error(
          'Expected "request" and "request.headers" not to be undefined'
        );
      }
      const token: string = getToken();
      if (token) {
        request.headers.Authorization = token;
      }
      return request;
    });

    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        const res = response.data;

        // if the custom code is not 20000, it is judged as an error.
        if (res.code !== 20000) {
          ElMessage.error(res.message || 'Error');

          // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
          if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
            // to re-login
            ElMessageBox.confirm(
              'You have been logged out, you can cancel to stay on this page, or log in again',
              'Confirm logout',
              {
                confirmButtonText: 'Re-Login',
                cancelButtonText: 'Cancel',
                type: 'warning'
              }
            )
              .then(async () => {
                const userStore = useUserStore();
                await userStore.logout();
                window.location.reload();
                return null;
              })
              .catch((error) => {
                throw new Error(error);
              });
          }
          return Promise.reject(new Error(res.message || 'Error'));
        }
        return res;
      },
      (error) => {
        const { message } = error.response.data;
        ElMessage({
          message: message || '系统出错',
          type: 'error'
        });
        return Promise.reject(new Error(message || 'Error'));
      }
    );
  }

  public request(config: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.instance.request(config);
  }

  public get<Q, S>(
    url: string,
    params?: Q,
    extraConfig?: AxiosRequestConfig
  ): Promise<ResultType<S>> {
    return this.instance.get(url, {
      params,
      paramsSerializer(parameter) {
        return qs.stringify(parameter, { arrayFormat: 'repeat' });
      },
      ...extraConfig
    });
  }

  public post<Q, S>(
    url: string,
    data?: Q,
    extraConfig?: AxiosRequestConfig
  ): Promise<ResultType<S>> {
    return this.instance.post(url, {
      ...data,
      ...extraConfig
    });
  }

  public put<Q, S>(
    url: string,
    data?: Q,
    extraConfig?: AxiosRequestConfig
  ): Promise<ResultType<S>> {
    return this.instance.put(url, {
      ...data,
      ...extraConfig
    });
  }

  public delete<Q, S>(
    url: string,
    params?: Q,
    extraConfig?: AxiosRequestConfig
  ): Promise<ResultType<S>> {
    return this.instance.delete(url, {
      params,
      ...extraConfig
    });
  }
}

export default Service;
