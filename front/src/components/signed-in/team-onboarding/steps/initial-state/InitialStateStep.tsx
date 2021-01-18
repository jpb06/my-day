import React from "react";

import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import CallMergeIcon from "@material-ui/icons/CallMerge";

import { TeamOnboardingStep } from "../../TeamOnboarding";
import { TeamOption, TeamOptionDirection } from "./TeamOption";

interface InitialStepProps {
  onStepChange: React.Dispatch<React.SetStateAction<TeamOnboardingStep>>;
}

export const InitialStep: React.FC<InitialStepProps> = ({ onStepChange }) => {
  const handleCreateAction = () => onStepChange("NewTeam");
  const handleJoinAction = () => onStepChange("JoinTeam");

  return (
    <>
      <TeamOption
        direction={TeamOptionDirection.Right}
        ariaLabel="create-team"
        description="Create a team"
        IconComponent={AddCircleOutlineIcon}
        onTeamAction={handleCreateAction}
      />
      <TeamOption
        direction={TeamOptionDirection.Left}
        ariaLabel="join-team"
        description="Join a team"
        IconComponent={CallMergeIcon}
        onTeamAction={handleJoinAction}
      />
    </>
  );
};
