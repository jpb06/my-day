import { BareTeam } from "../../stack-shared-code/types";
import { ApiRoute, post } from "../config";

export const apiCreateTeam = async (name: string) =>
  await post<BareTeam>(ApiRoute.CreateTeam, { name });
