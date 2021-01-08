import { ObjectId } from "bson";

import { User } from "../../../../front/src/stack-shared-code/types";
import { ApiResponse } from "./api.response.interface";

export interface LoggedUserResponse extends ApiResponse {
  locals: {
    context: ObjectId;
    userId: string;
    loggedUser: User;
  };
}
