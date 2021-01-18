import clsx from "clsx";
import React from "react";

import { SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import withStyles from "@material-ui/core/styles/withStyles";

import { styles } from "./BusyIndicator.styles";

type BusyIndicatorColor = "Amber" | "White";

interface BusyIndicatorProps {
  classes: any;
  text: string;
  color: BusyIndicatorColor;
  IconComponent: OverridableComponent<SvgIconTypeMap>;
  hasTopPadding: boolean;
}

const BusyIndicatorComponent: React.FC<BusyIndicatorProps> = ({
  classes,
  text,
  color,
  IconComponent,
  hasTopPadding,
}) => {
  return (
    <div
      className={clsx(classes.root, {
        [classes.topPadding]: hasTopPadding,
        [classes.amberColored]: color === "Amber",
        [classes.whiteColored]: color === "White",
      })}
    >
      <IconComponent
        titleAccess="busy-icon"
        className={clsx(classes.progressIcon, classes.spinner)}
      />
      <br />
      {text}
    </div>
  );
};

export const BusyIndicator = withStyles(styles)(BusyIndicatorComponent);
