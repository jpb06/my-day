import { NextFunction } from "express";

import {
    mockExpressRequest, mockExpressResponse
} from "../tests-related/mocks/logic/express.mocks";
import { ApiResponse } from "../types/express-response/api.response.interface";
import { errorsMiddleware } from "./";

describe("Errors middleware", () => {
  let request = mockExpressRequest();
  let response = mockExpressResponse<ApiResponse>();
  let nextFunction: NextFunction = jest.fn();

  beforeAll(() => {
    jest.resetAllMocks();
  });

  beforeEach(() => {
    console.log = jest.fn();
  });

  it("should call answer with 500", () => {
    errorsMiddleware({}, request, response, nextFunction);

    expect(console.log).toHaveBeenCalledTimes(1);
    expect(response.answer).toHaveBeenCalledWith(500, expect.any(String));
  });

  it("should call answer with passed status", () => {
    errorsMiddleware({ status: 401 }, request, response, nextFunction);

    expect(console.log).toHaveBeenCalledTimes(1);
    expect(response.answer).toHaveBeenCalledWith(401, expect.any(String));
  });
});
