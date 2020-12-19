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
    const invite = user.invites.find((el) => el._id.equals(req.body.id));
    if (!invite) {
      return res.answer(409, "Invite not found");
    }

    const { data: team } = await Dal.Teams.getById(req.body.id);
    if (!team) {
      return res.answer(409, "Team not found");
    }

    user.invites = user.invites.filter((el) => !el._id.equals(req.body.id));
    await res.log(Dal.Users.Update(user));

    team.recruits.filter((el) => !el._id.equals(req.body.id));
    team.members.push(toBareUser(user));
    await res.log(Dal.Teams.Update(team));

    return res.status(200).send();
  } catch (err) {
    console.log("accept invite", err);
    return res.answer(500, "Internal service error");
  }
};
