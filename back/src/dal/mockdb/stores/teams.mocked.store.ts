import { ObjectId } from "bson";

import { BareUser, Team, User } from "../../../../../front/src/stack-shared-code/types";
import { getTeams, persistTeam } from "../json/data.alteration";
import { newObjectId } from "../json/objectid.helper";

export const create = async (name: string): Promise<ObjectId | undefined> => {
  const _id = newObjectId();
  await persistTeam({ _id, name, members: [], recruits: [] });

  return _id;
};

export const getById = async (id: ObjectId): Promise<Team | undefined> => {
  const teams = await getTeams();

  return teams.find((el) => el._id.equals(id));
};

export const getByName = async (name: string): Promise<Team | undefined> => {
  const teams = await getTeams();

  return teams.find((el) => el.name === name);
};

export const GetTeamMembers = async (
  teamId: ObjectId
): Promise<Array<BareUser> | undefined> => {
  const teams = await getTeams();

  return teams.find((el) => el._id.equals(teamId))?.members;
};

export const getUserTeams = async (userId: ObjectId): Promise<Array<Team>> => {
  const teams = await getTeams();

  const userTeams = teams.filter((el) =>
    el.members.some((u) => u._id?.equals(userId))
  );
  return userTeams;
};

export const exists = async (name: string): Promise<boolean> => {
  const teams = await getTeams();

  return teams.some((el) => el.name === name);
};

export const addUserToTeam = async (
  teamId: ObjectId,
  user: User
): Promise<boolean> => {
  const teams = await getTeams();
  const team = teams.find((el) => el._id.equals(teamId));

  if (!team) return false;

  team.members.push(user);

  await persistTeam(team);
  return true;
};

export const inviteUserToTeam = async (
  teamId: ObjectId,
  email: string
): Promise<boolean> => {
  const teams = await getTeams();
  const team = teams.find((el) => el._id.equals(teamId));

  if (!team) return false;

  team.invites.push(email);

  await persistTeam(team);
  return true;
};

export const Update = async (team: Team): Promise<boolean> => {
  await persistTeam(team);
  return true;
};
