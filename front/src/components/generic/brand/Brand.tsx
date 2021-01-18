import clsx from "clsx";
import React from "react";

import { Grid, Typography } from "@material-ui/core";
import UpdateIcon from "@material-ui/icons/Update";

import { styles } from "./Brand.styles";

interface BrandProps {
  color: "cyan" | "amber";
  centered?: boolean;
  hasMarginBottom?: boolean;
  bigText?: boolean;
}

export const Brand: React.FC<BrandProps> = ({
  color,
  centered = false,
  hasMarginBottom = false,
  bigText = false,
}) => {
  const classes = styles();

  return (
    <Grid
      container
      direction="row"
      justify={centered ? "center" : "flex-start"}
      alignItems={"flex-start"}
      className={hasMarginBottom ? classes.marginBottom : undefined}
    >
      <Grid item>
        <UpdateIcon
          className={clsx({
            [classes.amber]: color === "amber",
            [classes.cyan]: color === "cyan",
          })}
        />
      </Grid>
      <Grid item>
        <Typography
          className={clsx(classes.title, {
            [classes.amber]: color === "amber",
            [classes.cyan]: color === "cyan",
          })}
          variant={bigText ? "h4" : "h6"}
        >
          My day
        </Typography>
      </Grid>
    </Grid>
  );
};
