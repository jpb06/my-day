import { ObjectId } from "bson";
import fs from "fs-extra";

import { Invitation, Team, User } from "../../../../../front/src/stack-shared-code/types";
import { AppKey } from "../../../types/app.key.interface";
import Database from "../../../types/database.interface";
import { getDbPath } from "./db.path";

export const getAppKeys = async (): Promise<Array<AppKey>> => {
  const db = await fs.readJson(getDbPath());
  const keys = ((<Database>db).appKeys as Array<AppKey>).map((key) => ({
    ...key,
    _id: new ObjectId(key._id),
  }));

  return keys;
};

export const getUsers = async (): Promise<Array<User>> => {
  const db = await fs.readJson(getDbPath());
  const users = ((<Database>db).users as Array<User>).map((user) => ({
    ...user,
    _id: new ObjectId(user._id),
    teams: user.teams.map((team) => ({
      ...team,
      _id: new ObjectId(team._id),
    })),
  }));

  return users;
};

export const getTeams = async (): Promise<Array<Team>> => {
  const db = await fs.readJson(getDbPath());
  const teams = ((<Database>db).teams as Array<Team>).map((team) => ({
    ...team,
    _id: new ObjectId(team._id),
    members: team.members.map((user) => ({
      ...user,
      _id: new ObjectId(user._id),
    })),
  }));

  return teams;
};

export const getInvitations = async (): Promise<Array<Invitation>> => {
  const db = await fs.readJson(getDbPath());
  const invitations = ((<Database>db).invitations as Array<Invitation>).map(
    (invite) => ({
      ...invite,
      _id: new ObjectId(invite._id),
      team: {
        ...invite.team,
        _id: new ObjectId(invite.team._id),
      },
    })
  );

  return invitations;
};
