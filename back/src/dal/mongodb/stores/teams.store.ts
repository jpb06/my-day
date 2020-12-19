import { ObjectId } from "bson";

import { BareUser, Team, User } from "../../../../../front/src/stack-shared-code/types";
import { LoggedResult } from "../../../types/logged.result.interface";
import * as GenericStore from "../generic/dal.generic.store";

const collection = "teams";

export const create = async (
  name: string
): Promise<LoggedResult<ObjectId | undefined>> => {
  const insertedId = await GenericStore.create<Team>(collection, {
    name: name,
    members: [],
    recruits: [],
  });

  return { data: insertedId };
};

export const createByMember = async (
  name: string,
  user: BareUser
): Promise<LoggedResult<ObjectId | undefined>> => {
  const insertedId = await GenericStore.create<Team>(collection, {
    name: name,
    members: [user],
    recruits: [],
  });

  return { data: insertedId };
};

export const getById = async (
  id: ObjectId
): Promise<LoggedResult<Team | undefined>> => {
  const result = await GenericStore.getBy<Team>(collection, { _id: id }, {});

  if (result.length !== 1) return { data: undefined };

  return { data: result[0] };
};

export const getByName = async (
  name: string
): Promise<LoggedResult<Team | undefined>> => {
  const result = await GenericStore.getBy<Team>(collection, { name: name }, {});

  if (result.length !== 1) return { data: undefined };

  return { data: result[0] };
};

export const GetTeamMembers = async (
  teamId: ObjectId
): Promise<LoggedResult<Array<BareUser> | undefined>> => {
  const { data: user } = await getById(teamId);

  return { data: user?.members };
};

export const getUserTeams = async (
  userId: ObjectId
): Promise<LoggedResult<Array<Team>>> => {
  const teams = await GenericStore.getBy<Team>(
    collection,
    { members: { $elemMatch: { _id: userId } } },
    {}
  );

  return { data: teams };
};

export const exists = async (name: string): Promise<LoggedResult<boolean>> => {
  const result = await GenericStore.getBy<Team>(collection, { name: name }, {});

  if (result.length === 1) return { data: true };

  return { data: false };
};

export const addUserToTeam = async (
  teamId: ObjectId,
  user: User
): Promise<LoggedResult<boolean>> => {
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
      return { data: true };
    }
  }

  return { data: false };
};

export const Update = async (team: Team): Promise<LoggedResult<boolean>> => {
  const result = await GenericStore.createOrUpdate(
    collection,
    { _id: team._id },
    team
  );

  return { data: result ? true : false };
};
