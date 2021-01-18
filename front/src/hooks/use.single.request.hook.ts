import { useQuery } from "react-query";
import { RefetchOptions } from "react-query/types/core/query";

import { ApiResponse } from "../types/api.response";

interface SingleRequestProps<T> {
  apiCall: (options?: RefetchOptions) => Promise<ApiResponse<T> | undefined>;
  isLoading: boolean;
  isErrored: boolean;
  isSuccess: boolean;
  isFetched: boolean;
  data?: T;
  error?: string;
}

export const useSingleRequest = <T>(
  apiCall: (key: string, ...args: Array<any>) => Promise<ApiResponse<T>>,
  ...args: Array<any>
): SingleRequestProps<T> => {
  const query = useQuery<ApiResponse<T>>([apiCall.name, ...args], apiCall, {
    enabled: false,
  });

  return {
    apiCall: query.refetch,
    isLoading: query.isLoading,
    isErrored: query.isError,
    isSuccess: query.isSuccess && query.data?.success === true,
    isFetched: query.isFetched,
    data: query.data?.payload,
    error: query.data?.error,
  };
};
