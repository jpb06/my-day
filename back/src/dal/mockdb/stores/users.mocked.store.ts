import { ObjectId } from "bson";

import { GoogleUser, User } from "../../../../../front/src/stack-shared-code/types";
import { getTeams, getUsers, newObjectId, persistUser } from "../logic";

export const create = async (user: GoogleUser): Promise<User | undefined> => {
  const _id = newObjectId();

  return await persistUser({ ...user, teams: [], invites: [], _id });
};

export const getByGoogleId = async (id: string): Promise<User | undefined> => {
  const users = await getUsers();

  return users.find((el) => el.id === id);
};

export const getByEmail = async (email: string): Promise<User | undefined> => {
  const users = await getUsers();

  return users.find((el) => el.email === email);
};

export const Update = async (user: User): Promise<boolean> => {
  await persistUser(user);

  return true;
};

export const addToTeam = async (
  id: string,
  teamId: ObjectId
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
  await persistUser(user);

  return true;
};
