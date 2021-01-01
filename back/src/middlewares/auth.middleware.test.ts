import { NextFunction } from "express";
import jwt from "jsonwebtoken";
import { mocked } from "ts-jest/utils";

import { newObjectId } from "../dal/mockdb/logic";
import { CacheService } from "../services/cache.service";
import { mockExpressRequest, mockExpressResponse } from "../tests-related/express.mocks";
import { LoggedUserResponse } from "../types/express-response/logged.user.response.interface";
import { authMiddleware } from "./";

jest.mock("../services/cache.service");
jest.mock("jsonwebtoken");

describe("Auth middleware", () => {
  let request = mockExpressRequest({});
  let response = mockExpressResponse<LoggedUserResponse>();
  let nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should return 401 if there is no token in the headers", async () => {
    await authMiddleware(request, response, nextFunction);

    expect(response.answer).toHaveBeenCalledTimes(1);
    expect(response.answer).toHaveBeenLastCalledWith(401, "Not logged in");
  });

  it("should return 401 if token in the headers is invalid", async () => {
    request = mockExpressRequest({ authorization: "yolo" });
    await authMiddleware(request, response, nextFunction);

    expect(response.answer).toHaveBeenCalledTimes(1);
    expect(response.answer).toHaveBeenLastCalledWith(401, "Not logged in");
  });

  it("should call next function if token has been verified", async () => {
    request = mockExpressRequest({ authorization: "Bearer yolo" });
    response = mockExpressResponse<LoggedUserResponse>();
    mocked(CacheService.GetAppKeys).mockResolvedValueOnce({
      _id: newObjectId(),
      publicKey: "public",
      privateKey: "private",
      generationDate: new Date().toISOString(),
    });
    mocked(jwt.verify).mockImplementationOnce(() => ({ id: "123" }));

    await authMiddleware(request, response, nextFunction);

    expect(response.answer).toHaveBeenCalledTimes(0);
    expect(nextFunction).toHaveBeenCalledTimes(1);
    expect(response.locals.userId).toEqual("123");
  });

  it("should return 401 if token expired", async () => {
    request = mockExpressRequest({ authorization: "Bearer yolo" });
    response = mockExpressResponse<LoggedUserResponse>();
    mocked(CacheService.GetAppKeys).mockResolvedValueOnce({
      _id: newObjectId(),
      publicKey: "public",
      privateKey: "private",
      generationDate: new Date().toISOString(),
    });
    mocked(jwt.verify).mockImplementationOnce(() => {
      throw { name: "TokenExpiredError" };
    });

    await authMiddleware(request, response, nextFunction);

    expect(response.answer).toHaveBeenCalledTimes(1);
    expect(response.answer).toHaveBeenLastCalledWith(401, "Token has expired");
    expect(nextFunction).toHaveBeenCalledTimes(0);
  });

  it("should return 401 if token verification failed", async () => {
    request = mockExpressRequest({ authorization: "Bearer yolo" });
    response = mockExpressResponse<LoggedUserResponse>();
    mocked(CacheService.GetAppKeys).mockResolvedValueOnce({
      _id: newObjectId(),
      publicKey: "public",
      privateKey: "private",
      generationDate: new Date().toISOString(),
    });
    mocked(jwt.verify).mockImplementationOnce(() => {
      throw { name: "JsonWebTokenError", message: "jwt subject invalid" };
    });

    await authMiddleware(request, response, nextFunction);

    expect(response.answer).toHaveBeenCalledTimes(1);
    expect(response.answer).toHaveBeenLastCalledWith(401, "Invalid token");
    expect(nextFunction).toHaveBeenCalledTimes(0);
  });

  it("should return 500 on non specific errors", async () => {
    request = mockExpressRequest({ authorization: "Bearer yolo" });
    response = mockExpressResponse<LoggedUserResponse>();
    mocked(CacheService.GetAppKeys).mockResolvedValueOnce({
      _id: newObjectId(),
      publicKey: "public",
      privateKey: "private",
      generationDate: new Date().toISOString(),
    });
    mocked(jwt.verify).mockImplementationOnce(() => {
      throw { name: "yolo", message: "cool" };
    });

    await authMiddleware(request, response, nextFunction);

    expect(response.answer).toHaveBeenCalledTimes(1);
    expect(response.answer).toHaveBeenLastCalledWith(500, "cool");
    expect(nextFunction).toHaveBeenCalledTimes(0);
  });
});
