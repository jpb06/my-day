import { Team, User } from "../../../front/src/stack-shared-code/types";
import { AppKey } from "./app.key.interface";

export default interface Database {
  users: Array<User>;
  teams: Array<Team>;
  appKeys: Array<AppKey>;
}
