import { ObjectId } from "bson";
import fs from "fs-extra";
import path from "path";

import { Team, User } from "../../../../../front/src/stack-shared-code/types";
import { AppKey } from "../../../types/app.key.interface";
import Database from "../../../types/database.interface";

export const getUsers = async () => {
  const db = await fs.readJson(path.join(__dirname, "data", "db.json"));
  return (<Database>db).users as Array<User>;
};
export const getTeams = async () => {
  const db = await fs.readJson(path.join(__dirname, "data", "db.json"));
  return (<Database>db).teams as Array<Team>;
};
export const getAppKeys = async () => {
  const db = await fs.readJson(path.join(__dirname, "data", "db.json"));
  return (<Database>db).appKeys as Array<AppKey>;
};

export const persistUser = async (user: User) => {
  let alteredUsers: Array<User> = await getUsers();

  const persistedUser = alteredUsers.find((el) => el.id === user.id);
  if (persistedUser) {
    alteredUsers = alteredUsers.map((el) => (el.id === user.id ? user : el));
    await persist(alteredUsers);

    return user;
  }

  const newUser = { ...user, _id: new ObjectId() };
  alteredUsers.push(newUser);
  await persist(alteredUsers);

  return newUser;
};

export const persistTeam = async (team: Team) => {
  let alteredTeams: Array<Team> = await getTeams();

  const persistedTeam = alteredTeams.find((el) => el._id === team._id);
  if (persistedTeam) {
    alteredTeams = alteredTeams.map((el) => (el._id === team._id ? team : el));
  } else {
    alteredTeams.push(team);
  }

  await persist(undefined, alteredTeams);
};

export const persist = async (
  users?: Array<User>,
  teams?: Array<Team>,
  appKeys?: Array<AppKey>
) => {
  let usersToPersist = users;
  if (!usersToPersist) usersToPersist = await getUsers();
  let teamsToPersist = teams;
  if (!teamsToPersist) teamsToPersist = await getTeams();
  let appKeysToPersist = appKeys;
  if (!appKeysToPersist) appKeysToPersist = await getAppKeys();

  const filepath = path.join(__dirname, "data", "db.json");
  const data = {
    users: usersToPersist,
    teams: teamsToPersist,
    appKeys: appKeysToPersist,
  };
  await fs.writeJson(filepath, data);

  const updatedData: Array<string> = [];
  if (users) updatedData.push("Users");
  if (teams) updatedData.push("Teams");
  if (appKeys) updatedData.push("AppKeys");
  console.log(`Mock DB updated : (${updatedData.join(", ")}).`);
};
