import { NextFunction } from "express";
import { Request } from "express";

import { newObjectId } from "../../dal/mockdb/logic";
import { mockGetAppKeys } from "../../tests-related/mocks/logic/cache.service.mocks";
import { mockGetByGoogleId, mockUserCreate } from "../../tests-related/mocks/logic/dal.users.mocks";
import {
    mockExpressRequest, mockExpressResponse
} from "../../tests-related/mocks/logic/express.mocks";
import { mockOAuth2Client } from "../../tests-related/mocks/logic/google.auth.library.mocks";
import { mockJwtSign } from "../../tests-related/mocks/logic/jsonwebtoken.mocks";
import { ApiResponse } from "../../types/express-response/api.response.interface";
import { loginRoute } from "./login.route";

jest.mock("google-auth-library");
jest.mock("jsonwebtoken");
jest.mock("../../dal");
jest.mock("../../services/cache.service");

describe("Login route", () => {
  let request: Request;
  let response: ApiResponse;
  let nextFunction: NextFunction = jest.fn();
  const googleUser = {
    sub: "sub",
    email: "yolo@cool.org",
    email_verified: true,
    family_name: "Yolo",
    given_name: "Bro",
    name: "Yolo Bro",
    locale: "fr",
    picture: "A picture",
    iss: "iss",
    iat: 1,
    aud: "aud",
    exp: 1,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    request = mockExpressRequest({}, {}, "/yolo");
    response = mockExpressResponse<ApiResponse>();
  });

  it("should return a 401 if there was an error", async () => {
    console.log = jest.fn();

    await loginRoute(request, response, nextFunction);

    expect(console.log).toHaveBeenCalledTimes(1);
    expect(response.answer).toHaveBeenCalledWith(401, "Unauthorized");
  });

  it("should return a 401 if payload couldn't be retrieved", async () => {
    mockOAuth2Client();

    await loginRoute(request, response, nextFunction);

    expect(response.answer).toHaveBeenCalledWith(401, "Unauthorized");
  });

  it("should create the user if not existing and return a token and the new user teams as an empty array", async () => {
    const response = mockExpressResponse<ApiResponse>({ routeLogs: [] });
    mockOAuth2Client(googleUser);
    mockGetByGoogleId({
      _id: newObjectId(),
      id: "123",
      teams: [],
      invites: [],
    });
    mockGetAppKeys({
      privateKey: "",
    });
    mockJwtSign("Yolo");

    await loginRoute(request, response, nextFunction);

    expect(response.populate).toHaveBeenCalledWith({
      token: "Yolo",
      teams: [],
    });
  });

  it("should return an error 500 if user cannot be created", async () => {
    const response = mockExpressResponse<ApiResponse>({ routeLogs: [] });
    mockOAuth2Client(googleUser);
    mockGetByGoogleId(undefined);
    mockUserCreate(undefined);
    mockGetAppKeys({
      privateKey: "",
    });
    mockJwtSign("Yolo");

    await loginRoute(request, response, nextFunction);

    expect(response.populate).toHaveBeenCalledTimes(0);
    expect(response.answer).toHaveBeenCalledWith(500, "Unable to create user");
  });

  it("should find an existing user and return a token as well as the user teams", async () => {
    const response = mockExpressResponse<ApiResponse>({ routeLogs: [] });
    mockOAuth2Client(googleUser);
    mockGetByGoogleId({
      _id: newObjectId(),
      id: "123",
      teams: [],
      invites: [],
    });
    mockGetAppKeys({
      privateKey: "",
    });
    mockJwtSign("Yolo");

    await loginRoute(request, response, nextFunction);

    expect(response.populate).toHaveBeenCalledWith({
      token: "Yolo",
      teams: [],
    });
  });
});
