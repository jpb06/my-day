import { ObjectId } from "bson";

import {
  BareTeam,
  Invitation,
  Team,
} from "../../../../../front/src/stack-shared-code/types";
import {
  getInvitations,
  getTeams,
  newObjectId,
  persistInvitation,
} from "../logic";

export const create = async (
  email: string,
  team: BareTeam
): Promise<ObjectId | undefined> => {
  const _id = newObjectId();
  await persistInvitation({
    _id,
    team,
    userEmail: email,
    date: new Date().toISOString(),
  });

  return _id;
};

export const getAllByEmail = async (
  email: string
): Promise<Array<Invitation>> => {
  const invitations = await getInvitations();

  return invitations.filter((el) => el.userEmail === email);
};
