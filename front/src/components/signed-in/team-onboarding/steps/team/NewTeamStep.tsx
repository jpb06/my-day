import React from "react";

import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import { TeamOnboardingStep } from "../../TeamOnboarding";
import { TeamActionForm } from "./form/TeamActionForm";

const text = {
  description: "Choose a name for your new team",
  cancelAction: "Nevermind, let's join a team",
  submitAction: "Create",
  loading: "Creating your new team ...",
};

interface NewTeamStepProps {
  onStepChange: React.Dispatch<React.SetStateAction<TeamOnboardingStep>>;
}

export const NewTeamStep: React.FC<NewTeamStepProps> = ({ onStepChange }) => (
  <TeamActionForm
    type="Create"
    text={text}
    transitionDirection="right"
    ActionIcon={AddCircleOutlineIcon}
    TitleIcon={AddCircleOutlineIcon}
    onStepChange={onStepChange}
  />
);
