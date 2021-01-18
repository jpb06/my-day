import React from "react";

import Grid from "@material-ui/core/Grid";

import { InitialStep } from "./steps/initial-state/InitialStateStep";
import { TeamMembers } from "./steps/team-members/TeamMembers";
import { JoinTeamStep } from "./steps/team/JoinTeamStep";
import { NewTeamStep } from "./steps/team/NewTeamStep";
import { StepTitle } from "./StepTitle";

export type TeamOnboardingStep =
  | "InitialState"
  | "NewTeam"
  | "JoinTeam"
  | "AddTeamMembers";
export type TeamAction = "Create" | "Join";

export const TeamOnboarding = () => {
  const [step, setStep] = React.useState<TeamOnboardingStep>("InitialState");

  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
      spacing={1}
      style={{ overflow: "hidden" }}
    >
      <StepTitle step={step} />
      {
        {
          InitialState: <InitialStep onStepChange={setStep} />,
          NewTeam: <NewTeamStep onStepChange={setStep} />,
          JoinTeam: <JoinTeamStep onStepChange={setStep} />,
          AddTeamMembers: <TeamMembers />,
        }[step]
      }
    </Grid>
  );
};
