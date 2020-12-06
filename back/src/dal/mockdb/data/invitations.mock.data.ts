import { ObjectId } from "bson";

import { Invitation } from "../../../../../front/src/stack-shared-code/types";

export const invitations: Array<Invitation> = [
  {
    _id: new ObjectId("5d8b9a604ddc1362cc540845"),
    userEmail: "",
    date: "",
    team: {
      _id: new ObjectId("5d8b9a604ddbc1362cc540c8"),
      name: "Awooo",
    },
  },
];
