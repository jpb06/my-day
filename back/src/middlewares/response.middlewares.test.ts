import { NextFunction } from "express";

import {
    mockExpressRequest, mockExpressResponse
} from "../tests-related/mocks/logic/express.mocks";
import { ApiResponse } from "../types/express-response/api.response.interface";
import { responseMiddlewares } from "./";

describe("Response middlewares", () => {
  let request = mockExpressRequest({}, {}, "/yolo");
  let response = mockExpressResponse<ApiResponse>();
  let nextFunction: NextFunction = jest.fn();
  console.log = jest.fn();

  it("should define helper functions", () => {
    responseMiddlewares(request, response, nextFunction);

    expect(response.populate).not.toBeUndefined();
    expect(response.populate).toStrictEqual(expect.any(Function));

    expect(response.answer).not.toBeUndefined();
    expect(response.answer).toStrictEqual(expect.any(Function));

    expect(response.answerFrom).not.toBeUndefined();
    expect(response.answerFrom).toStrictEqual(expect.any(Function));

    expect(nextFunction).toHaveBeenCalledTimes(1);
  });
});
