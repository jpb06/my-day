import { ObjectId } from "bson";
import { NextFunction } from "express";

import {
    mockExpressRequest, mockExpressResponse
} from "../tests-related/mocks/logic/express.mocks";
import { ApiResponse } from "../types/express-response/api.response.interface";
import { contextInitializationMiddleware } from "./";

describe("Context initialization middleware", () => {
  let request = mockExpressRequest();
  let response = mockExpressResponse<ApiResponse>();
  let nextFunction: NextFunction = jest.fn();

  it("should intialize context with a new object Id", () => {
    contextInitializationMiddleware(request, response, nextFunction);

    expect(response.locals.context).toEqual(expect.any(ObjectId));
    expect(nextFunction).toHaveBeenCalledTimes(1);
  });
});
