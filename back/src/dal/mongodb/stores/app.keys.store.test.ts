import * as GenericDal from "mongodb-generic-dal";
import { mocked } from "ts-jest/utils";

import { AppKey } from "../../../types/app.key.interface";
import { newObjectId } from "../../mockdb/logic";
import * as AppkeysStore from "./app.keys.store";

jest.mock("mongodb-generic-dal");

const newMockedAppKey = (privateKey: string, publicKey: string) => ({
  _id: newObjectId(),
  generationDate: new Date().toISOString(),
  privateKey,
  publicKey,
});

describe("AppKey store", () => {
  it("should get the latest key", async () => {
    mocked(GenericDal.getBy).mockReturnValueOnce(
      Promise.resolve<Array<AppKey>>([
        newMockedAppKey("1-Private", "1-Public"),
        newMockedAppKey("2-Private", "2-Public"),
      ])
    );

    const appKey = await AppkeysStore.getLastest(newObjectId());

    expect(appKey).not.toBeUndefined();
    expect(appKey?.privateKey).toEqual("1-Private");
    expect(appKey?.publicKey).toEqual("1-Public");
  });

  it("should return undefined if no keys", async () => {
    mocked(GenericDal.getBy).mockReturnValueOnce(
      Promise.resolve<Array<AppKey>>([])
    );

    const appKey = await AppkeysStore.getLastest(newObjectId());

    expect(appKey).toBeUndefined();
  });

  it("should return true when clearing all keys and inserting a new one", async () => {
    mocked(GenericDal.clearAllAndCreateMany).mockReturnValueOnce(
      Promise.resolve(true)
    );

    const result = await AppkeysStore.update(
      newMockedAppKey("Yolo", "Man"),
      newObjectId()
    );

    expect(result).toEqual(true);
  });
});
