import Axios from "axios";
import { History, LocationState } from "history";

import { LocalStorageKey } from "../../types/local.storage.keys";

export let AxiosInstance = Axios.create();
let setupRequired = true;

export const setupAxios = (history: History<LocationState>) => {
  if (!setupRequired) return;

  AxiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem(LocalStorageKey.Token);
      const expiration = localStorage.getItem(LocalStorageKey.ExpiresAt);
      if (!token || !expiration) {
        localStorage.clear();
        history.push({
          pathname: "/login",
        });
        return Promise.reject("not logged");
      }

      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    (error) => Promise.reject(error)
  );
  AxiosInstance.interceptors.response.use(
    (response) => response,
    (error: any) => {
      if (error.response) {
        if (history && error.response.status === 401) {
          localStorage.clear();
          history.push({
            pathname: "/login",
          });
        }

        return Promise.reject({
          success: false,
          error: error.response.data,
        });
      } else if (error.request) {
        return Promise.reject({
          success: false,
          error: "The request was made but no response was received",
        });
      } else {
        return Promise.reject({
          success: false,
          error,
        });
      }
    }
  );

  setupRequired = false;
};
