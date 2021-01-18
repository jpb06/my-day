import { useContext, useState } from "react";

import { apiCreateTeam, apiJoinTeam } from "../api";
import { UserTeamsContext } from "../components/contexts/WithUserTeams";
import {
    TeamAction, TeamOnboardingStep
} from "../components/signed-in/team-onboarding/TeamOnboarding";
import { BareTeam, TeamInvite } from "../stack-shared-code/types";
import { useApiCall } from "./useApiCall.hook";

export const useOnboardingTeamActionForm = (
  type: TeamAction,
  onStepChange: React.Dispatch<React.SetStateAction<TeamOnboardingStep>>
) => {
  const { setTeams } = useContext(UserTeamsContext);
  const [teamName, setTeamName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const apiCall = type === "Create" ? apiCreateTeam : apiJoinTeam;
  const { apiAction, isLoading, isErrored } = useApiCall<
    string,
    BareTeam | TeamInvite
  >(apiCall, (result) => {
    if (type === "Create") {
      setTeams([result as BareTeam]);
      onStepChange("AddTeamMembers");
    } else {
      // redirect
    }
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTeamName(event.target.value);

  const handleSubmit = () => {
    setIsSubmitted(true);
    if (!teamName || teamName.length === 0) return;

    apiAction(teamName);
  };

  return {
    teamName,
    isSubmitted,
    isLoading,
    isErrored,
    handleChange,
    handleSubmit,
  };
};
