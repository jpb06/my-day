import { NextFunction } from "express";
import { mocked } from "ts-jest/utils";

import Dal from "../dal";
import { newObjectId } from "../dal/mockdb/logic";
import { mockExpressRequest, mockExpressResponse } from "../tests-related/express.mocks";
import { LoggedUserResponse } from "../types/express-response/logged.user.response.interface";
import { noRouteMiddleware } from "./";

describe("No route middleware", () => {
  let request = mockExpressRequest();
  let response = mockExpressResponse<LoggedUserResponse>();
  let nextFunction: NextFunction = jest.fn();

  beforeAll(() => {
    jest.resetAllMocks();
  });

  beforeEach(() => {
    console.log = jest.fn();
  });

  it("should call answer with 404", () => {
    noRouteMiddleware({}, request, response, nextFunction);

    expect(console.log).toHaveBeenCalledTimes(1);
    expect(response.answer).toHaveBeenCalledWith(404, expect.any(String));
  });
});
