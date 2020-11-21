import { NextFunction, Request } from "express";

import Dal from "../dal";
import { ApiResponse } from "../types/api.response.interface";

export const loggedUserMiddleware = async (
  err: any,
  req: Request,
  res: ApiResponse,
  next: NextFunction
) => {
  const user = await Dal.Users.getByGoogleId(res.locals.userId);
  if (!user) {
    return res.answer(403, "Invalid user");
  }

  res.locals.loggedUser = user;

  return next();
};
