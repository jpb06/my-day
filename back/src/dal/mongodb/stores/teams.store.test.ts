import { ObjectId } from "mongodb";
import * as GenericDal from "mongodb-generic-dal";
import { mocked } from "ts-jest/utils";

import { BareUser, Team } from "../../../../../front/src/stack-shared-code/types";
import { mockedTeam } from "../../../tests-related/mocks/data/team.mocked.data";
import { mockedUser } from "../../../tests-related/mocks/data/user.mocked.data";
import { newObjectId } from "../../mockdb/logic";
import * as TeamsStore from "./teams.store";

jest.mock("mongodb-generic-dal");

describe("Teams store", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should create a team", async () => {
    const insertedId = newObjectId();
    mocked(GenericDal.create).mockReturnValueOnce(
      Promise.resolve<ObjectId>(insertedId)
    );

    const id = await TeamsStore.create("My cool team", newObjectId());

    expect(id).not.toBeUndefined();
    expect(id).toEqual(insertedId);
  });

  it("should create a team with a member", async () => {
    const insertedId = newObjectId();
    mocked(GenericDal.create).mockReturnValueOnce(
      Promise.resolve<ObjectId>(insertedId)
    );

    const id = await TeamsStore.createByMember(
      "My cool team",
      mockedUser(),
      newObjectId()
    );

    expect(id).not.toBeUndefined();
    expect(id).toEqual(insertedId);
  });

  it("should get a team from its id", async () => {
    const team = mockedTeam("My team");
    mocked(GenericDal.getBy).mockReturnValueOnce(
      Promise.resolve<Array<Team>>([team])
    );

    const data = await TeamsStore.getById(team._id, newObjectId());

    expect(data).not.toBeUndefined();
    expect(data).toEqual(team);
  });

  it("should return undefined if several teams are found for an id", async () => {
    mocked(GenericDal.getBy).mockReturnValueOnce(
      Promise.resolve<Array<Team>>([
        mockedTeam("My team 1"),
        mockedTeam("My team 2"),
      ])
    );

    const team = await TeamsStore.getById(newObjectId(), newObjectId());

    expect(team).toBeUndefined();
  });

  it("should get a team from its name", async () => {
    const team = mockedTeam("My team");
    mocked(GenericDal.getBy).mockReturnValueOnce(
      Promise.resolve<Array<Team>>([team])
    );

    const data = await TeamsStore.getByName(team.name, newObjectId());

    expect(data).not.toBeUndefined();
    expect(data).toEqual(team);
  });

  it("should return undefined if several teams are found for a name", async () => {
    mocked(GenericDal.getBy).mockReturnValueOnce(
      Promise.resolve<Array<Team>>([
        mockedTeam("My team 1"),
        mockedTeam("My team 2"),
      ])
    );

    const team = await TeamsStore.getByName("Yolo", newObjectId());

    expect(team).toBeUndefined();
  });

  it("should return undefined if team could not be found (team members)", async () => {
    mocked(GenericDal.getBy).mockReturnValueOnce(
      Promise.resolve<Array<Team>>([])
    );

    const users = await TeamsStore.GetTeamMembers(newObjectId(), newObjectId());

    expect(users).toBeUndefined();
  });

  it("should return the team members", async () => {
    mocked(GenericDal.getBy).mockReturnValueOnce(
      Promise.resolve<Array<Team>>([
        mockedTeam("My team", [
          {
            _id: newObjectId(),
            id: "123",
          },
          {
            _id: newObjectId(),
            id: "456",
          },
        ]),
      ])
    );

    const data = await TeamsStore.GetTeamMembers(newObjectId(), newObjectId());

    expect(data).not.toBeUndefined();
    expect(data).toHaveLength(2);
    const users = data as Array<BareUser>;
    expect(users[0].id).toEqual("123");
    expect(users[1].id).toEqual("456");
  });

  it("should return the user teams", async () => {
    mocked(GenericDal.getBy).mockReturnValueOnce(
      Promise.resolve<Array<Team>>([mockedTeam("Team 1"), mockedTeam("Team 2")])
    );

    const data = await TeamsStore.getUserTeams(newObjectId(), newObjectId());

    expect(data).not.toBeUndefined();
    expect(data).toHaveLength(2);
    const teams = data as Array<Team>;
    expect(teams[0].name).toEqual("Team 1");
    expect(teams[1].name).toEqual("Team 2");
  });

  it("should return true if team exists", async () => {
    const name = "Team 1";
    mocked(GenericDal.getBy).mockReturnValueOnce(
      Promise.resolve<Array<Team>>([mockedTeam(name)])
    );

    const result = await TeamsStore.exists(name, newObjectId());

    expect(result).not.toBeUndefined();
    expect(result).toBe(true);
  });

  it("should return true if team does not exist", async () => {
    const name = "Team 1";
    mocked(GenericDal.getBy).mockReturnValueOnce(
      Promise.resolve<Array<Team>>([])
    );

    const exists = await TeamsStore.exists(name, newObjectId());

    expect(exists).not.toBeUndefined();
    expect(exists).toBe(false);
  });

  it("should update a team", async () => {
    const team = mockedTeam("Team 1");

    mocked(GenericDal.createOrUpdate).mockReturnValueOnce(
      Promise.resolve<Team>(team)
    );

    const result = await TeamsStore.Update(team, newObjectId());

    expect(result).not.toBeUndefined();
    expect(result).toBe(true);
  });

  it("should return false if team could not be updated", async () => {
    const team = mockedTeam("Team 1");

    mocked(GenericDal.createOrUpdate).mockReturnValueOnce(
      Promise.resolve<Team | undefined>(undefined)
    );

    const result = await TeamsStore.Update(team, newObjectId());

    expect(result).not.toBeUndefined();
    expect(result).toBe(false);
  });
});
