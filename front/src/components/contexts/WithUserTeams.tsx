import React, { createContext, Dispatch, SetStateAction, useState } from "react";

import { BareTeam, TeamInvite } from "../../stack-shared-code/types";
import { ContextProps } from "../../types/context.component.props";

interface UserTeamsProps {
  teams: Array<BareTeam>;
  teamRequests: Array<TeamInvite>;
  setTeams: Dispatch<SetStateAction<Array<BareTeam>>>;
  setTeamRequests: Dispatch<SetStateAction<Array<TeamInvite>>>;
}

export const UserTeamsContext = createContext<UserTeamsProps>({
  setTeams: () => {},
  setTeamRequests: () => {},
  teams: [],
  teamRequests: [],
});

export const WithUserTeams: React.FC<ContextProps> = ({ children }) => {
  const [teams, setTeams] = useState<Array<BareTeam>>([]);
  const [teamRequests, setTeamRequests] = useState<Array<TeamInvite>>([]);

  return (
    <UserTeamsContext.Provider
      value={{ teams, teamRequests, setTeams, setTeamRequests }}
    >
      {children}
    </UserTeamsContext.Provider>
  );
};
