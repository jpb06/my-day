import React from "react";

import Grid from "@material-ui/core/Grid";

import { styles } from "./StepTitle.styles";
import { TeamOnboardingStep } from "./TeamOnboarding";

interface StepTitleProps {
  step: TeamOnboardingStep;
}

export const StepTitle: React.FC<StepTitleProps> = ({ step }) => {
  const classes = styles();

  return (
    <Grid item xs={12} sm={12} className={classes.centered}>
      Welcome
      <h3 className={classes.title}>
        {
          {
            InitialState: <>Let's get yourself a team</>,
            NewTeam: <>Create a team</>,
            JoinTeam: <>Join a team</>,
            AddTeamMembers: <>Add members to your team</>,
          }[step]
        }
      </h3>
    </Grid>
  );
};
