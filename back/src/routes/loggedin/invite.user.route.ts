import { ObjectId } from "bson";
import { NextFunction, Request } from "express";

import { Team, User } from "../../../../front/src/stack-shared-code/types";
import Dal from "../../dal";
import { ApiResponse } from "../../types/api.response.interface";
import { toBareTeam, toBareUser } from "../../types/transformers";

const createInvite = async (res: ApiResponse, email: string, team: Team) => {
  const userInvitations = await res.log(Dal.Invitations.getAllByEmail, email);
  if (userInvitations.find((el) => el.team._id.equals(team._id)))
    return { error: { code: 409, text: "User is already invited" } };

  const id = await res.log(Dal.Invitations.create, email, toBareTeam(team));
  if (!id)
    return { error: { code: 500, text: "Failed to create the invitation" } };

  return { id, error: null };
};

const inviteExistingUser = async (
  res: ApiResponse,
  invitee: User,
  team: Team,
  backer: User,
  inviteId: ObjectId
) => {
  if (
    invitee.teams.find((el) => el._id.equals(team._id)) ||
    invitee.invites.find((el) => el.team._id.equals(team._id))
  ) {
    return { error: { code: 409, text: "User is already in the team" } };
  }

  invitee.invites.push({
    _id: inviteId,
    team: toBareTeam(team),
    backer: toBareUser(backer),
  });
  await res.log(Dal.Users.Update, invitee);

  return { error: null };
};

export const inviteUserRoute = async (
  req: Request,
  res: ApiResponse,
  next: NextFunction
) => {
  try {
    const email = req.body.userEmail;
    const team = await res.log(Dal.Teams.getById, req.body.teamId);
    if (!team) {
      return res.answer(409, "Team not found");
    }
    const user = await res.log(Dal.Users.getByGoogleId, res.locals.userId);
    if (!user) {
      return res.answer(403, "Not logged in");
    }

    let id = new ObjectId();
    const invitee = await res.log(Dal.Users.getByEmail, email);
    if (!invitee) {
      const result = await createInvite(res, email, team);
      if (result.error) return res.answerFrom(result.error);

      id = result.id;
    } else {
      const result = await inviteExistingUser(res, invitee, team, user, id);
      if (result.error) return res.answerFrom(result.error);
    }

    team.recruits.push({
      _id: id,
      email,
      backer: toBareUser(user),
    });
    await res.log(Dal.Teams.Update, team);

    return res.populate(true);
  } catch (err) {
    console.log("Invite user", err);
    return res.answer(500, "Internal service error");
  }
};
