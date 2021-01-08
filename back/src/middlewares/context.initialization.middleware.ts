import { NextFunction, Request } from "express";

import { newObjectId } from "../dal/mockdb/logic";
import { ApiResponse } from "../types/express-response/api.response.interface";

export const contextInitializationMiddleware = (
  req: Request,
  res: ApiResponse,
  next: NextFunction
) => {
  res.locals.context = newObjectId();

  return next();
};
