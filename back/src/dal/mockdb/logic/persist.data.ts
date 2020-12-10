import { ObjectId } from "bson";
import chalk from "chalk";
import fs from "fs-extra";

import { Invitation, Team, User } from "../../../../../front/src/stack-shared-code/types";
import { AppKey } from "../../../types/app.key.interface";
import { getDbPath } from "./db.path";
import { getAppKeys, getInvitations, getTeams, getUsers } from "./get.data";

type Collection = "user" | "team" | "invitation";
type AlterationType = "Modifying" | "Adding";
const print = (collection: Collection, type: AlterationType, object: any) => {
  console.log(
    `${chalk.cyanBright.bgGray.bold(
      " Mock DB "
    )} - ${type} ${collection}: ${chalk.green(
      JSON.stringify(object, null, 2)
    )}\n`
  );
};

export const persistUser = async (user: User): Promise<User> => {
  let alteredUsers = await getUsers();

  const persistedUser = alteredUsers.find((el) => el.id === user.id);
  if (persistedUser) {
    alteredUsers = alteredUsers.map((el) => (el.id === user.id ? user : el));

    print("user", "Modifying", user);
    await persist({ users: alteredUsers });

    return user;
  }

  const newUser = { ...user, _id: new ObjectId() };
  alteredUsers.push(newUser);
  print("user", "Adding", newUser);
  await persist({ users: alteredUsers });

  return newUser;
};

export const persistTeam = async (team: Team) => {
  let alteredTeams = await getTeams();

  const persistedTeam = alteredTeams.find((el) => el._id.equals(team._id));
  if (persistedTeam) {
    print("team", "Modifying", team);
    alteredTeams = alteredTeams.map((el) =>
      el._id.equals(team._id) ? team : el
    );
  } else {
    print("team", "Adding", team);
    alteredTeams.push(team);
  }

  await persist({ teams: alteredTeams });
};

export const persistInvitation = async (invitation: Invitation) => {
  let alteredInvitations = await getInvitations();

  const persistedInvitation = alteredInvitations.find((el) =>
    el._id.equals(invitation._id)
  );
  if (persistedInvitation) {
    print("invitation", "Modifying", invitation);
    alteredInvitations = alteredInvitations.map((el) =>
      el._id.equals(invitation._id) ? invitation : el
    );
  } else {
    print("invitation", "Adding", invitation);
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
};
