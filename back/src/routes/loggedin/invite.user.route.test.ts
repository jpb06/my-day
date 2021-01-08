import { NextFunction } from "express";
import { mocked } from "ts-jest/utils";

import Dal from "../../dal";
import { newObjectId } from "../../dal/mockdb/logic";
import { mockGetTeamById } from "../../tests-related/mocks/logic/dal.teams.mocks";
import { mockGetByEmail } from "../../tests-related/mocks/logic/dal.users.mocks";
import {
    mockExpressRequest, mockExpressResponse
} from "../../tests-related/mocks/logic/express.mocks";
import { LoggedUserResponse } from "../../types/express-response/logged.user.response.interface";
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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a 500 if there was an error", async () => {
    console.log = jest.fn();
    mocked(Dal.Teams.getById).mockRejectedValueOnce(null);

    await inviteUserRoute(request, response, nextFunction);

    expect(console.log).toHaveBeenCalledTimes(1);
    expect(response.answer).toHaveBeenCalledWith(500, "Internal service error");
  });

  it("should return 409 if team is not found", async () => {
    mockGetTeamById(undefined);

    await inviteUserRoute(request, response, nextFunction);

    expect(response.answer).toHaveBeenCalledWith(409, "Team not found");
  });

  it("", () => {
    mockGetByEmail();
  });
});
