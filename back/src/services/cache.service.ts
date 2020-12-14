import { ApiResponse } from "../types/api.response.interface";
import { AppKey } from "../types/app.key.interface";
import { GetAppKeys } from "./app.keys.service";

export abstract class CacheService {
  private static appKeys: AppKey | undefined;

  public static async GetAppKeys(res: ApiResponse): Promise<AppKey> {
    if (!this.appKeys) {
      this.appKeys = await GetAppKeys(res);
    }

    return this.appKeys as AppKey;
  }
}
