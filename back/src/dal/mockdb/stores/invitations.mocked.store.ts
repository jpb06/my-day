import { ObjectId } from "bson";

import { Team } from "../../../../../front/src/stack-shared-code/types";
import { getTeams, newObjectId, persistTeam } from "../logic";

export const create = async (name: string): Promise<ObjectId | undefined> => {
  const _id = newObjectId();
  await persistTeam({ _id, name, members: [], recruits: [] });

  return _id;
};

export const getByEmail = async (name: string): Promise<Team | undefined> => {
  const teams = await getTeams();

  return teams.find((el) => el.name === name);
};
