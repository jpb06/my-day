import jwt from "jsonwebtoken";
import { mocked } from "ts-jest/utils";

export const mockJwtSign = (token?: string) =>
  mocked(jwt.sign).mockImplementationOnce(() => token);
