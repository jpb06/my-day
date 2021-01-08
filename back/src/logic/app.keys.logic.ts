import { ObjectId } from "bson";
import { isAfter, parseISO } from "date-fns";
import addDays from "date-fns/addDays";

import Dal from "../dal";
import { AppKey, NewAppKey } from "../types/app.key.interface";
import { generateRsaKeyPair } from "./crypto.logic";

const isNewPairRequired = (appKeys?: AppKey) => {
  if (!appKeys) return true;

  const now = new Date();
  const limitDate = addDays(parseISO(appKeys.generationDate), 90);

  return isAfter(now, limitDate) ? true : false;
};

export const GetCurrentAppKeys = async (
  context: ObjectId
): Promise<NewAppKey | AppKey> => {
  const key = await Dal.AppKeys.getLastest(context);

  const newPairRequired = isNewPairRequired(key);
  if (newPairRequired) {
    const newKeyPair = generateRsaKeyPair();
    await Dal.AppKeys.update(newKeyPair, context);
    return newKeyPair;
  }

  return key as AppKey;
};
