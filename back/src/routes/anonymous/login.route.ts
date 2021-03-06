import { NextFunction, Request } from "express";
import { OAuth2Client, TokenPayload } from "google-auth-library";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

import Dal from "../../dal";
import { CacheService } from "../../services/cache.service";
import { ApiResponse } from "../../types/express-response/api.response.interface";

const getOrCreateUser = async (payload: TokenPayload, context: ObjectId) => {
  let user = await Dal.Users.getByGoogleId(payload.sub, context);
  if (!user) {
    user = await Dal.Users.create(
      {
        id: payload.sub,
        email: payload.email,
        isEmailVerified: payload.email_verified,
        familyName: payload.family_name,
        givenName: payload.given_name,
        name: payload.name,
        locale: payload.locale,
        picture: payload.picture,
      },
      context
    );
  }
  return user;
};

export const loginRoute = async (
  req: Request,
  res: ApiResponse,
  next: NextFunction
) => {
  try {
    const context = res.locals.context;
    const clientId = process.env.GOOGLE_AUTH_CLIENTID;
    const client = new OAuth2Client(clientId);

    const ticket = await client.verifyIdToken({
      idToken: req.body.token,
      audience: clientId,
    });
    const payload = ticket.getPayload();
    if (!payload) return res.answer(401, "Unauthorized");

    const user = await getOrCreateUser(payload, context);
    if (!user) {
      return res.answer(500, "Unable to create user");
    }

    const keys = await CacheService.GetAppKeys(context);
    const token = jwt.sign(
      {
        id: user.id,
      },
      keys.privateKey,
      {
        algorithm: "RS256",
        expiresIn: "30m",
      }
    );

    return res.populate({ token, teams: user.teams });
  } catch (err) {
    console.log("Login route", err);
    return res.answer(401, "Unauthorized");
  }
};
