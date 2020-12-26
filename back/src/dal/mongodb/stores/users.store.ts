import { ObjectId } from "bson";
import * as GenericDal from "mongodb-generic-dal";

import { GoogleUser, User } from "../../../../../front/src/stack-shared-code/types";
import { LoggedResult } from "../../../types/logged.result.interface";
import * as TeamsStore from "./teams.store";

const collection = "users";

export const create = async (
  user: GoogleUser
): Promise<LoggedResult<User | undefined>> => {
  const persistedUser = await GenericDal.createOrUpdate<User>(
    collection,
    { id: user.id },
    {
      ...user,
      teams: [],
      invites: [],
    }
  );

  return { data: persistedUser };
};

export const getByGoogleId = async (
  id: string
): Promise<LoggedResult<User | undefined>> => {
  const result = await GenericDal.getBy<User>(collection, { id: id }, {});

  if (result.length !== 1) return { data: undefined };

  return { data: result[0] };
};

export const getByEmail = async (
  email: string
): Promise<LoggedResult<User | undefined>> => {
  const result = await GenericDal.getBy<User>(collection, { email: email }, {});

  if (result.length !== 1) return { data: undefined };

  return { data: result[0] };
};

export const Update = async (user: User): Promise<LoggedResult<boolean>> => {
  const result = await GenericDal.createOrUpdate<User>(
    collection,
    { id: user.id },
    user
  );

  return { data: result ? true : false };
};
