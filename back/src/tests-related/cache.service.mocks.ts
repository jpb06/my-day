import { mocked } from "ts-jest/utils";

import { CacheService } from "../services/cache.service";
import { NewAppKey } from "../types/app.key.interface";

export const mockGetAppKeys = (data?: Partial<NewAppKey>) =>
  mocked(CacheService.GetAppKeys).mockResolvedValueOnce(data as NewAppKey);
