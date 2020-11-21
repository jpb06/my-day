import { NextFunction, Request } from "express";
import { validationResult } from "express-validator";

import { ApiResponse } from "../types/api.response.interface";

export const validationMiddleware = (
  req: Request,
  res: ApiResponse,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.answer(400, errors.array());

  return next();
};
