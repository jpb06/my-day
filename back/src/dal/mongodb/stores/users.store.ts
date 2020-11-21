import { ObjectId } from "bson";

import { GoogleUser, Team, User } from "../../../../../front/src/stack-shared-code/types";
import * as GenericStore from "../generic/dal.generic.store";
import * as TeamsStore from "./teams.store";

const collection = "users";

export const create = async (user: GoogleUser): Promise<User | undefined> => {
  const persistedUser = await GenericStore.createOrUpdate<User>(
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

export const getByGoogleId = async (id: string): Promise<User | undefined> => {
  const result = await GenericStore.getBy<User>(collection, { id: id }, {});

  if (result.length !== 1) return undefined;

  return result[0];
};

export const getByEmail = async (email: string): Promise<User | undefined> => {
  const result = await GenericStore.getBy<User>(
    collection,
    { email: email },
    {}
  );

  if (result.length !== 1) return undefined;

  return result[0];
};

export const Update = async (user: User): Promise<boolean> => {
  const result = await GenericStore.createOrUpdate<User>(
    collection,
    { id: user.id },
    user
  );

  return result ? true : false;
};

export const addToTeam = async (
  id: string,
  teamId: ObjectId
): Promise<boolean> => {
  const user = await getByGoogleId(id);
  if (user && user.teams.filter((el) => el._id.equals(teamId)).length === 0) {
    const team = await TeamsStore.getById(teamId);
    if (team) {
      user.teams.push({
        _id: team._id,
        name: team.name,
      });

      const result = await GenericStore.createOrUpdate(
        collection,
        { id: id },
        user
      );

      return result ? true : false;
    }
  }

  return false;
};
