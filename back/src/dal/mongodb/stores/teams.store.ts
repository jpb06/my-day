import { ObjectId } from "bson";
import * as GenericDal from "mongodb-generic-dal";

import { BareUser, Team, User } from "../../../../../front/src/stack-shared-code/types";

const collection = "teams";

export const create = async (
  name: string,
  context: ObjectId
): Promise<ObjectId | undefined> => {
  const insertedId = await GenericDal.create<Team>(collection, {
    name: name,
    members: [],
    recruits: [],
  });

  return insertedId;
};

export const createByMember = async (
  name: string,
  user: BareUser,
  context: ObjectId
): Promise<ObjectId | undefined> => {
  const insertedId = await GenericDal.create<Team>(collection, {
    name: name,
    members: [user],
    recruits: [],
  });

  return insertedId;
};

export const getById = async (
  id: ObjectId,
  context: ObjectId
): Promise<Team | undefined> => {
  const result = await GenericDal.getBy<Team>(collection, { _id: id }, {});

  if (result.length !== 1) return undefined;

  return result[0];
};

export const getByName = async (
  name: string,
  context: ObjectId
): Promise<Team | undefined> => {
  const result = await GenericDal.getBy<Team>(collection, { name: name }, {});

  if (result.length !== 1) return undefined;

  return result[0];
};

export const GetTeamMembers = async (
  teamId: ObjectId,
  context: ObjectId
): Promise<Array<BareUser> | undefined> => {
  const team = await getById(teamId, context);

  return team?.members;
};

export const getUserTeams = async (
  userId: ObjectId,
  context: ObjectId
): Promise<Array<Team>> => {
  const teams = await GenericDal.getBy<Team>(
    collection,
    { members: { $elemMatch: { _id: userId } } },
    {}
  );

  return teams;
};

export const exists = async (
  name: string,
  context: ObjectId
): Promise<boolean> => {
  const result = await GenericDal.getBy<Team>(collection, { name: name }, {});

  if (result.length === 1) return true;

  return false;
};

export const Update = async (
  team: Team,
  context: ObjectId
): Promise<boolean> => {
  const result = await GenericDal.createOrUpdate(
    collection,
    { _id: team._id },
    team
  );

  return result ? true : false;
};
