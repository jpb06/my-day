import React from "react";

import { Fab, SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";

import { styles } from "./TopLeftButton.styles";

interface TopLeftButtonProps {
  onClick: () => void;
  IconComponent: OverridableComponent<SvgIconTypeMap>;
}

export const TopLeftButton: React.FC<TopLeftButtonProps> = ({
  onClick,
  IconComponent,
}) => {
  const classes = styles();

  return (
    <Fab onClick={onClick} className={classes.root}>
      <IconComponent fontSize="large" />
    </Fab>
  );
};
