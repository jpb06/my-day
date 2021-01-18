import React, { useContext } from "react";

import { CircularProgress } from "@material-ui/core";
import { Card, CardActions, CardContent, CardMedia, Grid } from "@material-ui/core";

import { useLogin } from "../../hooks";
import { ThemeColor } from "../../theme/theme.colors";
import { GoogleAuthContext } from "../contexts/WithGoogleAuth";
import { Brand } from "../generic/brand/Brand";
import { GoogleButton } from "../generic/buttons/GoogleButton";
import { LoginError } from "./login-states/LoginError";
import { styles } from "./Login.styles";
import { RetryLogin } from "./RetryLogin";

export const Login = () => {
  const classes = styles();
  const { authResponse, state, onSignIn } = useContext(GoogleAuthContext);
  const [hasFailed, isApiLoading, login] = useLogin(authResponse?.id_token);

  const handleLoginRetry = () => login();

  const display = {
    Errored: <LoginError />,
    Loading: <CircularProgress size={50} style={{ color: ThemeColor.Amber }} />,
    SignedIn: (
      <CircularProgress size={50} style={{ color: ThemeColor.Amber }} />
    ),
    NotSignedIn: <GoogleButton onClick={onSignIn} />,
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      className={classes.root}
    >
      <Card className={classes.card}>
        <CardMedia className={classes.media} image="/img/Agile_low.jpg" />
        <CardContent>
          <Grid container justify="center" direction="row">
            <Brand color="amber" centered bigText />
          </Grid>
        </CardContent>
        <CardActions className={classes.actions}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            {hasFailed ? (
              <RetryLogin
                isLoading={isApiLoading}
                onLoginRetry={handleLoginRetry}
              />
            ) : (
              <>{display[state]}</>
            )}
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
};
