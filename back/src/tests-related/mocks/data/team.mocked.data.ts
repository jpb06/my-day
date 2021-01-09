import { BareUser } from "../../../../../front/src/stack-shared-code/types";
import { newObjectId } from "../../../dal/mockdb/logic";

export const mockedTeam = (name: string, members: Array<BareUser> = []) => ({
  _id: newObjectId(),
  name,
  members,
  recruits: [],
});
