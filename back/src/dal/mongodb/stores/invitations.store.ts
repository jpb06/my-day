import { ObjectId } from "bson";
import * as GenericDal from "mongodb-generic-dal";

import { BareTeam, Invitation } from "../../../../../front/src/stack-shared-code/types";
import { LoggedResult } from "../../../types/logged.result.interface";

const collection = "invitations";

export const create = async (
  email: string,
  team: BareTeam
): Promise<LoggedResult<ObjectId | undefined>> => {
  const insertedId = await GenericDal.create<Invitation>(collection, {
    userEmail: email,
    date: new Date().toISOString(),
    team,
  });

  return { data: insertedId };
};

export const getAllByEmail = async (
  email: string
): Promise<LoggedResult<Array<Invitation>>> => {
  const result = await GenericDal.getBy<Invitation>(
    collection,
    { userEmail: email },
    {}
  );

  return { data: result };
};
