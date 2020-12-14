import { ObjectId } from "bson";

import { BareTeam, Invitation } from "../../../../../front/src/stack-shared-code/types";
import { ApiResponse } from "../../../types/api.response.interface";
import { DBResult } from "../../../types/db.result.interface";
import { getInvitations, newObjectId, persistInvitation } from "../logic";

export const create = async (
  email: string,
  team: BareTeam
): Promise<DBResult<ObjectId | undefined>> => {
  const _id = newObjectId();
  const { logs } = await persistInvitation({
    _id,
    team,
    userEmail: email,
    date: new Date().toISOString(),
  });

  return { data: _id, logs };
};

export const getAllByEmail = async (
  email: string
): Promise<DBResult<Array<Invitation>>> => {
  const invitations = await getInvitations();

  return { data: invitations.filter((el) => el.userEmail === email) };
};
