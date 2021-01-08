import { NextFunction } from "express";

import {
    mockExpressRequest, mockExpressResponse
} from "../tests-related/mocks/logic/express.mocks";
import { ApiResponse } from "../types/express-response/api.response.interface";
import { LoggedUserResponse } from "../types/express-response/logged.user.response.interface";
import { noRouteMiddleware } from "./";

describe("No route middleware", () => {
  let request = mockExpressRequest();
  let response = mockExpressResponse<ApiResponse>();
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
