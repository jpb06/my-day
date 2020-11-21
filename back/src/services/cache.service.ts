import { AppKey } from "../types/app.key.interface";
import { GetAppKeys } from "./app.keys.service";

export abstract class CacheService {
  private static appKeys: AppKey | undefined;

  public static async GetAppKeys(): Promise<AppKey> {
    if (!this.appKeys) {
      this.appKeys = await GetAppKeys();
    }

    return this.appKeys as AppKey;
  }
}
