import { ObjectId } from "bson";
import * as GenericDal from "mongodb-generic-dal";

import { AppKey, NewAppKey } from "../../../types/app.key.interface";

const collection = "app-keys";

export const getLastest = async (
  context: ObjectId
): Promise<AppKey | undefined> => {
  const keys = await GenericDal.getBy<AppKey>(
    collection,
    {},
    { generationDate: -1 }
  );

  if (keys.length === 0) return undefined;

  return keys[0];
};

export const update = async (
  appKey: NewAppKey,
  context: ObjectId
): Promise<boolean> => {
  const result = await GenericDal.clearAllAndCreateMany<AppKey>(collection, [
    appKey,
  ]);

  return result;
};
