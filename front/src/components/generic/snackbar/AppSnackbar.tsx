import clsx from "clsx";
import React from "react";

import { IconButton } from "@material-ui/core";
import Snackbar, { SnackbarCloseReason } from "@material-ui/core/Snackbar";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import WarningIcon from "@material-ui/icons/Warning";

import { SnackbarData, SnackbarKind } from "../../../types";
import { DownTransition } from "../transitions/DownTransition";
import { styles } from "./AppSnackbar.styles";

export const snackbarKindToIcon = (type: SnackbarKind) => {
  switch (type) {
    case SnackbarKind.Success:
      return CheckCircleIcon;
    case SnackbarKind.Warning:
      return WarningIcon;
    case SnackbarKind.Error:
      return ErrorIcon;
    default:
      return InfoIcon;
  }
};

export const snackbarKindToClassName = (type: SnackbarKind, classes: any) =>
  classes[SnackbarKind[type].toLowerCase()];

interface AppSnackbarProps {
  onClose: (
    event: React.SyntheticEvent<any, Event>,
    reason?: SnackbarCloseReason
  ) => void;
  isOpen: boolean;
  message: SnackbarData;
}

export const AppSnackbar: React.FC<AppSnackbarProps> = ({
  onClose,
  isOpen,
  message,
}) => {
  const classes = styles();

  const Icon = snackbarKindToIcon(message.type);

  return (
    <Snackbar
      open={isOpen}
      message={
        <div className={classes.content}>
          <Icon titleAccess="snackbar-icon" />
          <span role="contentinfo" className={classes.text}>
            {message.text}
          </span>
        </div>
      }
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>,
      ]}
      ContentProps={{
        classes: {
          root: clsx(snackbarKindToClassName(message.type, classes)),
        },
      }}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      autoHideDuration={5000}
      TransitionComponent={DownTransition}
      transitionDuration={300}
      onClose={onClose}
    />
  );
};
