import { ObjectId } from "bson";

import { RouteLogsService } from "../../../services/route.logs.service";
import { AppKey } from "../../../types/app.key.interface";
import { getAppKeys, persist } from "../logic";

export const getLastest = async (
  context: ObjectId
): Promise<AppKey | undefined> => {
  const appKeys = await getAppKeys();

  const last = appKeys.sort(
    (a, b) => -a.generationDate.localeCompare(b.generationDate)
  );

  if (last.length === 0) return undefined;

  return last[0];
};

export const update = async (
  appKey: AppKey,
  context: ObjectId
): Promise<boolean> => {
  const { logs } = await persist(appKey, "appkey");

  RouteLogsService.add(context, logs);

  return true;
};
