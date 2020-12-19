import { NewAppKey } from "../types/app.key.interface";
import { ApiResponse } from "../types/express-response/api.response.interface";
import { GetCurrentAppKeys } from "./app.keys.service";

export abstract class CacheService {
  private static appKeys: NewAppKey | undefined;

  public static async GetAppKeys(res: ApiResponse): Promise<NewAppKey> {
    if (!this.appKeys) {
      this.appKeys = await GetCurrentAppKeys(res);
    }

    return this.appKeys;
  }
}
