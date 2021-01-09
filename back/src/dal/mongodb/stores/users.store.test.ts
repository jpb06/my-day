import * as GenericDal from "mongodb-generic-dal";
import { mocked } from "ts-jest/utils";

import { User } from "../../../../../front/src/stack-shared-code/types";
import { newObjectId } from "../../mockdb/logic";
import * as UsersStore from "./users.store";

jest.mock("mongodb-generic-dal");

describe("Users store", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should create a user", async () => {
    const insertedId = newObjectId();
    mocked(GenericDal.createOrUpdate).mockReturnValueOnce(
      Promise.resolve<User>({
        _id: insertedId,
        id: "123",
        teams: [],
        invites: [],
      })
    );

    const user = await UsersStore.create(
      {
        _id: insertedId,
        id: "123",
      },
      newObjectId()
    );

    expect(user).not.toBeUndefined();
    expect(user?._id).toEqual(insertedId);
  });

  it("should get a user from its google id", async () => {
    mocked(GenericDal.getBy).mockReturnValueOnce(
      Promise.resolve<Array<User>>([
        {
          _id: newObjectId(),
          id: "123",
          teams: [],
          invites: [],
        },
      ])
    );

    const user = await UsersStore.getByGoogleId("123", newObjectId());

    expect(user).not.toBeUndefined();
    expect(user?.id).toEqual("123");
  });

  it("should return undefined if several users were found for the google id provided", async () => {
    mocked(GenericDal.getBy).mockReturnValueOnce(
      Promise.resolve<Array<User>>([
        {
          _id: newObjectId(),
          id: "123",
          teams: [],
          invites: [],
        },
        {
          _id: newObjectId(),
          id: "456",
          teams: [],
          invites: [],
        },
      ])
    );

    const user = await UsersStore.getByGoogleId("123", newObjectId());

    expect(user).toBeUndefined();
  });

  it("should get a user from its email", async () => {
    mocked(GenericDal.getBy).mockReturnValueOnce(
      Promise.resolve<Array<User>>([
        {
          _id: newObjectId(),
          id: "123",
          email: "yolo@bro.org",
          teams: [],
          invites: [],
        },
      ])
    );

    const user = await UsersStore.getByEmail("yolo@bro.org", newObjectId());

    expect(user).not.toBeUndefined();
    expect(user?.id).toEqual("123");
  });

  it("should return undefined if several users were found for the email provided", async () => {
    mocked(GenericDal.getBy).mockReturnValueOnce(
      Promise.resolve<Array<User>>([
        {
          _id: newObjectId(),
          id: "123",
          email: "yolo@bro.org",
          teams: [],
          invites: [],
        },
        {
          _id: newObjectId(),
          id: "456",
          email: "cool@bro.org",
          teams: [],
          invites: [],
        },
      ])
    );

    const user = await UsersStore.getByEmail("yolo@bro.org", newObjectId());

    expect(user).toBeUndefined();
  });

  it("should update a user", async () => {
    const user: User = {
      _id: newObjectId(),
      id: "123",
      teams: [],
      invites: [],
    };

    mocked(GenericDal.createOrUpdate).mockReturnValueOnce(
      Promise.resolve<User>(user)
    );

    const result = await UsersStore.Update(user, newObjectId());

    expect(result).not.toBeUndefined();
    expect(result).toBe(true);
  });

  it("should return false if the user could not be updated", async () => {
    const user: User = {
      _id: newObjectId(),
      id: "123",
      teams: [],
      invites: [],
    };

    mocked(GenericDal.createOrUpdate).mockReturnValueOnce(
      Promise.resolve<User | undefined>(undefined)
    );

    const result = await UsersStore.Update(user, newObjectId());

    expect(result).not.toBeUndefined();
    expect(result).toBe(false);
  });
});
