import { ObjectId } from "bson";
import * as GenericDal from "mongodb-generic-dal";

import { BareTeam, Invitation } from "../../../../../front/src/stack-shared-code/types";

const collection = "invitations";

export const create = async (
  email: string,
  team: BareTeam,
  context: ObjectId
): Promise<ObjectId | undefined> => {
  const insertedId = await GenericDal.create<Invitation>(collection, {
    userEmail: email,
    date: new Date().toISOString(),
    team,
  });

  return insertedId;
};

export const getAllByEmail = async (
  email: string,
  context: ObjectId
): Promise<Array<Invitation>> => {
  const result = await GenericDal.getBy<Invitation>(
    collection,
    { userEmail: email },
    {}
  );

  return result;
};
