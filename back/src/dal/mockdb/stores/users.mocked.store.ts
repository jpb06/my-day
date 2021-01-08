import { ObjectId } from "bson";

import { GoogleUser, User } from "../../../../../front/src/stack-shared-code/types";
import { RouteLogsService } from "../../../services/route.logs.service";
import { LoggedResult } from "../../../types/logged.result.interface";
import { getTeams, getUsers, newObjectId, persist } from "../logic";

export const create = async (
  user: GoogleUser,
  context: ObjectId
): Promise<User | undefined> => {
  const _id = newObjectId();

  const result = (await persist(
    {
      ...user,
      teams: [],
      invites: [],
      _id,
    },
    "user"
  )) as LoggedResult<User>;
  RouteLogsService.add(context, result.logs);

  return result.data;
};

export const getByGoogleId = async (
  id: string,
  context: ObjectId
): Promise<User | undefined> => {
  const users = await getUsers();

  const user = users.find((el) => el.id === id);

  return user;
};

export const getByEmail = async (
  email: string,
  context: ObjectId
): Promise<User | undefined> => {
  const users = await getUsers();

  const user = users.find((el) => el.email === email);

  return user;
};

export const Update = async (
  user: User,
  context: ObjectId
): Promise<boolean> => {
  const { logs } = await persist(user, "user");

  RouteLogsService.add(context, logs);

  return true;
};

export const addToTeam = async (
  id: string,
  teamId: ObjectId,
  context: ObjectId
): Promise<boolean> => {
  const users = await getUsers();
  const teams = await getTeams();

  const user = users.find((el) => el.id === id);
  if (!user || user.teams.some((el) => el._id.equals(teamId))) return false;

  const team = teams.find((el) => el._id.equals(teamId));
  if (!team) return false;

  user.teams.push({
    _id: team._id,
    name: team.name,
  });
  const { logs } = await persist(user, "user");
  RouteLogsService.add(context, logs);

  return true;
};
