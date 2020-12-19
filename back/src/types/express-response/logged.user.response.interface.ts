import { User } from "../../../../front/src/stack-shared-code/types";
import { ApiResponse } from "./api.response.interface";

export interface LoggedUserResponse extends ApiResponse {
  locals: {
    routeLogs: Array<string>;
    userId: string;
    loggedUser: User;
  };
}
