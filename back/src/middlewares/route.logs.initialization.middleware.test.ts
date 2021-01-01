import { NextFunction } from "express";

import { mockExpressRequest, mockExpressResponse } from "../tests-related/express.mocks";
import { ApiResponse } from "../types/express-response/api.response.interface";
import { routeLogsInitializationMiddleware } from "./";

describe("Route logs initialization middleware", () => {
  let request = mockExpressRequest();
  let response = mockExpressResponse<ApiResponse>();
  let nextFunction: NextFunction = jest.fn();

  it("should set logs as an empty array in locals and call next", () => {
    routeLogsInitializationMiddleware(request, response, nextFunction);

    expect(response.locals.routeLogs).toEqual([]);
    expect(nextFunction).toHaveBeenCalledTimes(1);
  });
});
