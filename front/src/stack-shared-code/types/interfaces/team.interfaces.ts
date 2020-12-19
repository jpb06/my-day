import { ObjectId } from "../ObjectId";
import { BareUser, Recruit } from "./user.interfaces";

export interface NewTeam {
  _id?: ObjectId;
  name: string;
}

export interface BareTeam extends NewTeam {
  _id: ObjectId;
}

export interface Team extends BareTeam {
  members: Array<BareUser>;
  recruits: Array<Recruit>;
}

export interface TeamInvite {
  _id: ObjectId;
  team: BareTeam;
  backer?: BareUser;
}
