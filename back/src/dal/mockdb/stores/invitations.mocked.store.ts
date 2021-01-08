import { ObjectId } from "bson";

import { BareTeam, Invitation } from "../../../../../front/src/stack-shared-code/types";
import { RouteLogsService } from "../../../services/route.logs.service";
import { getInvitations, newObjectId, persist } from "../logic";

export const create = async (
  email: string,
  team: BareTeam,
  context: ObjectId
): Promise<ObjectId | undefined> => {
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
  RouteLogsService.add(context, logs);

  return _id;
};

export const getAllByEmail = async (
  email: string,
  context: ObjectId
): Promise<Array<Invitation>> => {
  const invitations = await getInvitations();

  return invitations.filter((el) => el.userEmail === email);
};
