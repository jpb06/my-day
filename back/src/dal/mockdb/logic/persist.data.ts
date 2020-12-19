import { ObjectId } from "bson";
import fs from "fs-extra";

import {
    GoogleUser, Invitation, NewInvitation, NewTeam, Team, User
} from "../../../../../front/src/stack-shared-code/types";
import { AppKey, NewAppKey } from "../../../types/app.key.interface";
import { LoggedResult } from "../../../types/logged.result.interface";
import { getDbPath } from "./db.path";
import { getAppKeys, getInvitations, getTeams, getUsers } from "./get.data";
import { Collection, log } from "./logging";

type PersistedType = AppKey | Invitation | Team | User;

export const persist = async (
  item: PersistedType,
  type: Collection
): Promise<LoggedResult<PersistedType>> => {
  let data = await getBy(type);

  let logs: string;
  const existingItem = data.find((el) => el._id.equals(item._id));
  if (existingItem) {
    data = data.map((el) => (el._id.equals(item._id) ? item : el));
    logs = log(type, "Modifying", item, existingItem);
  } else {
    data.push(item);
    logs = log(type, "Adding", item);
  }

  await persistBy(type, data);
  return { data: item, logs };
};

const getBy = async (collection: Collection): Promise<Array<PersistedType>> => {
  let data: Array<PersistedType>;

  switch (collection) {
    case "appkey":
      data = (await getAppKeys()) as Array<PersistedType>;
      break;
    case "invitation":
      data = (await getInvitations()) as Array<PersistedType>;
      break;
    case "team":
      data = (await getTeams()) as Array<PersistedType>;
      break;
    case "user":
      data = (await getUsers()) as Array<PersistedType>;
      break;
  }

  return data;
};

const persistBy = async (
  collection: Collection,
  data: Array<PersistedType>
) => {
  switch (collection) {
    case "appkey":
      await persistAll({ appKeys: data as Array<AppKey> });
      break;
    case "invitation":
      await persistAll({ invitations: data as Array<Invitation> });
      break;
    case "team":
      await persistAll({ teams: data as Array<Team> });
      break;
    case "user":
      await persistAll({ users: data as Array<User> });
      break;
  }
};

interface PersistAllParams {
  users?: Array<User>;
  teams?: Array<Team>;
  appKeys?: Array<AppKey>;
  invitations?: Array<Invitation>;
}

const persistAll = async ({
  users,
  teams,
  appKeys,
  invitations,
}: PersistAllParams) => {
  const data = {
    appKeys: appKeys ?? (await getAppKeys()),
    users: users ?? (await getUsers()),
    teams: teams ?? (await getTeams()),
    invitations: invitations ?? (await getInvitations()),
  };
  await fs.writeJson(getDbPath(), data);
};
