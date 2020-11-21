import { ApiResponse } from "./api.response.interface";

export interface LoggedUserResponse extends ApiResponse {
  locals: {
    userId: string;
  };
}
