import { ObjectId } from "../ObjectId";
import { BareTeam } from "./team.interfaces";

export interface Invitation {
  _id: ObjectId;
  userEmail: string;
  date: string;
  team: BareTeam;
}
