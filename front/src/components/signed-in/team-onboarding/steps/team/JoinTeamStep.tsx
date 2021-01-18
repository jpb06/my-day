import React from "react";

import CallMergeIcon from "@material-ui/icons/CallMerge";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";

import { TeamOnboardingStep } from "../../TeamOnboarding";
import { TeamActionForm } from "./form/TeamActionForm";

const text = {
  description: "Enter the name of the team you wish to join",
  cancelAction: "Nevermind, let's create a team",
  submitAction: "Request to join",
  loading: "Sending membership request ...",
};

interface JoinTeamStepProps {
  onStepChange: React.Dispatch<React.SetStateAction<TeamOnboardingStep>>;
}

export const JoinTeamStep: React.FC<JoinTeamStepProps> = ({ onStepChange }) => (
  <TeamActionForm
    type="Join"
    text={text}
    transitionDirection="left"
    ActionIcon={SupervisedUserCircleIcon}
    TitleIcon={CallMergeIcon}
    onStepChange={onStepChange}
  />
);
