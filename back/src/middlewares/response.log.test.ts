import { NextFunction } from "express";
import { Request } from "express";

import { mockExpressRequest, mockExpressResponse } from "../tests-related/express.mocks";
import { ApiResponse } from "../types/express-response/api.response.interface";
import { responseMiddlewares } from "./";

const loggableFunction = async (logs?: string) => ({
  data: { yolo: true },
  logs,
});

describe("Log response function", () => {
  let request: Request;
  let response: ApiResponse;
  let nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    request = mockExpressRequest({}, {}, "/yolo");
    response = mockExpressResponse<ApiResponse>({ routeLogs: [] });
  });

  it("should not add logs to the routeLogs", async () => {
    responseMiddlewares(request, response, nextFunction);

    const result = await response.log(loggableFunction());

    expect(response.locals.routeLogs).toHaveLength(0);
    expect(result).toStrictEqual({ yolo: true });
  });

  it("should add logs to the routeLogs", async () => {
    responseMiddlewares(request, response, nextFunction);

    const log = "Oh no!";
    const result = await response.log(loggableFunction(log));

    expect(response.locals.routeLogs).toHaveLength(1);
    expect(response.locals.routeLogs[0]).toBe(log);
    expect(result).toStrictEqual({ yolo: true });
  });
});
