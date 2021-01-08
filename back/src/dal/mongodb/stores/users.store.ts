import { ObjectId } from "bson";
import * as GenericDal from "mongodb-generic-dal";

import { GoogleUser, User } from "../../../../../front/src/stack-shared-code/types";

const collection = "users";

export const create = async (
  user: GoogleUser,
  context: ObjectId
): Promise<User | undefined> => {
  const persistedUser = await GenericDal.createOrUpdate<User>(
    collection,
    { id: user.id },
    {
      ...user,
      teams: [],
      invites: [],
    }
  );

  return persistedUser;
};

export const getByGoogleId = async (
  id: string,
  context: ObjectId
): Promise<User | undefined> => {
  const result = await GenericDal.getBy<User>(collection, { id: id }, {});

  if (result.length !== 1) return undefined;

  return result[0];
};

export const getByEmail = async (
  email: string,
  context: ObjectId
): Promise<User | undefined> => {
  const result = await GenericDal.getBy<User>(collection, { email: email }, {});

  if (result.length !== 1) return undefined;

  return result[0];
};

export const Update = async (
  user: User,
  context: ObjectId
): Promise<boolean> => {
  const result = await GenericDal.createOrUpdate<User>(
    collection,
    { id: user.id },
    user
  );

  return result ? true : false;
};
