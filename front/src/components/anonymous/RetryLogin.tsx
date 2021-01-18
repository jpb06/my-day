import React from "react";

import { CircularProgress } from "@material-ui/core";

import { ThemeColor } from "../../theme/theme.colors";
import { SimpleButton } from "../generic/buttons/SimpleButton";

interface RetryLoginProps {
  onLoginRetry: () => void;
  isLoading: boolean;
}

export const RetryLogin: React.FC<RetryLoginProps> = ({
  onLoginRetry,
  isLoading,
}) => (
  <>
    {isLoading ? (
      <CircularProgress size={50} style={{ color: ThemeColor.Amber }} />
    ) : (
      <SimpleButton text="Retry" onClick={onLoginRetry} />
    )}
  </>
);
