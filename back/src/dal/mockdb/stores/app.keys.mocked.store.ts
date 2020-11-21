import { AppKey } from "../../../types/app.key.interface";
import { getAppKeys, persist } from "../json/data.alteration";

export const getLastest = async (): Promise<AppKey | undefined> => {
  const appKeys = await getAppKeys();

  const last = appKeys.sort(
    (a, b) => -a.generationDate.localeCompare(b.generationDate)
  );

  if (last.length === 0) return undefined;

  return last[0];

  //   .sort((a, b) => {
  //      if( a.generationDate < b.generationDate) return -1;
  //      if(a.generationDate > b.generationDate) return 1;

  //      return 0;
  //   }
};

export const update = async (appKey: AppKey): Promise<boolean> => {
  await persist(undefined, undefined, [appKey]);

  return true;
};
