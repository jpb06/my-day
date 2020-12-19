import { Response } from "express";

import { LoggedResult } from "../logged.result.interface";

export interface AnswerData {
  code: number;
  text: any;
}

export interface ApiResponse extends Response {
  populate: (data: any) => Response;
  answer: (status: number, data: any) => Response;
  answerFrom: (data: AnswerData) => Response;
  log: <T>(fn: Promise<LoggedResult<T>>) => Promise<T>;
  locals: {
    routeLogs: Array<string>;
  };
}
