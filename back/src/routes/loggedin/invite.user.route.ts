import { ObjectId } from "bson";
import { NextFunction, Request } from "express";

import Dal from "../../dal";
import { ApiResponse } from "../../types/api.response.interface";
import { toBareTeam, toBareUser } from "../../types/transformers";

export const inviteUserRoute = async (
  req: Request,
  res: ApiResponse,
  next: NextFunction
) => {
  try {
    const team = await Dal.Teams.getById(req.body.teamId);
    if (!team) {
      return res.answer(409, "Team not found");
    }
    const user = await Dal.Users.getByGoogleId(res.locals.userId);
    if (!user) {
      return res.answer(403, "Not logged in");
    }
    const invitee = await Dal.Users.getByEmail(req.body.userEmail);
    if (!invitee) {
      return res.answer(409, "Invited user not found");
    }

    if (
      invitee.teams.find((el) => el._id.equals(team._id)) ||
      invitee.invites.find((el) => el.team._id.equals(team._id))
    ) {
      return res.answer(409, "User is already in the team");
    }

    const joinRequestId = new ObjectId();
    invitee.invites.push({
      _id: joinRequestId,
      team: toBareTeam(team),
      backer: toBareUser(user),
    });
    await Dal.Users.Update(invitee);

    team.recruits.push({
      _id: joinRequestId,
      email: invitee.email as string,
      backer: toBareUser(user),
    });
    await Dal.Teams.Update(team);

    return res.status(200).send();
  } catch (err) {
    console.log("Invite user", err);
    return res.answer(500, "Internal service error");
  }
};
