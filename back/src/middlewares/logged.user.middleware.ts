import { NextFunction, Request } from "express";

import Dal from "../dal";
import { LoggedUserResponse } from "../types/express-response/logged.user.response.interface";

export const loggedUserMiddleware = async (
  req: Request,
  res: LoggedUserResponse,
  next: NextFunction
) => {
  const { data: user } = await Dal.Users.getByGoogleId(res.locals.userId);
  if (!user) {
    return res.answer(403, "Invalid user");
  }

  res.locals.loggedUser = user;

  return next();
};
