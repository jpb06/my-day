import { ObjectId } from "bson";

import { GetCurrentAppKeys } from "../logic/app.keys.logic";
import { NewAppKey } from "../types/app.key.interface";

export abstract class CacheService {
  private static appKeys?: NewAppKey;

  public static async GetAppKeys(context: ObjectId): Promise<NewAppKey> {
    if (!this.appKeys) {
      this.appKeys = await GetCurrentAppKeys(context);
    }

    return this.appKeys;
  }
}
