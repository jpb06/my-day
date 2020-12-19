import { isAfter, parseISO } from "date-fns";
import addDays from "date-fns/addDays";

import Dal from "../dal";
import { AppKey, NewAppKey } from "../types/app.key.interface";
import { ApiResponse } from "../types/express-response/api.response.interface";
import { generateRsaKeyPair } from "./crypto.service";

const isNewPairRequired = (appKeys?: AppKey) => {
  if (!appKeys) return true;

  const now = new Date();
  const limitDate = addDays(parseISO(appKeys.generationDate), 90);

  return isAfter(now, limitDate) ? true : false;
};

export const GetCurrentAppKeys = async (
  res: ApiResponse
): Promise<NewAppKey | AppKey> => {
  const { data } = await Dal.AppKeys.getLastest();

  const newPairRequired = isNewPairRequired(data);
  if (newPairRequired) {
    const newKeyPair = generateRsaKeyPair();
    await res.log(Dal.AppKeys.update(newKeyPair));
    return newKeyPair;
  }

  return data as AppKey;
};
