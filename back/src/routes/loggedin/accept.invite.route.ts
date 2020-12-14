import { NextFunction, Request } from "express";

import Dal from "../../dal";
import { ApiResponse } from "../../types/api.response.interface";
import { toBareUser } from "../../types/transformers";

export const acceptInviteRoute = async (
  req: Request,
  res: ApiResponse,
  next: NextFunction
) => {
  try {
    const user = await res.log(Dal.Users.getByGoogleId, res.locals.userId);
    if (!user) {
      return res.answer(403, "Not logged in");
    }
    const invite = user.invites.find((el) => el._id.equals(req.body.id));
    if (!invite) {
      return res.answer(409, "Invite not found");
    }

    const team = await res.log(Dal.Teams.getById, req.body.id);
    if (!team) {
      return res.answer(409, "Team not found");
    }

    user.invites = user.invites.filter((el) => !el._id.equals(req.body.id));
    await res.log(Dal.Users.Update, user);

    team.recruits.filter((el) => !el._id.equals(req.body.id));
    team.members.push(toBareUser(user));
    await res.log(Dal.Teams.Update, team);

    return res.status(200).send();
  } catch (err) {
    console.log("accept invite", err);
    return res.answer(500, "Internal service error");
  }
};
