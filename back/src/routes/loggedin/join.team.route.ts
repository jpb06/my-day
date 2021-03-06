import { ObjectId } from "bson";
import { NextFunction, Request } from "express";

import Dal from "../../dal";
import { LoggedUserResponse } from "../../types/express-response/logged.user.response.interface";
import { toBareTeam } from "../../types/transformers";

export const joinTeamRoute = async (
  req: Request,
  res: LoggedUserResponse,
  next: NextFunction
) => {
  try {
    const user = res.locals.loggedUser;
    const context = res.locals.context;
    const team = await Dal.Teams.getByName(req.params.name, context);
    if (!team) {
      return res.answer(409, `Team ${req.params.name} does not exist`);
    }

    if (
      user.teams.find((el) => el.name === team.name) ||
      user.invites.find((el) => el.team.name === team.name)
    ) {
      return res.answer(409, "User is already in the team");
    }

    const joinRequestId = new ObjectId();
    user.invites.push({
      _id: joinRequestId,
      team: toBareTeam(team),
    });
    await Dal.Users.Update(user, context);

    team.recruits.push({
      _id: joinRequestId,
      email: user.email as string,
    });
    await Dal.Teams.Update(team, context);

    return res.status(200).send({
      _id: joinRequestId,
      team: toBareTeam(team),
    });
  } catch (err) {
    console.log("Join team", err);
    return res.answer(500, "Internal service error");
  }
};
