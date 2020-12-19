import { ObjectId } from "bson";

import { BareUser, Team, User } from "../../../../../front/src/stack-shared-code/types";
import { LoggedResult } from "../../../types/logged.result.interface";
import { toBareUser } from "../../../types/transformers";
import { getTeams, newObjectId, persist } from "../logic";

export const create = async (
  name: string
): Promise<LoggedResult<ObjectId | undefined>> => {
  const _id = newObjectId();
  const { logs } = await persist(
    { _id, name, members: [], recruits: [] },
    "team"
  );

  return { data: _id, logs };
};

export const createByMember = async (
  name: string,
  user: BareUser
): Promise<LoggedResult<ObjectId | undefined>> => {
  const _id = newObjectId();
  const { logs } = await persist(
    { _id, name, members: [user], recruits: [] },
    "team"
  );

  return { data: _id, logs };
};

export const getById = async (
  id: ObjectId
): Promise<LoggedResult<Team | undefined>> => {
  const teams = await getTeams();

  return { data: teams.find((el) => el._id.equals(id)) };
};

export const getByName = async (
  name: string
): Promise<LoggedResult<Team | undefined>> => {
  const teams = await getTeams();

  return { data: teams.find((el) => el.name === name) };
};

export const GetTeamMembers = async (
  teamId: ObjectId
): Promise<LoggedResult<Array<BareUser> | undefined>> => {
  const teams = await getTeams();

  return { data: teams.find((el) => el._id.equals(teamId))?.members };
};

export const getUserTeams = async (
  userId: ObjectId
): Promise<LoggedResult<Array<Team>>> => {
  const teams = await getTeams();

  const userTeams = teams.filter((el) =>
    el.members.some((u) => u._id?.equals(userId))
  );
  return { data: userTeams };
};

export const exists = async (name: string): Promise<LoggedResult<boolean>> => {
  const teams = await getTeams();

  return { data: teams.some((el) => el.name === name) };
};

export const addUserToTeam = async (
  teamId: ObjectId,
  user: User
): Promise<LoggedResult<boolean>> => {
  const teams = await getTeams();
  const team = teams.find((el) => el._id.equals(teamId));
  if (!team) return { data: false };

  team.members.push(toBareUser(user));

  const { logs } = await persist(team, "team");
  return { data: true, logs };
};

export const Update = async (team: Team): Promise<LoggedResult<boolean>> => {
  const { logs } = await persist(team, "team");
  return { data: true, logs };
};
