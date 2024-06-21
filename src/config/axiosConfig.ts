import Axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import Qs from "qs";

import store from "./../store";
import { notify } from "~/utils/notify";
import { authAction, tokenData } from "~/pages/Auth/slice";
import { AuthAPI } from "~/api/auth";
import { refreshToken } from "~/pages/Auth/actions";

const publicURLs: string[] = [AuthAPI.login];

Axios.defaults.baseURL = import.meta.env.VITE_APP_API_BASE_URL;
Axios.defaults.paramsSerializer = (params) =>
  Qs.stringify(params, { arrayFormat: "repeat" });
Axios.defaults.validateStatus = (status) => status >= 200 && status < 400;

Axios.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig> => {
    const storeState = store.getState();
    const { token } = storeState.auth;
    const currentTokenData = tokenData(storeState);
    const url: string = config.url || "";

    let newToken: string | null = null;

    if (
      currentTokenData?.exp &&
      currentTokenData.exp * 1000 < Date.now() &&
      url !== AuthAPI.refreshToken
    ) {
      try {
        const refreshTokenData = await store.dispatch(refreshToken()).unwrap();
        newToken = refreshTokenData.token;
      } catch (err) {
        store.dispatch(authAction.logout());
      }
    } else if (token) {
      newToken = token;
    }

    if (token && !publicURLs.includes(url)) {
      config.headers["Authorization"] = "Bearer " + newToken;
    }

    return config;
  }
);

Axios.interceptors.response.use(
  async (response: AxiosResponse): Promise<any> => {
    if (response.status === 401) {
      store.dispatch(authAction.logout());
    }

    if (response.data && !response.data.success && response.data.message) {
      notify(response.data.message, "error");

      return Promise.reject(response.data.message);
    }

    return response.data;
  },
  async (error: any): Promise<AxiosError> => {
    if (Axios.isCancel(error)) {
      return Promise.reject(error);
    }

    const errorData = error.toJSON();

    console.groupCollapsed("Error");
    console.log({ ...error });
    console.log(errorData);
    console.groupEnd();

    if (
      error.response &&
      error.response.status &&
      error.response.status === 401
    ) {
      store.dispatch(authAction.logout());
    }

    if (error.response && error.response.data && error.response.data.message) {
      notify(error.response.data.message, "error");
    } else if (error.message) {
      //notify(error.message, 'error');
    }

    return Promise.reject(error);
  }
);
