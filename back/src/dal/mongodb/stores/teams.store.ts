import { ObjectId } from "bson";

import { BareUser, Team, User } from "../../../../../front/src/stack-shared-code/types";
import * as GenericStore from "../generic/dal.generic.store";

const collection = "teams";

export const create = async (name: string): Promise<ObjectId | undefined> => {
  const insertedId = await GenericStore.create<Team>(collection, {
    name: name,
    members: [],
    recruits: [],
  });

  return insertedId;
};

export const getById = async (id: ObjectId): Promise<Team | undefined> => {
  const result = await GenericStore.getBy<Team>(collection, { _id: id }, {});

  if (result.length !== 1) return undefined;

  return result[0];
};

export const getByName = async (name: string): Promise<Team | undefined> => {
  const result = await GenericStore.getBy<Team>(collection, { name: name }, {});

  if (result.length !== 1) return undefined;

  return result[0];
};

export const GetTeamMembers = async (
  teamId: ObjectId
): Promise<Array<BareUser> | undefined> => {
  const team = await getById(teamId);

  return team?.members;
};

export const getUserTeams = async (userId: ObjectId): Promise<Array<Team>> => {
  const teams = await GenericStore.getBy<Team>(
    collection,
    { members: { $elemMatch: { _id: userId } } },
    {}
  );

  return teams;
};

export const exists = async (name: string): Promise<boolean> => {
  const result = await GenericStore.getBy<Team>(collection, { name: name }, {});

  if (result.length === 1) return true;

  return false;
};

export const addUserToTeam = async (
  teamId: ObjectId,
  user: User
): Promise<boolean> => {
  const result = await GenericStore.getBy<Team>(
    collection,
    { _id: teamId },
    {}
  );

  if (result.length === 1) {
    result[0].members.push(user);
    const persistedTeam = await GenericStore.createOrUpdate(
      collection,
      { _id: teamId },
      result[0]
    );
    if (persistedTeam) {
      return true;
    }
  }

  return false;
};

export const Update = async (team: Team): Promise<boolean> => {
  const result = await GenericStore.createOrUpdate(
    collection,
    { _id: team._id },
    team
  );

  return result ? true : false;
};
