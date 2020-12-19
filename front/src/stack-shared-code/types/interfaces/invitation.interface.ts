import { ObjectId } from "../ObjectId";
import { BareTeam } from "./team.interfaces";

export interface NewInvitation {
  _id?: ObjectId;
  userEmail: string;
  date: string;
  team: BareTeam;
}

export interface Invitation extends NewInvitation {
  _id: ObjectId;
}
