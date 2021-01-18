import React from "react";

import { SvgIconTypeMap } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";

import { BusyIndicator } from "../../../../../generic/feedback/BusyIndicator";
import { styles } from "./Loading.styles";

interface NewAccountBusyIndicatorProps {
  text: string;
  IconComponent: OverridableComponent<SvgIconTypeMap>;
}

export const Loading: React.FC<NewAccountBusyIndicatorProps> = ({
  text,
  IconComponent,
}) => {
  const classes = styles();

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      className={classes.waitingContainer}
    >
      <BusyIndicator
        text={text}
        color="Amber"
        IconComponent={IconComponent}
        hasTopPadding={false}
      />
    </Grid>
  );
};
