import { ObjectId } from "bson";

import { AppKey } from "../../../types/app.key.interface";
import * as GenericStore from "../generic/dal.generic.store";

const collection = "app-keys";

export const getLastest = async (): Promise<AppKey | undefined> => {
  const keys = await GenericStore.getBy<AppKey>(
    collection,
    {},
    { generationDate: -1 }
  );

  if (keys.length === 0) return undefined;

  return keys[0];
};

export const update = async (appKey: AppKey): Promise<boolean> =>
  await GenericStore.clearAllAndCreateMany<AppKey>(collection, [appKey]);
