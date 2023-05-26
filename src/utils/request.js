import axios from 'axios';
import { MessageBox, Message } from 'element-ui';

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
  timeout: 1000,
});

//前置拦截器
instance.interceptors.request.use(
  (config) => {
    /* 携带token */
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

//后置拦截器
instance.interceptors.response.use(
  (response) => {
    /* 响应code拦截 */
    const res = response.data;

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000,
      });

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm(
          'You have been logged out, you can cancel to stay on this page, or log in again',
          'Confirm logout',
          {
            confirmButtonText: 'Re-Login',
            cancelButtonText: 'Cancel',
            type: 'warning',
          },
        ).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload();
          });
        });
      }
      return Promise.reject(new Error(res.message || 'Error'));
    } else {
      return res;
    }
  },
  (error) => {
    const { response } = error;
    if (response && response.data) {
      return Promise.reject(error);
    }
    const { message } = error;
    console.error(message);
    return Promise.reject(error);
  },
);

export function get(url, params = {}) {
  return instance({
    method: 'get',
    url,
    params,
  });
}

export function post(url, data = {}, params = {}) {
  return instance({
    method: 'post',
    url,
    data,
    params,
  });
}

export default instance;
