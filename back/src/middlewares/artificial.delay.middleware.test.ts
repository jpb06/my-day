import { NextFunction } from "express";

import { mockExpressRequest, mockExpressResponse } from "../tests-related/express.mocks";
import { ApiResponse } from "../types/express-response/api.response.interface";
import { artificialDelayMiddleware } from "./";

jest.useFakeTimers();

describe("Artificial delay middleware", () => {
  let request = mockExpressRequest();
  let response = mockExpressResponse<ApiResponse>();
  let nextFunction: NextFunction = jest.fn();

  it("should call next with some delay", () => {
    artificialDelayMiddleware(request, response, nextFunction);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(nextFunction, 800);
  });
});
