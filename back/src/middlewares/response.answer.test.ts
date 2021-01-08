import chalk from "chalk";
import { NextFunction } from "express";
import { Request } from "express";

import { newObjectId } from "../dal/mockdb/logic";
import { RouteLogsService } from "../services/route.logs.service";
import {
    mockExpressRequest, mockExpressResponse
} from "../tests-related/mocks/logic/express.mocks";
import { ApiResponse } from "../types/express-response/api.response.interface";
import { responseMiddlewares } from "./";

describe("Answer response function", () => {
  let request: Request;
  let response: ApiResponse;
  let nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    console.log = jest.fn();
    request = mockExpressRequest({}, {}, "/yolo");
    response = mockExpressResponse<ApiResponse>({ context: newObjectId() });
  });

  it("should show logs only if node env is development", () => {
    responseMiddlewares(request, response, nextFunction);

    process.env.NODE_ENV = "production";
    response.answer(200, { yolo: true });

    expect(console.log).toHaveBeenCalledTimes(0);
  });

  it("should display route logs if any", () => {
    RouteLogsService.add(response.locals.context, "Oh no!");
    RouteLogsService.add(response.locals.context, "Uncool bro");
    responseMiddlewares(request, response, nextFunction);

    process.env.NODE_ENV = "development";
    response.answer(404, null);

    expect(console.log).toHaveBeenCalledTimes(5);
    expect(console.log).toHaveBeenNthCalledWith(
      1,
      `${new Date().toLocaleTimeString()} ${chalk.gray.bgWhiteBright.bold(
        " API route "
      )} - /yolo ${chalk.bgRedBright.white(` 404 `)}`
    );
    expect(console.log).toHaveBeenNthCalledWith(
      2,
      `Result: ${chalk.gray("null")}\n`
    );
    expect(console.log).toHaveBeenNthCalledWith(
      3,
      `${new Date().toLocaleTimeString()} Oh no!`
    );
    expect(console.log).toHaveBeenNthCalledWith(
      4,
      `${new Date().toLocaleTimeString()} Uncool bro`
    );
    expect(console.log).toHaveBeenNthCalledWith(5, "\n");
  });

  it("should return 200 with data", () => {
    responseMiddlewares(request, response, nextFunction);

    process.env.NODE_ENV = "development";
    const data = { cool: true, details: "Yoloman" };
    response.answer(200, data);

    expect(response.status).toHaveBeenCalledTimes(1);
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith(data);

    expect(console.log).toHaveBeenCalledTimes(3);
    expect(console.log).toHaveBeenNthCalledWith(
      1,
      `${new Date().toLocaleTimeString()} ${chalk.gray.bgWhiteBright.bold(
        " API route "
      )} - /yolo ${chalk.bgGreenBright.black(` 200 `)}`
    );
    expect(console.log).toHaveBeenNthCalledWith(
      2,
      `Result: ${chalk.gray(JSON.stringify(data, null, 2))}\n`
    );
    expect(console.log).toHaveBeenNthCalledWith(3, "\n");
  });

  it("should return 404 with undefined", () => {
    responseMiddlewares(request, response, nextFunction);

    process.env.NODE_ENV = "development";
    response.answer(404, undefined);

    expect(response.status).toHaveBeenCalledTimes(1);
    expect(response.status).toHaveBeenCalledWith(404);
    expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith(undefined);

    expect(console.log).toHaveBeenCalledTimes(3);
    expect(console.log).toHaveBeenNthCalledWith(
      1,
      `${new Date().toLocaleTimeString()} ${chalk.gray.bgWhiteBright.bold(
        " API route "
      )} - /yolo ${chalk.bgRedBright.white(` 404 `)}`
    );
    expect(console.log).toHaveBeenNthCalledWith(
      2,
      `Result: ${chalk.gray("undefined")}\n`
    );
    expect(console.log).toHaveBeenNthCalledWith(3, "\n");
  });

  it("should display request body if not empty", () => {
    const body = { id: 1000 };
    request.body = body;
    responseMiddlewares(request, response, nextFunction);

    process.env.NODE_ENV = "development";
    response.answer(404, null);

    expect(console.log).toHaveBeenCalledTimes(4);
    expect(console.log).toHaveBeenNthCalledWith(
      1,
      `${new Date().toLocaleTimeString()} ${chalk.gray.bgWhiteBright.bold(
        " API route "
      )} - /yolo ${chalk.bgRedBright.white(` 404 `)}`
    );
    expect(console.log).toHaveBeenNthCalledWith(
      2,
      `Body: ${chalk.gray(JSON.stringify(body, null, 2))}`
    );

    expect(console.log).toHaveBeenNthCalledWith(
      3,
      `Result: ${chalk.gray("null")}\n`
    );
    expect(console.log).toHaveBeenNthCalledWith(4, "\n");
  });

  it("should display request params if not empty", () => {
    const params = { id: "2000" };
    request.params = params;
    responseMiddlewares(request, response, nextFunction);

    process.env.NODE_ENV = "development";
    response.answer(404, null);

    expect(console.log).toHaveBeenCalledTimes(4);
    expect(console.log).toHaveBeenNthCalledWith(
      1,
      `${new Date().toLocaleTimeString()} ${chalk.gray.bgWhiteBright.bold(
        " API route "
      )} - /yolo ${chalk.bgRedBright.white(` 404 `)}`
    );
    expect(console.log).toHaveBeenNthCalledWith(
      2,
      `Params: ${chalk.gray(JSON.stringify(params, null, 2))}`
    );

    expect(console.log).toHaveBeenNthCalledWith(
      3,
      `Result: ${chalk.gray("null")}\n`
    );
    expect(console.log).toHaveBeenNthCalledWith(4, "\n");
  });
});
