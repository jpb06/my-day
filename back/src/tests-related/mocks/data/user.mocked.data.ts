import { ObjectId } from "bson";

import { BareTeam, TeamInvite, User } from "../../../../../front/src/stack-shared-code/types";
import { newObjectId } from "../../../dal/mockdb/logic";

interface MockedUserData {
  _id?: ObjectId;
  id?: string;
  email?: string;
  isEmailVerified?: boolean;
  familyName?: string;
  givenName?: string;
  name?: string;
  locale?: string;
  picture?: string;
  teams?: Array<BareTeam>;
  invites?: Array<TeamInvite>;
}

export const mockedUser = ({
  _id = newObjectId(),
  id = "123",
  email = "yolo@cool.org",
  isEmailVerified = true,
  familyName = "Yolo",
  givenName = "Bro",
  name = "Yolo Bro",
  locale = "fr",
  picture = "A picture",
  teams = [
    {
      _id: newObjectId(),
      name: "My team",
    },
  ],
  invites = [
    { _id: newObjectId(), team: { _id: newObjectId(), name: "New team" } },
  ],
}: MockedUserData = {}): User => ({
  _id,
  id,
  email,
  isEmailVerified,
  familyName,
  givenName,
  name,
  locale,
  picture,
  teams,
  invites,
});
