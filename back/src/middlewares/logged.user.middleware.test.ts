import { NextFunction } from "express";
import { mocked } from "ts-jest/utils";

import Dal from "../dal";
import { newObjectId } from "../dal/mockdb/logic";
import {
    mockExpressRequest, mockExpressResponse
} from "../tests-related/mocks/logic/express.mocks";
import { LoggedUserResponse } from "../types/express-response/logged.user.response.interface";
import { loggedUserMiddleware } from "./";

jest.mock("../dal");

describe("Logged user middleware", () => {
  let request = mockExpressRequest();
  let response = mockExpressResponse<LoggedUserResponse>();
  let nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should return 403 if user was not found", async () => {
    mocked(Dal.Users.getByGoogleId).mockResolvedValueOnce(undefined);

    await loggedUserMiddleware(request, response, nextFunction);

    expect(response.answer).toHaveBeenCalledTimes(1);
    expect(response.answer).toHaveBeenCalledWith(403, "Invalid user");
    expect(response.locals.loggedUser).toBeUndefined();
    expect(nextFunction).toHaveBeenCalledTimes(0);
  });

  it("should set user in locals and call next function if user was found", async () => {
    const user = { _id: newObjectId(), id: "123", teams: [], invites: [] };
    mocked(Dal.Users.getByGoogleId).mockResolvedValueOnce(user);

    await loggedUserMiddleware(request, response, nextFunction);

    expect(response.answer).toHaveBeenCalledTimes(0);
    expect(response.locals.loggedUser).not.toBeUndefined();
    expect(response.locals.loggedUser).toEqual(user);
    expect(nextFunction).toHaveBeenCalledTimes(1);
  });
});
