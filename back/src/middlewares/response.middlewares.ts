import { NextFunction, Request } from "express";

import { AnswerData, ApiResponse } from "../types/api.response.interface";

export const responseMiddlewares = (
  req: Request,
  res: ApiResponse,
  next: NextFunction
) => {
  res.populate = (data: any): ApiResponse => {
    if (data === undefined) {
      return res.status(404).json(null);
    } else {
      return res.status(200).json(data);
    }
  };
  res.answer = (status: number, data: any): ApiResponse => {
    return res.status(status).json(data);
  };
  res.answerFrom = (data: AnswerData): ApiResponse => {
    return res.status(data.code).json(data.text);
  };
  res.terminate = (status: number, message: string): void => {
    res.writeHead(status, { Connection: "close" });
    res.end(message);
  };

  next();
};
