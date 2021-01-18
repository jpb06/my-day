import { BareTeam } from "../../stack-shared-code/types";
import { anonymousPost, ApiRoute } from "../config";

export interface LoginPayload {
  token: string;
}

export interface LoginResponse {
  token: string;
  teams: Array<BareTeam>;
}

export const apiLogin = async (payload: LoginPayload) =>
  await anonymousPost<LoginResponse>(ApiRoute.Login, payload);
