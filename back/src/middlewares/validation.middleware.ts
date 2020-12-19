import { NextFunction, Request } from "express";
import { ValidationError, validationResult } from "express-validator";

import { ApiResponse } from "../types/express-response/api.response.interface";

const errorFormatter = (error: ValidationError) => {
  return `${error.param} ${error.msg}`;
};

export const validationMiddleware = (
  req: Request,
  res: ApiResponse,
  next: NextFunction
) => {
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    return res.answer(400, errors.array());
  }

  return next();
};
