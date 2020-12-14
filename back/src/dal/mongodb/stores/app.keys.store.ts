import { ApiResponse } from "../../../types/api.response.interface";
import { AppKey, PersistedAppKey } from "../../../types/app.key.interface";
import { DBResult } from "../../../types/db.result.interface";
import * as GenericStore from "../generic/dal.generic.store";

const collection = "app-keys";

export const getLastest = async (): Promise<
  DBResult<PersistedAppKey | undefined>
> => {
  const keys = await GenericStore.getBy<PersistedAppKey>(
    collection,
    {},
    { generationDate: -1 }
  );

  if (keys.length === 0) return { data: undefined };

  return { data: keys[0] };
};

export const update = async (appKey: AppKey): Promise<DBResult<boolean>> => {
  const result = await GenericStore.clearAllAndCreateMany<PersistedAppKey>(
    collection,
    [appKey]
  );

  return { data: result };
};
