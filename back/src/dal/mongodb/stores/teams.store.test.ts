import { ObjectId } from "mongodb";
import * as GenericDal from "mongodb-generic-dal";
import { mocked } from "ts-jest/utils";

import { BareUser, Team } from "../../../../../front/src/stack-shared-code/types";
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

    const { data, logs } = await TeamsStore.create("My cool team");

    expect(logs).toBeUndefined();
    expect(data).not.toBeUndefined();
    expect(data).toEqual(insertedId);
  });

  it("should create a team with a member", async () => {
    const insertedId = newObjectId();
    mocked(GenericDal.create).mockReturnValueOnce(
      Promise.resolve<ObjectId>(insertedId)
    );

    const { data, logs } = await TeamsStore.createByMember("My cool team", {
      _id: newObjectId(),
      id: "123",
    });

    expect(logs).toBeUndefined();
    expect(data).not.toBeUndefined();
    expect(data).toEqual(insertedId);
  });

  it("should get a team from its id", async () => {
    const team = {
      _id: newObjectId(),
      name: "My team",
      members: [],
      recruits: [],
    };
    mocked(GenericDal.getBy).mockReturnValueOnce(
      Promise.resolve<Array<Team>>([team])
    );

    const { data, logs } = await TeamsStore.getById(team._id);

    expect(logs).toBeUndefined();
    expect(data).not.toBeUndefined();
    expect(data).toEqual(team);
  });

  it("should return undefined if several teams are found for an id", async () => {
    mocked(GenericDal.getBy).mockReturnValueOnce(
      Promise.resolve<Array<Team>>([
        {
          _id: newObjectId(),
          name: "My team 1",
          members: [],
          recruits: [],
        },
        {
          _id: newObjectId(),
          name: "My team 2",
          members: [],
          recruits: [],
        },
      ])
    );

    const { data, logs } = await TeamsStore.getById(newObjectId());

    expect(logs).toBeUndefined();
    expect(data).toBeUndefined();
  });

  it("should get a team from its name", async () => {
    const team = {
      _id: newObjectId(),
      name: "My team",
      members: [],
      recruits: [],
    };
    mocked(GenericDal.getBy).mockReturnValueOnce(
      Promise.resolve<Array<Team>>([team])
    );

    const { data, logs } = await TeamsStore.getByName(team.name);

    expect(logs).toBeUndefined();
    expect(data).not.toBeUndefined();
    expect(data).toEqual(team);
  });

  it("should return undefined if several teams are found for a name", async () => {
    mocked(GenericDal.getBy).mockReturnValueOnce(
      Promise.resolve<Array<Team>>([
        {
          _id: newObjectId(),
          name: "My team 1",
          members: [],
          recruits: [],
        },
        {
          _id: newObjectId(),
          name: "My team 2",
          members: [],
          recruits: [],
        },
      ])
    );

    const { data, logs } = await TeamsStore.getByName("Yolo");

    expect(logs).toBeUndefined();
    expect(data).toBeUndefined();
  });

  it("should return undefined if team could not be found (team members)", async () => {
    mocked(GenericDal.getBy).mockReturnValueOnce(
      Promise.resolve<Array<Team>>([])
    );

    const { data, logs } = await TeamsStore.GetTeamMembers(newObjectId());

    expect(logs).toBeUndefined();
    expect(data).toBeUndefined();
  });

  it("should return the team members", async () => {
    mocked(GenericDal.getBy).mockReturnValueOnce(
      Promise.resolve<Array<Team>>([
        {
          _id: newObjectId(),
          name: "My team",
          members: [
            {
              _id: newObjectId(),
              id: "123",
            },
            {
              _id: newObjectId(),
              id: "456",
            },
          ],
          recruits: [],
        },
      ])
    );

    const { data, logs } = await TeamsStore.GetTeamMembers(newObjectId());

    expect(logs).toBeUndefined();
    expect(data).not.toBeUndefined();
    expect(data).toHaveLength(2);
    const users = data as Array<BareUser>;
    expect(users[0].id).toEqual("123");
    expect(users[1].id).toEqual("456");
  });

  it("should return the user teams", async () => {
    mocked(GenericDal.getBy).mockReturnValueOnce(
      Promise.resolve<Array<Team>>([
        {
          _id: newObjectId(),
          name: "Team 1",
          members: [],
          recruits: [],
        },
        {
          _id: newObjectId(),
          name: "Team 2",
          members: [],
          recruits: [],
        },
      ])
    );

    const { data, logs } = await TeamsStore.getUserTeams(newObjectId());

    expect(logs).toBeUndefined();
    expect(data).not.toBeUndefined();
    expect(data).toHaveLength(2);
    const teams = data as Array<Team>;
    expect(teams[0].name).toEqual("Team 1");
    expect(teams[1].name).toEqual("Team 2");
  });

  it("should return true if team exists", async () => {
    const name = "Team 1";
    mocked(GenericDal.getBy).mockReturnValueOnce(
      Promise.resolve<Array<Team>>([
        {
          _id: newObjectId(),
          name,
          members: [],
          recruits: [],
        },
      ])
    );

    const { data, logs } = await TeamsStore.exists(name);

    expect(logs).toBeUndefined();
    expect(data).not.toBeUndefined();
    expect(data).toBe(true);
  });

  it("should return true if team does not exist", async () => {
    const name = "Team 1";
    mocked(GenericDal.getBy).mockReturnValueOnce(
      Promise.resolve<Array<Team>>([])
    );

    const { data, logs } = await TeamsStore.exists(name);

    expect(logs).toBeUndefined();
    expect(data).not.toBeUndefined();
    expect(data).toBe(false);
  });

  it("should update a team", async () => {
    const team = {
      _id: newObjectId(),
      name: "Team 1",
      members: [],
      recruits: [],
    };

    mocked(GenericDal.createOrUpdate).mockReturnValueOnce(
      Promise.resolve<Team>(team)
    );

    const { data, logs } = await TeamsStore.Update(team);

    expect(logs).toBeUndefined();
    expect(data).not.toBeUndefined();
    expect(data).toBe(true);
  });

  it("should return false if team could not be updated", async () => {
    const team = {
      _id: newObjectId(),
      name: "Team 1",
      members: [],
      recruits: [],
    };

    mocked(GenericDal.createOrUpdate).mockReturnValueOnce(
      Promise.resolve<Team | undefined>(undefined)
    );

    const { data, logs } = await TeamsStore.Update(team);

    expect(logs).toBeUndefined();
    expect(data).not.toBeUndefined();
    expect(data).toBe(false);
  });
});
