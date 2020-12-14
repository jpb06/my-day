import { ObjectId } from "bson";

import { BareUser, Team, User } from "../../../../../front/src/stack-shared-code/types";
import { ApiResponse } from "../../../types/api.response.interface";
import { DBResult } from "../../../types/db.result.interface";
import { toBareUser } from "../../../types/transformers";
import { getTeams, newObjectId, persistTeam } from "../logic";

export const create = async (
  name: string
): Promise<DBResult<ObjectId | undefined>> => {
  const _id = newObjectId();
  const { logs } = await persistTeam({ _id, name, members: [], recruits: [] });

  return { data: _id, logs };
};

export const getById = async (
  id: ObjectId
): Promise<DBResult<Team | undefined>> => {
  const teams = await getTeams();

  return { data: teams.find((el) => el._id.equals(id)) };
};

export const getByName = async (
  name: string
): Promise<DBResult<Team | undefined>> => {
  const teams = await getTeams();

  return { data: teams.find((el) => el.name === name) };
};

export const GetTeamMembers = async (
  teamId: ObjectId
): Promise<DBResult<Array<BareUser> | undefined>> => {
  const teams = await getTeams();

  return { data: teams.find((el) => el._id.equals(teamId))?.members };
};

export const getUserTeams = async (
  userId: ObjectId
): Promise<DBResult<Array<Team>>> => {
  const teams = await getTeams();

  const userTeams = teams.filter((el) =>
    el.members.some((u) => u._id?.equals(userId))
  );
  return { data: userTeams };
};

export const exists = async (name: string): Promise<DBResult<boolean>> => {
  const teams = await getTeams();

  return { data: teams.some((el) => el.name === name) };
};

export const addUserToTeam = async (
  teamId: ObjectId,
  user: User
): Promise<DBResult<boolean>> => {
  const teams = await getTeams();
  const team = teams.find((el) => el._id.equals(teamId));

  if (!team) return { data: false };

  team.members.push(toBareUser(user));

  const { logs } = await persistTeam(team);
  return { data: true, logs };
};

export const Update = async (team: Team): Promise<DBResult<boolean>> => {
  const { logs } = await persistTeam(team);
  return { data: true, logs };
};
