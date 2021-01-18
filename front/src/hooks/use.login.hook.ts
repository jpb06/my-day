import { useContext, useEffect, useMemo, useState } from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router";

import { apiLogin } from "../api";
import { SnackbarContext } from "../components/contexts/WithSnackbar";
import { UserTeamsContext } from "../components/contexts/WithUserTeams";
import { SnackbarKind } from "../types";
import { LocalStorageKey as Key } from "../types/local.storage.keys";

export const useLogin = (token?: string): [boolean, boolean, () => void] => {
  const history = useHistory();
  const showSnackbar = useContext(SnackbarContext);
  const { setTeams } = useContext(UserTeamsContext);
  const [login, { isSuccess, isError, data }] = useMutation(apiLogin);

  const [hasFailed, setHasFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sendTokenToApi = useMemo(() => {
    return async () => {
      setIsLoading(true);
      if (token) {
        await login({ token });
      }
      setIsLoading(false);
    };
  }, [token, login]);

  useEffect(() => {
    sendTokenToApi();
  }, [token, sendTokenToApi]);

  useEffect(() => {
    console.log("useLogin success useEffect", data, isSuccess, history);
    if (isSuccess && data?.success && data.payload) {
      localStorage.setItem(Key.Token, data.payload.token);
      localStorage.setItem(Key.Teams, JSON.stringify(data.payload.teams));
      localStorage.setItem(
        Key.ExpiresAt,
        new Date(new Date().getTime() + 30 * 60000).toISOString()
      );
      setTeams(data.payload.teams);
      history.push("/");
    }
  }, [data, isSuccess, history, setTeams]);

  useEffect(() => {
    if (isError || data?.error) {
      setHasFailed(true);
      showSnackbar(SnackbarKind.Error, "An error occured");
    }
  }, [isError, data, showSnackbar]);

  return [hasFailed, isLoading, sendTokenToApi];
};
