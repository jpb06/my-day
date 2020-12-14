import { ObjectId } from "bson";

import { GoogleUser, User } from "../../../../../front/src/stack-shared-code/types";
import { ApiResponse } from "../../../types/api.response.interface";
import { DBResult } from "../../../types/db.result.interface";
import { getTeams, getUsers, newObjectId, persistUser } from "../logic";

export const create = async (
  user: GoogleUser
): Promise<DBResult<User | undefined>> => {
  const _id = newObjectId();

  const result = await persistUser({
    ...user,
    teams: [],
    invites: [],
    _id,
  });

  return result;
};

export const getByGoogleId = async (
  id: string
): Promise<DBResult<User | undefined>> => {
  const users = await getUsers();

  const user = users.find((el) => el.id === id);

  return { data: user };
};

export const getByEmail = async (
  email: string
): Promise<DBResult<User | undefined>> => {
  const users = await getUsers();

  const user = users.find((el) => el.email === email);

  return { data: user };
};

export const Update = async (user: User): Promise<DBResult<boolean>> => {
  const { logs } = await persistUser(user);

  return { data: true, logs };
};

export const addToTeam = async (
  id: string,
  teamId: ObjectId
): Promise<DBResult<boolean>> => {
  const users = await getUsers();
  const teams = await getTeams();

  const user = users.find((el) => el.id === id);
  if (!user || user.teams.some((el) => el._id.equals(teamId)))
    return { data: false };

  const team = teams.find((el) => el._id.equals(teamId));
  if (!team) return { data: false };

  user.teams.push({
    _id: team._id,
    name: team.name,
  });
  const { logs } = await persistUser(user);

  return { data: true, logs };
};
