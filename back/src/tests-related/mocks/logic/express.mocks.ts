import { Request } from "express";

export const mockExpressRequest = (
  headers?: any,
  body?: any,
  url?: string
): Request => {
  return {
    url,
    headers,
    body,
  } as Request;
};

export const mockExpressResponse = <T>(locals: any = {}): T => {
  const json = jest.fn();
  return ({
    locals,
    json,
    status: jest.fn().mockImplementation(() => ({
      json,
    })),
    answer: jest.fn(),
    answerFrom: jest.fn(),
    populate: jest.fn(),
  } as unknown) as T;
};
