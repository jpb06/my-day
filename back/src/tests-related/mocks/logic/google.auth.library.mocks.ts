import { OAuth2Client, TokenPayload } from "google-auth-library";
import { mocked } from "ts-jest/utils";

export const mockOAuth2Client = (payload?: TokenPayload) =>
  mocked(OAuth2Client).mockImplementationOnce(
    () =>
      (({
        verifyIdToken: jest.fn().mockImplementationOnce(() => ({
          getPayload: jest.fn().mockReturnValueOnce(payload),
        })),
      } as unknown) as OAuth2Client)
  );
