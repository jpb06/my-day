import { NextFunction, Request } from "express";

import Dal from "../../dal";
import { LoggedUserResponse } from "../../types/express-response/logged.user.response.interface";
import { toBareUser } from "../../types/transformers";

export const acceptInviteRoute = async (
  req: Request,
  res: LoggedUserResponse,
  next: NextFunction
) => {
  try {
    const user = res.locals.loggedUser;
    const context = res.locals.context;

    const invite = user.invites.find((el) => el._id.equals(req.body.id));
    if (!invite) {
      return res.answer(409, "Invite not found");
    }

    const team = await Dal.Teams.getById(invite.team._id, context);
    if (!team) {
      return res.answer(409, "Team not found");
    }

    user.invites = user.invites.filter((el) => !el._id.equals(req.body.id));
    await Dal.Users.Update(user, context);

    team.recruits = team.recruits.filter((el) => !el._id.equals(invite._id));
    team.members.push(toBareUser(user));
    await Dal.Teams.Update(team, context);

    return res.status(200).send();
  } catch (err) {
    console.log("accept invite", err);
    return res.answer(500, "Internal service error");
  }
};
