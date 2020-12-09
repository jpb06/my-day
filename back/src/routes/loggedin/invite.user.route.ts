import { ObjectId } from "bson";
import { NextFunction, Request } from "express";

import { Team, User } from "../../../../front/src/stack-shared-code/types";
import Dal from "../../dal";
import { ApiResponse } from "../../types/api.response.interface";
import { toBareTeam, toBareUser } from "../../types/transformers";

const createInvite = async (email: string, team: Team) => {
  const userInvitations = await Dal.Invitations.getAllByEmail(email);
  if (userInvitations.find((el) => el.team._id.equals(team._id)))
    return { error: { code: 409, text: "User is already invited" } };

  const id = await Dal.Invitations.create(email, toBareTeam(team));
  if (!id)
    return { error: { code: 500, text: "Failed to create the invitation" } };

  return { id, error: null };
};

const inviteExistingUser = async (
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
  await Dal.Users.Update(invitee);

  return { error: null };
};

export const inviteUserRoute = async (
  req: Request,
  res: ApiResponse,
  next: NextFunction
) => {
  try {
    const email = req.body.userEmail;
    const team = await Dal.Teams.getById(req.body.teamId);
    if (!team) {
      return res.answer(409, "Team not found");
    }
    const user = await Dal.Users.getByGoogleId(res.locals.userId);
    if (!user) {
      return res.answer(403, "Not logged in");
    }

    let id = new ObjectId();
    const invitee = await Dal.Users.getByEmail(email);
    if (!invitee) {
      const result = await createInvite(email, team);
      if (result.error) return res.answerFrom(result.error);

      id = result.id;
    } else {
      const result = await inviteExistingUser(invitee, team, user, id);
      if (result.error) return res.answerFrom(result.error);
    }

    team.recruits.push({
      _id: id,
      email,
      backer: toBareUser(user),
    });
    await Dal.Teams.Update(team);

    return res.status(200).send();
  } catch (err) {
    console.log("Invite user", err);
    return res.answer(500, "Internal service error");
  }
};
