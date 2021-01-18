import axios from "axios";

import { ApiResponse } from "../../types/api.response";
import { LocalStorageKey } from "../../types/local.storage.keys";
import { AxiosInstance } from "../config/axios.loggedin.instance";
import { ApiRoute } from "./api.routes";

const on = (route: ApiRoute) => `${process.env.REACT_APP_API_URI}${route}`;

export const post = async <TData>(
  route: ApiRoute,
  data: any,
  expectedStatus: number = 200
): Promise<ApiResponse<TData>> => {
  try {
    const token = localStorage.getItem(LocalStorageKey.Token);
    const headers = token ? { authorization: `Bearer ${token}` } : undefined;

    const result = await AxiosInstance.post<TData>(on(route), data, {
      headers,
    });
    if (result.status === expectedStatus && result.data)
      return {
        success: true,
        payload: result.data,
      };

    return { success: false, error: "Invalid response" };
  } catch (error) {
    return error;
  }
};

export const anonymousPost = async <TData>(
  route: ApiRoute,
  data: any,
  expectedStatus: number = 200
): Promise<ApiResponse<TData>> => {
  try {
    const result = await axios.post<TData>(on(route), data);
    if (result.status === expectedStatus && result.data)
      return {
        success: true,
        payload: result.data,
      };

    return { success: false, error: "Invalid response" };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
