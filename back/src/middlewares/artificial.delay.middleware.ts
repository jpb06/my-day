import { NextFunction, Request } from "express";

import { ApiResponse } from "../types/express-response/api.response.interface";

export const artificialDelayMiddleware = (
  req: Request,
  res: ApiResponse,
  next: NextFunction
) => setTimeout(next, 800);
