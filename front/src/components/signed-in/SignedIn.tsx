import React, { useEffect, useState } from "react";
import { ReactQueryCacheProvider, useIsFetching, useQueryCache } from "react-query";
import { useHistory } from "react-router";

import { Grid, LinearProgress } from "@material-ui/core";

import { setupAxios } from "../../api/config/axios.loggedin.instance";
import { LocalStorageKey as Key } from "../../types/local.storage.keys";
import { TopMenu } from "./menus/TopMenu";
import { styles } from "./SignedIn.styles";

interface SignedInProps {
  Component: React.ElementType;
}

export const SignedIn: React.FC<SignedInProps> = ({ Component, ...rest }) => {
  const classes = styles();
  const history = useHistory();
  const count = useIsFetching();
  const queryCache = useQueryCache();

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setupAxios(history);

    const token = localStorage.getItem(Key.Token);
    const expiresAt = localStorage.getItem(Key.ExpiresAt);
    const hasExpired = !expiresAt || Date.parse(expiresAt) < Date.now();
    if (!token || hasExpired) {
      localStorage.clear();
      history.push({
        pathname: "/login",
      });
    } else {
      setIsReady(true);
    }
  }, [history]);

  if (!isReady) return null;

  return (
    <>
      <TopMenu />
      {count > 0 && <LinearProgress aria-label="global-progress" />}
      <section className={classes.root}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
        >
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
            className={classes.fixedWidth}
          >
            <ReactQueryCacheProvider queryCache={queryCache}>
              <Component {...rest} />
            </ReactQueryCacheProvider>
          </Grid>
        </Grid>
      </section>
    </>
  );
};
