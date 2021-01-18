import React from "react";

import { SvgIconTypeMap } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import Slide from "@material-ui/core/Slide";
import Typography from "@material-ui/core/Typography";

import { styles } from "./TeamOption.styles";

export enum TeamOptionDirection {
  Left = "left",
  Right = "right",
}

interface TeamOptionProps {
  direction: TeamOptionDirection;
  ariaLabel: string;
  description: string;
  IconComponent: OverridableComponent<SvgIconTypeMap>;
  onTeamAction: () => void;
}

export const TeamOption: React.FC<TeamOptionProps> = ({
  direction,
  ariaLabel,
  description,
  IconComponent,
  onTeamAction,
}) => {
  const classes = styles();

  return (
    <Slide direction={direction} timeout={600} in mountOnEnter unmountOnExit>
      <Grid item xs={6} sm={6} className={classes.centered}>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="center"
        >
          <Grid item>
            <IconButton
              aria-label={ariaLabel}
              className={classes.cyan}
              onClick={onTeamAction}
            >
              <IconComponent className={classes.actionIcon} />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography className={classes.cyan}>{description}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Slide>
  );
};
