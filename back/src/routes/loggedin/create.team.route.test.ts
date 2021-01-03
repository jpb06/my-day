import { NextFunction } from "express";
import { Request } from "express";
import { mocked } from "ts-jest/utils";

import { User } from "../../../../front/src/stack-shared-code/types";
import Dal from "../../dal";
import { newObjectId } from "../../dal/mockdb/logic";
import { mockCreateByMember, mockGetTeamByName } from "../../tests-related/dal.teams.mocks";
import { mockExpressRequest, mockExpressResponse } from "../../tests-related/express.mocks";
import { LoggedUserResponse } from "../../types/express-response/logged.user.response.interface";
import { toBareUser } from "../../types/transformers";
import { createTeamRoute } from "./create.team.route";

jest.mock("../../dal");

describe("Create team route", () => {
  let request = mockExpressRequest({}, {}, "/yolo");
  let response = mockExpressResponse<LoggedUserResponse>();
  const nextFunction: NextFunction = jest.fn();
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
    invites: [],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a 500 if there was an error", async () => {
    console.log = jest.fn();

    await createTeamRoute(request, response, nextFunction);

    expect(console.log).toHaveBeenCalledTimes(1);
    expect(response.answer).toHaveBeenCalledWith(500, "Internal service error");
  });

  it("should return a 409 if a team with provided name already exists", async () => {
    request = mockExpressRequest({}, { name: "My cool team" }, "/yolo");
    response = mockExpressResponse<LoggedUserResponse>({
      loggedUser: user,
    });
    mockGetTeamByName({
      _id: newObjectId(),
      name: "My cool team",
      members: [],
      recruits: [],
    });

    await createTeamRoute(request, response, nextFunction);

    expect(response.answer).toHaveBeenCalledWith(
      409,
      `Team My cool team already exists`
    );
  });

  it("should create a team", async () => {
    const teamId = newObjectId();
    const teamName = "My cool team";
    request = mockExpressRequest({}, { name: teamName }, "/yolo");
    response = mockExpressResponse<LoggedUserResponse>(
      {
        loggedUser: user,
      },
      teamId
    );

    mockGetTeamByName(undefined);
    mockCreateByMember(teamId);

    await createTeamRoute(request, response, nextFunction);

    expect(Dal.Teams.createByMember).toHaveBeenCalledWith(
      teamName,
      toBareUser(user)
    );

    expect(response.populate).toHaveBeenCalledWith({
      _id: teamId,
      name: teamName,
    });
  });
});
