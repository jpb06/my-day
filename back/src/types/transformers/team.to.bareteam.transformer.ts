import { BareTeam, Team } from "../../../../front/src/stack-shared-code/types";

export const toBareTeam = (team: Team): BareTeam => ({
  _id: team._id,
  name: team.name,
});
