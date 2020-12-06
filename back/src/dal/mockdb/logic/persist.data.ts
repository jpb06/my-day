import { ObjectId } from "bson";
import fs from "fs-extra";
import path from "path";

import { Invitation, Team, User } from "../../../../../front/src/stack-shared-code/types";
import { AppKey } from "../../../types/app.key.interface";
import { getDbPath } from "./db.path";
import { getAppKeys, getInvitations, getTeams, getUsers } from "./get.data";

export const persistUser = async (user: User): Promise<User> => {
  let alteredUsers = await getUsers();

  const persistedUser = alteredUsers.find((el) => el.id === user.id);
  if (persistedUser) {
    alteredUsers = alteredUsers.map((el) => (el.id === user.id ? user : el));
    await persist({ users: alteredUsers });

    return user;
  }

  const newUser = { ...user, _id: new ObjectId() };
  alteredUsers.push(newUser);
  await persist({ users: alteredUsers });

  return newUser;
};

export const persistTeam = async (team: Team) => {
  let alteredTeams = await getTeams();

  const persistedTeam = alteredTeams.find((el) => el._id === team._id);
  if (persistedTeam) {
    alteredTeams = alteredTeams.map((el) => (el._id === team._id ? team : el));
  } else {
    alteredTeams.push(team);
  }

  await persist({ teams: alteredTeams });
};

export const persistInvitation = async (invitation: Invitation) => {
  let alteredInvitations = await getInvitations();

  const persistedInvitation = alteredInvitations.find(
    (el) => el._id === invitation._id
  );
  if (persistedInvitation) {
    alteredInvitations = alteredInvitations.map((el) =>
      el._id === invitation._id ? invitation : el
    );
  } else {
    alteredInvitations.push(invitation);
  }

  await persist({ invitations: alteredInvitations });
};

interface PersistParams {
  users?: Array<User>;
  teams?: Array<Team>;
  appKeys?: Array<AppKey>;
  invitations?: Array<Invitation>;
}

export const persist = async ({
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

  const updatedData: Array<string> = [];
  if (users) updatedData.push("Users");
  if (teams) updatedData.push("Teams");
  if (appKeys) updatedData.push("AppKeys");
  if (invitations) updatedData.push("Invitations");
  console.log(`Mock DB updated : (${updatedData.join(", ")}).`);
};
