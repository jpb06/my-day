import * as GenericDal from "mongodb-generic-dal";

import { AppKey, NewAppKey } from "../../../types/app.key.interface";
import { LoggedResult } from "../../../types/logged.result.interface";

const collection = "app-keys";

export const getLastest = async (): Promise<
  LoggedResult<AppKey | undefined>
> => {
  const keys = await GenericDal.getBy<AppKey>(
    collection,
    {},
    { generationDate: -1 }
  );

  if (keys.length === 0) return { data: undefined };

  return { data: keys[0] };
};

export const update = async (
  appKey: NewAppKey
): Promise<LoggedResult<boolean>> => {
  const result = await GenericDal.clearAllAndCreateMany<AppKey>(collection, [
    appKey,
  ]);

  return { data: result };
};
