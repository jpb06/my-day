import clsx from "clsx";
import React from "react";

import { SvgIconTypeMap } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { cyan } from "@material-ui/core/colors";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";

import { styles } from "./SimpleButton.styles";

interface SimpleButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  text: string;
  icon?: OverridableComponent<SvgIconTypeMap> | JSX.Element;
  isFullWidth?: boolean;
  hasTopMargin?: boolean;
  color?: string;
}

export const SimpleButton: React.FC<SimpleButtonProps> = ({
  onClick,
  text,
  icon,
  isFullWidth = false,
  hasTopMargin = false,
  color = cyan[300],
}) => {
  const classes = styles();

  return (
    <Button
      fullWidth={isFullWidth}
      variant="outlined"
      className={clsx(classes.root, {
        [classes.topMargin]: hasTopMargin,
      })}
      onClick={onClick}
      startIcon={icon}
      style={{ color, borderColor: color }}
    >
      {text}
    </Button>
  );
};
