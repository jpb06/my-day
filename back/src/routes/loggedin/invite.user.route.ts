import { ObjectId } from "bson";
import { NextFunction, Request } from "express";

import { Team, User } from "../../../../front/src/stack-shared-code/types";
import Dal from "../../dal";
import { LoggedUserResponse } from "../../types/express-response/logged.user.response.interface";
import { toBareTeam, toBareUser } from "../../types/transformers";

const createInvite = async (context: ObjectId, email: string, team: Team) => {
  const userInvitations = await Dal.Invitations.getAllByEmail(email, context);
  if (userInvitations.find((el) => el.team._id.equals(team._id)))
    return { error: { code: 409, text: "User is already invited" } };

  const id = await Dal.Invitations.create(email, toBareTeam(team), context);
  if (!id)
    return { error: { code: 500, text: "Failed to create the invitation" } };

  return { id, error: null };
};

const inviteExistingUser = async (
  context: ObjectId,
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
  await Dal.Users.Update(invitee, context);

  team.recruits.push({
    _id: inviteId,
    email: invitee.email as string,
    backer: toBareUser(backer),
  });
  await Dal.Teams.Update(team, context);

  return { error: null };
};

export const inviteUserRoute = async (
  req: Request,
  res: LoggedUserResponse,
  next: NextFunction
) => {
  try {
    const user = res.locals.loggedUser;
    const context = res.locals.context;
    const email = req.body.userEmail;

    const team = await Dal.Teams.getById(req.body.teamId, context);
    if (!team) {
      return res.answer(409, "Team not found");
    }

    let id = new ObjectId();
    const invitee = await Dal.Users.getByEmail(email, context);
    if (!invitee) {
      const { error } = await createInvite(context, email, team);
      if (error) return res.answerFrom(error);
    } else {
      const { error } = await inviteExistingUser(
        context,
        invitee,
        team,
        user,
        id
      );
      if (error) return res.answerFrom(error);
    }

    return res.populate(true);
  } catch (err) {
    console.log("Invite user", err);
    return res.answer(500, "Internal service error");
  }
};
