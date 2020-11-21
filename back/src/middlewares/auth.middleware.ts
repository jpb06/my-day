import { NextFunction, Request } from "express";
import jwt from "jsonwebtoken";

import { CacheService } from "../services/cache.service";
import { ApiResponse } from "../types/api.response.interface";

const verifyHeaders = (req: Request, res: ApiResponse) => {
  const authorizationHeaders = req.headers.authorization || "";
  const chunks = authorizationHeaders.split(" ");

  if (chunks.length === 0 || chunks[0] !== "Bearer" || chunks[1].length === 0) {
    return "";
  }

  return chunks[1];
};

export const authMiddleware = async (
  req: Request,
  res: ApiResponse,
  next: NextFunction
) => {
  try {
    const token = verifyHeaders(req, res);
    if (token === "") {
      return res.answer(401, "Not logged in");
    }

    const keys = await CacheService.GetAppKeys();
    const payload = jwt.verify(token, keys.publicKey);
    res.locals.userId = (payload as any).id;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.answer(401, "Token has expired");
    } else if (
      error.name === "JsonWebTokenError" &&
      error.message.startsWith("jwt subject invalid")
    ) {
      return res.answer(401, "Invalid token");
    } else {
      return res.answer(500, error.message);
    }
  }
};
