import { Response } from "express";

import { DBResult } from "./db.result.interface";

export interface AnswerData {
  code: number;
  text: any;
}

export interface ApiResponse extends Response {
  populate: (data: any) => Response;
  answer: (status: number, data: any) => Response;
  answerFrom: (data: AnswerData) => Response;
  log: <T>(
    job: (...params: any) => Promise<DBResult<T>>,
    ...params: any
  ) => Promise<T>;
}
