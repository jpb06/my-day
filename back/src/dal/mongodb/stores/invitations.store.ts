import { ObjectId } from "bson";

import { BareTeam, Invitation } from "../../../../../front/src/stack-shared-code/types";
import { ApiResponse } from "../../../types/api.response.interface";
import { DBResult } from "../../../types/db.result.interface";
import * as GenericStore from "../generic/dal.generic.store";

const collection = "invitations";

export const create = async (
  email: string,
  team: BareTeam
): Promise<DBResult<ObjectId | undefined>> => {
  const insertedId = await GenericStore.create<Invitation>(collection, {
    userEmail: email,
    date: new Date().toISOString(),
    team,
  });

  return { data: insertedId };
};

export const getAllByEmail = async (
  email: string
): Promise<DBResult<Array<Invitation>>> => {
  const result = await GenericStore.getBy<Invitation>(
    collection,
    { userEmail: email },
    {}
  );

  return { data: result };
};
