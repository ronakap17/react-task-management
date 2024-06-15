import Axios, { AxiosError,  AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import Qs from 'qs';

import store from './../store';
import { notify } from '~/utils/notify';
import { authAction } from '~/pages/Auth/slice';
import { AuthAPI } from '~/api/auth';

Axios.defaults.baseURL = import.meta.env.VITE_APP_API_BASE_URL;
Axios.defaults.paramsSerializer = params => Qs.stringify(params, { arrayFormat: 'repeat' });
Axios.defaults.validateStatus = status => (status >= 200 && status < 400);

Axios.interceptors.request.use(async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
  const { token } = store.getState().auth;
  const url: string = config.url || '';
  const publicURLs: string[] = [AuthAPI.login]

  if (token && publicURLs.includes(url)) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }

  return config;
});

Axios.interceptors.response.use(
  (response: AxiosResponse): any => {
    if (response.status === 401) {
      store.dispatch(authAction.logout());
    }

    if (response.data && !response.data.success && response.data.message) {
      notify(response.data.message, 'error');

      return Promise.reject(response.data.message);
    }

    return response.data;
  },
  (error: any): Promise<AxiosError> => {
    if (Axios.isCancel(error)) {
      return Promise.reject(error);
    }

    const errorData = error.toJSON();

    console.groupCollapsed('Error');
    console.log({ ...error });
    console.log(errorData);
    console.groupEnd();

    if (error.response && error.response.status && error.response.status === 401) {
      store.dispatch(authAction.logout());
    }

    if (error.response && error.response.data && error.response.data.message) {
      notify(error.response.data.message, 'error');
    } else if (error.message) {
      //notify(error.message, 'error');
    }

    return Promise.reject(error);
  }
);
