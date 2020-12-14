import { isAfter, parseISO } from "date-fns";
import addDays from "date-fns/addDays";

import Dal from "../dal";
import { ApiResponse } from "../types/api.response.interface";
import { AppKey } from "../types/app.key.interface";
import { generateRsaKeyPair } from "./crypto.service";

const isNewPairRequired = (appKeys?: AppKey) => {
  if (!appKeys) return true;

  const now = new Date();
  const limitDate = addDays(parseISO(appKeys.generationDate), 90);

  if (isAfter(now, limitDate)) return true;
  return false;
};

export const GetAppKeys = async (res: ApiResponse): Promise<AppKey> => {
  let appKeys = await res.log(Dal.AppKeys.getLastest);

  const newPairRequired = isNewPairRequired(appKeys);
  if (newPairRequired) {
    const newKeyPair = generateRsaKeyPair();
    await res.log(Dal.AppKeys.update, newKeyPair);
    return newKeyPair;
  }

  return appKeys as AppKey;
};
