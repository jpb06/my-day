import { AppKey } from "../../../types/app.key.interface";
import { LoggedResult } from "../../../types/logged.result.interface";
import { getAppKeys, persist } from "../logic";

export const getLastest = async (): Promise<
  LoggedResult<AppKey | undefined>
> => {
  const appKeys = await getAppKeys();

  const last = appKeys.sort(
    (a, b) => -a.generationDate.localeCompare(b.generationDate)
  );

  if (last.length === 0) return { data: undefined };

  return { data: last[0] };
};

export const update = async (
  appKey: AppKey
): Promise<LoggedResult<boolean>> => {
  const { logs } = await persist(appKey, "appkey");

  return { data: true, logs };
};
