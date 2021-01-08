import { User } from "../../../../../front/src/stack-shared-code/types";
import { newObjectId } from "../../../dal/mockdb/logic";

export const loggedUser: User = {
  _id: newObjectId(),
  id: "123",
  email: "yolo@cool.org",
  isEmailVerified: true,
  familyName: "Yolo",
  givenName: "Bro",
  name: "Yolo Bro",
  locale: "fr",
  picture: "A picture",
  teams: [
    {
      _id: newObjectId(),
      name: "My team",
    },
  ],
  invites: [
    { _id: newObjectId(), team: { _id: newObjectId(), name: "New team" } },
  ],
};
