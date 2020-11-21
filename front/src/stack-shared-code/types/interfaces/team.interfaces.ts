import { ObjectId } from "../ObjectId";
import { BareUser, Recruit } from "./user.interfaces";

export interface BareTeam {
  _id: ObjectId;
  name: string;
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
