import React from "react";
//import { ReactQueryDevtools } from "react-query-devtools";
import { BrowserRouter, Route } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core/styles";

import theme from "../create.theme";
import { Login } from "./anonymous/Login";
import { WithGoogleAuth } from "./contexts/WithGoogleAuth";
import { WithSnackbar } from "./contexts/WithSnackbar";
import { WithUserTeams } from "./contexts/WithUserTeams";
import { Home } from "./signed-in/Home";
import { SignedIn } from "./signed-in/SignedIn";

export const App = () => (
  <>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <WithSnackbar>
        <WithGoogleAuth>
          <WithUserTeams>
            <BrowserRouter>
              <Route exact path="/login" component={Login} />

              <Route
                exact
                path="/"
                render={(props) => <SignedIn {...props} Component={Home} />}
              />
            </BrowserRouter>
          </WithUserTeams>
        </WithGoogleAuth>
      </WithSnackbar>
    </MuiThemeProvider>
    {/* <ReactQueryDevtools initialIsOpen /> */}
  </>
);
