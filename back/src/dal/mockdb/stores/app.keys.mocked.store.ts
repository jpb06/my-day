import { PersistedAppKey } from "../../../types/app.key.interface";
import { DBResult } from "../../../types/db.result.interface";
import { getAppKeys, persistAppKey } from "../logic";

export const getLastest = async (): Promise<
  DBResult<PersistedAppKey | undefined>
> => {
  const appKeys = await getAppKeys();

  const last = appKeys.sort(
    (a, b) => -a.generationDate.localeCompare(b.generationDate)
  );

  if (last.length === 0) return { data: undefined };

  return { data: last[0] };
};

export const update = async (
  appKey: PersistedAppKey
): Promise<DBResult<boolean>> => {
  const { logs } = await persistAppKey(appKey);

  return { data: true, logs };
};
