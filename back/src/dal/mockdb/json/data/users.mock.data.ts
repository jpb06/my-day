import { ObjectId } from "bson";

import { User } from "../../../../../../front/src/stack-shared-code/types";

export const users: Array<User> = [
  {
    _id: new ObjectId("5d8b9a68f9aa620de70f6ff9"),
    id: "5d8b9a68f9aa620de70f6ff9",
    email: "jpb.06@outlook.fr",
    picture: "6SLWt.gif",
    givenName: "Charles-Edouard",
    familyName: "Superman",
    name: "Charles-Edouard Superman",
    isEmailVerified: true,
    locale: "fr",
    teams: [
      {
        _id: new ObjectId("5d8b9a604ddbc1362cc540c8"),
        name: "Awooo",
      },
    ],
    invites: [],
  },
];
