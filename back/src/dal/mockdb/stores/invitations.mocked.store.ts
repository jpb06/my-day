import { ObjectId } from "bson";

import { BareTeam, Invitation } from "../../../../../front/src/stack-shared-code/types";
import { LoggedResult } from "../../../types/logged.result.interface";
import { getInvitations, newObjectId, persist } from "../logic";

export const create = async (
  email: string,
  team: BareTeam
): Promise<LoggedResult<ObjectId | undefined>> => {
  const _id = newObjectId();
  const { logs } = await persist(
    {
      _id,
      team,
      userEmail: email,
      date: new Date().toISOString(),
    },
    "invitation"
  );

  return { data: _id, logs };
};

export const getAllByEmail = async (
  email: string
): Promise<LoggedResult<Array<Invitation>>> => {
  const invitations = await getInvitations();

  return { data: invitations.filter((el) => el.userEmail === email) };
};
