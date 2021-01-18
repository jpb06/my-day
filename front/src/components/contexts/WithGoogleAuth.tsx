import { GoogleAuthHookProps, useGoogleAuth } from "gapi-oauth-react-hooks";
import React, { createContext } from "react";

import { ContextProps } from "../../types/context.component.props";

export const GoogleAuthContext = createContext<GoogleAuthHookProps>({
  onSignIn: async () => {},
  onSignOut: async () => {},
  state: "Loading",
});

export const WithGoogleAuth: React.FC<ContextProps> = ({ children }) => {
  const auth = useGoogleAuth();

  return (
    <GoogleAuthContext.Provider value={auth}>
      {children}
    </GoogleAuthContext.Provider>
  );
};
