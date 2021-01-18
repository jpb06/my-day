import clsx from "clsx";
import React from "react";

import { SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import withStyles from "@material-ui/core/styles/withStyles";

import { styles } from "./GlobalError.styles";

interface GlobalErrorProps {
  classes: any;
  title: string;
  content: React.ReactNode;
  Icon: OverridableComponent<SvgIconTypeMap>;
  hasTopMargin: boolean;
}

const GlobalErrorComponent: React.FC<GlobalErrorProps> = ({
  classes,
  title,
  content,
  Icon,
  hasTopMargin,
}) => {
  return (
    <div
      className={clsx(classes.root, {
        [classes.topMargin]: hasTopMargin,
      })}
    >
      <Icon className={clsx(classes.errorIcon, classes.spinner)} />
      <div className={classes.title}>{title}</div>
      <span className={classes.message}>{content}</span>
    </div>
  );
};

export const GlobalError = withStyles(styles)(GlobalErrorComponent);
