import { mocked } from "ts-jest/utils";

import { User } from "../../../../../front/src/stack-shared-code/types";
import Dal from "../../../dal";

export const mockGetByGoogleId = (user?: User) =>
  mocked(Dal.Users.getByGoogleId).mockResolvedValueOnce(user);

export const mockGetByEmail = (user?: User) =>
  mocked(Dal.Users.getByEmail).mockResolvedValueOnce(user);

export const mockUserCreate = (result?: User) =>
  mocked(Dal.Users.create).mockResolvedValueOnce(result);

export const mockUserUpdate = (result: boolean) =>
  mocked(Dal.Users.Update).mockResolvedValueOnce(result);
