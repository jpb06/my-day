import { ObjectId } from "../../stack-shared-code/types/ObjectId";
import { ApiRoute, post } from "../config";

interface InviteUserPayload {
  teamId: ObjectId;
  userEmail: string;
}

export const apiInviteUser = async (payload: InviteUserPayload) =>
  await post<string>(ApiRoute.InviteUser, payload);
