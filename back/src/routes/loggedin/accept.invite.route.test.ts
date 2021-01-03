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
import { acceptInviteRoute } from "./accept.invite.route";

jest.mock("../../dal");

describe("Accept invite route", () => {
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

    await acceptInviteRoute(request, response, nextFunction);

    expect(console.log).toHaveBeenCalledTimes(1);
    expect(response.answer).toHaveBeenCalledWith(500, "Internal service error");
  });

  it("should return a 409 if the invite does not exist for the logged user", async () => {
    request = mockExpressRequest({}, { id: newObjectId() }, "/yolo");
    response = mockExpressResponse<LoggedUserResponse>({
      loggedUser: user,
    });

    await acceptInviteRoute(request, response, nextFunction);

    expect(response.answer).toHaveBeenCalledWith(409, "Invite not found");
  });

  it("should return a 409 if the invite team cannot be found", async () => {
    request = mockExpressRequest({}, { id: user.invites[0]._id }, "/yolo");
    response = mockExpressResponse<LoggedUserResponse>({
      loggedUser: user,
    });
    mockGetTeamById(undefined);

    await acceptInviteRoute(request, response, nextFunction);

    expect(response.answer).toHaveBeenCalledWith(409, "Team not found");
  });

  it("should accept the invite", async () => {
    request = mockExpressRequest({}, { id: user.invites[0]._id }, "/yolo");
    response = mockExpressResponse<LoggedUserResponse>({
      loggedUser: user,
    });
    mockGetTeamById({
      ...user.invites[0].team,
      members: [],
      recruits: [{ _id: user.invites[0]._id, email: "yolo@bro.org" }],
    });
    mockUserUpdate(true);
    mockTeamUpdate(true);

    await acceptInviteRoute(request, response, nextFunction);

    expect(Dal.Users.Update).toHaveBeenCalledWith({ ...user, invites: [] });
    expect(Dal.Teams.Update).toHaveBeenCalledWith({
      ...invite.team,
      members: [toBareUser(user)],
      recruits: [],
    });
    expect(response.status).toHaveBeenCalledWith(200);
  });
});
