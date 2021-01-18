import { useContext, useEffect } from "react";

import { SnackbarContext } from "../components/contexts/WithSnackbar";
import { SnackbarKind as Kind } from "../types";
import { ApiResponse } from "../types/api.response";

export const useApiCallHandling = <TResult>(
  isError: boolean,
  onSuccess?: (result: TResult) => void,
  data?: ApiResponse<any>
) => {
  const showSnackbar = useContext(SnackbarContext);

  useEffect(() => {
    const getErrorDescription = (error: any) => {
      if (!error) return "An error occured";

      if (Array.isArray(error)) {
        console.log("API validaton error", error);
        return "A validation error occured";
      }

      return error;
    };
    if (isError || data?.success === false) {
      showSnackbar(Kind.Error, getErrorDescription(data?.error));
    }
  }, [isError, data, showSnackbar]);

  useEffect(() => {
    if (data?.success === true && onSuccess) {
      onSuccess(data.payload);
    }
  }, [data, onSuccess]);
};
