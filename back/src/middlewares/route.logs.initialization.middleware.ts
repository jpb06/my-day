import { NextFunction, Request } from "express";

import { ApiResponse } from "../types/api.response.interface";

export const routeLogsInitializationMiddleware = (
  req: Request,
  res: ApiResponse,
  next: NextFunction
) => {
  res.locals.routeLogs = [];

  return next();
};
