import chalk from "chalk";
import { NextFunction, Request } from "express";

import { AnswerData, ApiResponse } from "../types/api.response.interface";
import { DBResult } from "../types/db.result.interface";

const isEmpty = (obj: any) => {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }

  return JSON.stringify(obj) === JSON.stringify({});
};

const logRouteResult = (
  req: Request,
  res: ApiResponse,
  status: number,
  data: any
) => {
  const isDevEnv = process.env.NODE_ENV === "development";
  if (isDevEnv) {
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
    if (Array.isArray(res.locals.routeLogs)) {
      res.locals.routeLogs.forEach((el: string) =>
        console.log(`${new Date().toLocaleTimeString()} ${el}`)
      );
    }
    console.log("\n");
  }
};

export const responseMiddlewares = (
  req: Request,
  res: ApiResponse,
  next: NextFunction
) => {
  res.populate = (data: any): ApiResponse => {
    if (data === undefined) {
      logRouteResult(req, res, 404, null);
      return res.status(404).json(null);
    } else {
      logRouteResult(req, res, 200, data);
      return res.status(200).json(data);
    }
  };
  res.answer = (status: number, data: any): ApiResponse => {
    logRouteResult(req, res, status, data);
    return res.status(status).json(data);
  };
  res.answerFrom = (data: AnswerData): ApiResponse => {
    logRouteResult(req, res, data.code, data.text);
    return res.status(data.code).json(data.text);
  };
  res.log = async <T>(
    job: (...params: any) => Promise<DBResult<T>>,
    ...params: any
  ): Promise<T> => {
    const { data, logs } = await job(params);

    if (logs) {
      res.locals.routeLogs.push(logs);
    }

    return data;
  };

  next();
};
