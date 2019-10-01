import axios, { AxiosInstance, AxiosResponse, AxiosError, Method } from 'axios';

let baseURL = '';

// 添加请求拦截器
// axios.interceptors.request.use((config: AxiosRequestConfig) => config);

class Http {
  private axiosIns: AxiosInstance;
  constructor() {
    this.axiosIns = axios.create({
      baseURL,
      timeout: 10000
    });
  }

  public get(url: string, data: any = {}) {
    return this.base('get', url, data);
  }

  public post(url: string, data: any = {}, query = {}) {
    return this.base('post', url, query, data);
  }

  public put(url: string, data: any = {}, queryParams = false) {
    return this.base('put', url, queryParams ? data : null, data);
  }

  public base(method: Method, url: string, params: any = {}, data: any = {}) {
    return this.axiosIns
      .request({
        url,
        method,
        data,
        params
      })
      .then((res: AxiosResponse) => {
        if (res.status === 200) {
          return res.data || true;
        } else {
          return Promise.reject(res.data || {});
        }
      })
      .catch((err: AxiosError) => {
        const errData = (err.response && err.response.data) || {};

        const error: string = err.toString();
        if (error.includes('timeout')) {
          console.log('请求超时，请稍后再试');
          return Promise.reject(false);
        } else {
          return Promise.reject(errData);
        }
      });
  }
}

export default new Http();
