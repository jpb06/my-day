import { BareTeam, TeamInvite } from "../";
import { ObjectId } from "../ObjectId";

export interface GoogleUser {
  id: string;
  email?: string;
  isEmailVerified?: boolean;
  familyName?: string;
  givenName?: string;
  name?: string;
  locale?: string;
  picture?: string;
}

export interface BareUser extends GoogleUser {
  _id?: ObjectId;
}

export interface User extends BareUser {
  teams: Array<BareTeam>;
  invites: Array<TeamInvite>;
}

export interface Recruit {
  _id: ObjectId;
  email: string;
  backer?: BareUser;
}
