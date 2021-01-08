import { ObjectId } from "bson";

import { BareUser, Team, User } from "../../../../../front/src/stack-shared-code/types";
import { RouteLogsService } from "../../../services/route.logs.service";
import { toBareUser } from "../../../types/transformers";
import { getTeams, newObjectId, persist } from "../logic";

export const create = async (
  name: string,
  context: ObjectId
): Promise<ObjectId | undefined> => {
  const _id = newObjectId();

  const { logs } = await persist(
    { _id, name, members: [], recruits: [] },
    "team"
  );
  RouteLogsService.add(context, logs);

  return _id;
};

export const createByMember = async (
  name: string,
  user: BareUser,
  context: ObjectId
): Promise<ObjectId | undefined> => {
  const _id = newObjectId();

  const { logs } = await persist(
    { _id, name, members: [user], recruits: [] },
    "team"
  );
  RouteLogsService.add(context, logs);

  return _id;
};

export const getById = async (
  id: ObjectId,
  context: ObjectId
): Promise<Team | undefined> => {
  const teams = await getTeams();

  return teams.find((el) => el._id.equals(id));
};

export const getByName = async (
  name: string,
  context: ObjectId
): Promise<Team | undefined> => {
  const teams = await getTeams();

  return teams.find((el) => el.name === name);
};

export const GetTeamMembers = async (
  teamId: ObjectId,
  context: ObjectId
): Promise<Array<BareUser> | undefined> => {
  const teams = await getTeams();

  return teams.find((el) => el._id.equals(teamId))?.members;
};

export const getUserTeams = async (
  userId: ObjectId,
  context: ObjectId
): Promise<Array<Team>> => {
  const teams = await getTeams();

  const userTeams = teams.filter((el) =>
    el.members.some((u) => u._id?.equals(userId))
  );
  return userTeams;
};

export const exists = async (
  name: string,
  context: ObjectId
): Promise<boolean> => {
  const teams = await getTeams();

  return teams.some((el) => el.name === name);
};

export const addUserToTeam = async (
  teamId: ObjectId,
  user: User,
  context: ObjectId
): Promise<boolean> => {
  const teams = await getTeams();
  const team = teams.find((el) => el._id.equals(teamId));
  if (!team) return false;

  team.members.push(toBareUser(user));

  const { logs } = await persist(team, "team");
  RouteLogsService.add(context, logs);

  return true;
};

export const Update = async (
  team: Team,
  context: ObjectId
): Promise<boolean> => {
  const { logs } = await persist(team, "team");

  RouteLogsService.add(context, logs);

  return true;
};
