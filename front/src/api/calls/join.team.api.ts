import { TeamInvite } from "../../stack-shared-code/types";
import { ApiRoute, post } from "../config";

export const apiJoinTeam = async (name: string) =>
  await post<TeamInvite>(
    ApiRoute.JoinTeam.replace(":name", name) as ApiRoute,
    {}
  );
