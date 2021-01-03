import { mocked } from "ts-jest/utils";

import { User } from "../../../front/src/stack-shared-code/types";
import Dal from "../dal";

export const mockGetByGoogleId = (data?: User) =>
  mocked(Dal.Users.getByGoogleId).mockResolvedValueOnce({
    data,
  });

export const mockUserUpdate = (result: boolean) =>
  mocked(Dal.Users.Update).mockResolvedValueOnce({
    data: result,
  });
