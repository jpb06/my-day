import { NextFunction } from "express";

import { mockExpressRequest, mockExpressResponse } from "../tests-related/express.mocks";
import { mockValidationResult } from "../tests-related/express.validator.mocks";
import { ApiResponse } from "../types/express-response/api.response.interface";
import { validationMiddleware } from "./";

jest.mock("express-validator");

describe("Validation middleware", () => {
  let request = mockExpressRequest();
  let response = mockExpressResponse<ApiResponse>();
  let nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should return 400 if validation errors were found", () => {
    const errors = ["Oh no!", "Oh no no no"];
    mockValidationResult(errors);
    validationMiddleware(request, response, nextFunction);

    expect(response.answer).toHaveBeenCalledWith(400, errors);
    expect(nextFunction).toHaveBeenCalledTimes(0);
  });

  it("should call next function if no validation errors were found", () => {
    mockValidationResult();
    validationMiddleware(request, response, nextFunction);

    expect(nextFunction).toHaveBeenCalledTimes(1);
  });
});
