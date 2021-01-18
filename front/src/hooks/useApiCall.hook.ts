import { useMutation } from "react-query";

import { ApiResponse } from "../types/api.response";
import { useApiCallHandling } from "./useApiCallHandling.hook";

export const useApiCall = <TPayload, TResult>(
  apiCall: (payload: TPayload) => Promise<ApiResponse<TResult>>,
  onSuccess?: (result: TResult) => void
) => {
  const [apiAction, { isError, isLoading, data }] = useMutation(apiCall);

  useApiCallHandling(isError, onSuccess, data);

  return {
    apiAction,
    isLoading,
    isErrored: isError || data?.success === false,
    data,
  };
};
