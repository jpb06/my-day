import { NextFunction } from "express";
import { Request } from "express";
import { mocked } from "ts-jest/utils";

import { User } from "../../../../front/src/stack-shared-code/types";
import Dal from "../../dal";
import { newObjectId } from "../../dal/mockdb/logic";
import { mockGetTeamById, mockTeamUpdate } from "../../tests-related/dal.teams.mocks";
import { mockUserUpdate } from "../../tests-related/dal.users.mocks";
import { mockExpressRequest, mockExpressResponse } from "../../tests-related/express.mocks";
import { LoggedUserResponse } from "../../types/express-response/logged.user.response.interface";
import { toBareUser } from "../../types/transformers";
import { inviteUserRoute } from "./invite.user.route";

jest.mock("../../dal");

describe("Invite user route", () => {
  let request = mockExpressRequest({}, {}, "/yolo");
  let response = mockExpressResponse<LoggedUserResponse>();
  const nextFunction: NextFunction = jest.fn();
  const invite = {
    _id: newObjectId(),
    team: { _id: newObjectId(), name: "The cool team" },
  };
  const user: User = {
    _id: newObjectId(),
    id: "123",
    email: "yolo@cool.org",
    isEmailVerified: true,
    familyName: "Yolo",
    givenName: "Bro",
    name: "Yolo Bro",
    locale: "fr",
    picture: "A picture",
    teams: [
      {
        _id: newObjectId(),
        name: "My team",
      },
    ],
    invites: [invite],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a 500 if there was an error", async () => {
    console.log = jest.fn();

    await inviteUserRoute(request, response, nextFunction);

    expect(console.log).toHaveBeenCalledTimes(1);
    expect(response.answer).toHaveBeenCalledWith(500, "Internal service error");
  });
});
