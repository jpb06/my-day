import { ObjectId } from "bson";
import chalk from "chalk";
import { diffJson } from "diff";
import fs from "fs-extra";

import { Invitation, Team, User } from "../../../../../front/src/stack-shared-code/types";
import { ApiResponse } from "../../../types/api.response.interface";
import { AppKey, PersistedAppKey } from "../../../types/app.key.interface";
import { DBResult } from "../../../types/db.result.interface";
import { getDbPath } from "./db.path";
import { getAppKeys, getInvitations, getTeams, getUsers } from "./get.data";

const getDiff = (previous: any, next: any) => {
  const diffs = diffJson(previous, next);

  let output = "";
  diffs.forEach((part) => {
    if (part.added) output += `${chalk.greenBright(part.value)}`;
    if (part.removed) output += `${chalk.redBright(part.value)}`;

    if (!part.added && !part.removed) output += `${chalk.grey(part.value)}`;
  });

  return output;
};

type Collection = "user" | "team" | "invitation" | "appkey";
type AlterationType = "Modifying" | "Adding";
const log = (
  collection: Collection,
  type: AlterationType,
  object: any,
  originalObject?: any
): string => {
  if (!originalObject) {
    return `${chalk.cyanBright.bgGray.bold(
      " Mock DB "
    )} - ${type} ${collection}: ${chalk.green(
      JSON.stringify(object, null, 2)
    )}`;
  }

  const original = JSON.parse(JSON.stringify(originalObject));
  const altered = JSON.parse(JSON.stringify(object));
  const diffString = getDiff(original, altered);

  return `${chalk.cyanBright.bgGray.bold(
    " Mock DB "
  )} - ${type} ${collection}: ${diffString}`;
};

export const persistUser = async (user: User): Promise<DBResult<User>> => {
  let alteredUsers = await getUsers();

  const persistedUser = alteredUsers.find((el) => el.id === user.id);
  if (persistedUser) {
    alteredUsers = alteredUsers.map((el) => (el.id === user.id ? user : el));

    const logs = log("user", "Modifying", user, persistedUser);
    await persist({ users: alteredUsers });

    return { data: user, logs };
  }

  const newUser = { ...user, _id: new ObjectId() };
  alteredUsers.push(newUser);
  const logs = log("user", "Adding", newUser);
  await persist({ users: alteredUsers });

  return { data: newUser, logs };
};

export const persistTeam = async (team: Team): Promise<DBResult<Team>> => {
  let alteredTeams = await getTeams();

  const persistedTeam = alteredTeams.find((el) => el._id.equals(team._id));
  if (persistedTeam) {
    const logs = log("team", "Modifying", team, persistedTeam);
    alteredTeams = alteredTeams.map((el) =>
      el._id.equals(team._id) ? team : el
    );

    return { data: team, logs };
  }

  const newTeam = { ...team, _id: new ObjectId() };
  const logs = log("team", "Adding", newTeam);
  alteredTeams.push(newTeam);
  await persist({ teams: alteredTeams });

  return { data: newTeam, logs };
};

export const persistInvitation = async (
  invitation: Invitation
): Promise<DBResult<Invitation>> => {
  let alteredInvitations = await getInvitations();

  const persistedInvitation = alteredInvitations.find((el) =>
    el._id.equals(invitation._id)
  );
  if (persistedInvitation) {
    const logs = log(
      "invitation",
      "Modifying",
      invitation,
      persistedInvitation
    );
    alteredInvitations = alteredInvitations.map((el) =>
      el._id.equals(invitation._id) ? invitation : el
    );

    return { data: invitation, logs };
  }

  const newInvitation = { ...invitation, _id: new ObjectId() };
  const logs = log("invitation", "Adding", invitation);
  alteredInvitations.push(invitation);
  await persist({ invitations: alteredInvitations });

  return { data: newInvitation, logs };
};

export const persistAppKey = async (
  appKey: PersistedAppKey
): Promise<DBResult<PersistedAppKey>> => {
  let alteredAppKeys = await getAppKeys();

  const persistedAppKey = alteredAppKeys.find((el) =>
    el._id.equals(appKey._id)
  );
  if (persistedAppKey) {
    const logs = log("appkey", "Modifying", appKey, persistedAppKey);
    alteredAppKeys = alteredAppKeys.map((el) =>
      el._id.equals(appKey?._id) ? appKey : el
    );

    return { data: appKey, logs };
  }

  const newAppKey = { ...appKey, _id: new ObjectId() };
  const logs = log("appkey", "Adding", appKey);
  alteredAppKeys.push(appKey);
  await persist({ appKeys: alteredAppKeys });

  return { data: newAppKey, logs };
};

interface PersistParams {
  users?: Array<User>;
  teams?: Array<Team>;
  appKeys?: Array<AppKey>;
  invitations?: Array<Invitation>;
}

const persist = async ({
  users,
  teams,
  appKeys,
  invitations,
}: PersistParams) => {
  let usersToPersist = users;
  if (!usersToPersist) usersToPersist = await getUsers();
  let teamsToPersist = teams;
  if (!teamsToPersist) teamsToPersist = await getTeams();
  let appKeysToPersist = appKeys;
  if (!appKeysToPersist) appKeysToPersist = await getAppKeys();
  let invitationsToPersist = invitations;
  if (!invitationsToPersist) invitationsToPersist = await getInvitations();

  const data = {
    users: usersToPersist,
    teams: teamsToPersist,
    appKeys: appKeysToPersist,
    invitations: invitationsToPersist,
  };
  await fs.writeJson(getDbPath(), data);
};
