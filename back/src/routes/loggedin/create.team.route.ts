import { NextFunction, Request } from "express";

import Dal from "../../dal";
import { LoggedUserResponse } from "../../types/express-response/logged.user.response.interface";
import { toBareUser } from "../../types/transformers";

export const createTeamRoute = async (
  req: Request,
  res: LoggedUserResponse,
  next: NextFunction
) => {
  try {
    const user = res.locals.loggedUser;
    const context = res.locals.context;

    const team = await Dal.Teams.getByName(req.body.name, context);
    if (team) {
      return res.answer(409, `Team ${req.body.name} already exists`);
    }

    const teamId = await Dal.Teams.createByMember(
      req.body.name,
      toBareUser(user),
      context
    );
    return res.populate({ _id: teamId, name: req.body.name });
  } catch (err) {
    console.log("Create team", err);
    return res.answer(500, "Internal service error");
  }
};
