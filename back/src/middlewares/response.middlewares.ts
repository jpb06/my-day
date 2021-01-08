import { ObjectId } from "bson";
import chalk from "chalk";
import { NextFunction, Request } from "express";

import { isDevEnv } from "../logic/environment.logic";
import { RouteLogsService } from "../services/route.logs.service";
import { AnswerData, ApiResponse } from "../types/express-response/api.response.interface";

const isEmpty = (obj?: any) => {
  if (!obj) return true;

  return JSON.stringify(obj) === JSON.stringify({});
};

const logRouteResult = (
  req: Request,
  context: ObjectId,
  status: number,
  data: any
) => {
  if (!isDevEnv()) return;

  console.log(
    `${new Date().toLocaleTimeString()} ${chalk.gray.bgWhiteBright.bold(
      " API route "
    )} - ${req.url} ${
      status === 200
        ? chalk.bgGreenBright.black(` ${status} `)
        : chalk.bgRedBright.white(` ${status} `)
    }`
  );
  if (!isEmpty(req.body)) {
    console.log(`Body: ${chalk.gray(JSON.stringify(req.body, null, 2))}`);
  }
  if (!isEmpty(req.params)) {
    console.log(`Params: ${chalk.gray(JSON.stringify(req.params, null, 2))}`);
  }
  console.log(`Result: ${chalk.gray(JSON.stringify(data, null, 2))}\n`);
  const logs = RouteLogsService.get(context);
  if (logs.length > 0) {
    logs.forEach((el: string) =>
      console.log(`${new Date().toLocaleTimeString()} ${el}`)
    );
  }
  console.log("\n");

  RouteLogsService.clear(context);
};

export const responseMiddlewares = (
  req: Request,
  res: ApiResponse,
  next: NextFunction
) => {
  res.populate = (data: any): ApiResponse => {
    let status = 200;
    let json = data;

    if (data === undefined) {
      status = 404;
      json = null;
    }

    logRouteResult(req, res.locals.context, status, json);
    return res.status(status).json(json);
  };
  res.answer = (status: number, data: any): ApiResponse => {
    logRouteResult(req, res.locals.context, status, data);
    return res.status(status).json(data);
  };
  res.answerFrom = (data: AnswerData): ApiResponse => {
    logRouteResult(req, res.locals.context, data.code, data.text);
    return res.status(data.code).json(data.text);
  };

  next();
};
