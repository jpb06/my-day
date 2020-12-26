import { ObjectId } from "mongodb";
import * as GenericDal from "mongodb-generic-dal";
import { mocked } from "ts-jest/utils";

import { Invitation } from "../../../../../front/src/stack-shared-code/types";
import { newObjectId } from "../../mockdb/logic";
import * as InvitationsStore from "./invitations.store";

jest.mock("mongodb-generic-dal");

const email = "yolo@cool.org";

describe("Invitations store", () => {
  it("should create an invitation", async () => {
    const insertedId = newObjectId();
    mocked(GenericDal.create).mockReturnValueOnce(
      Promise.resolve<ObjectId>(insertedId)
    );

    const { data, logs } = await InvitationsStore.create(email, {
      _id: newObjectId(),
      name: "My cool team",
    });

    expect(logs).toBeUndefined();
    expect(data).not.toBeUndefined();
    expect(data).toEqual(insertedId);
  });

  it("should get all invitations for email", async () => {
    mocked(GenericDal.getBy).mockReturnValueOnce(
      Promise.resolve<Array<Invitation>>([
        {
          _id: newObjectId(),
          userEmail: email,
          date: new Date().toISOString(),
          team: {
            _id: newObjectId(),
            name: "My cool team",
          },
        },
      ])
    );

    const { data, logs } = await InvitationsStore.getAllByEmail(email);

    expect(logs).toBeUndefined();
    expect(data).not.toBeUndefined();
    expect(data).toHaveLength(1);
    expect(data.every((el) => el.userEmail === email)).toBe(true);
  });
});
