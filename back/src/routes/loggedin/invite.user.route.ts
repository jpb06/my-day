import { ObjectId } from "bson";
import { NextFunction, Request } from "express";

import { Team, User } from "../../../../front/src/stack-shared-code/types";
import Dal from "../../dal";
import { LoggedUserResponse } from "../../types/express-response/logged.user.response.interface";
import { toBareTeam, toBareUser } from "../../types/transformers";

const createInvite = async (
  res: LoggedUserResponse,
  email: string,
  team: Team
) => {
  const { data: userInvitations } = await Dal.Invitations.getAllByEmail(email);
  if (userInvitations.find((el) => el.team._id.equals(team._id)))
    return { error: { code: 409, text: "User is already invited" } };

  const id = await res.log(Dal.Invitations.create(email, toBareTeam(team)));
  if (!id)
    return { error: { code: 500, text: "Failed to create the invitation" } };

  return { id, error: null };
};

const inviteExistingUser = async (
  res: LoggedUserResponse,
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
  await res.log(Dal.Users.Update(invitee));

  team.recruits.push({
    _id: inviteId,
    email: invitee.email as string,
    backer: toBareUser(backer),
  });
  await res.log(Dal.Teams.Update(team));

  return { error: null };
};

export const inviteUserRoute = async (
  req: Request,
  res: LoggedUserResponse,
  next: NextFunction
) => {
  try {
    const user = res.locals.loggedUser;
    const email = req.body.userEmail;

    const { data: team } = await Dal.Teams.getById(req.body.teamId);
    if (!team) {
      return res.answer(409, "Team not found");
    }

    let id = new ObjectId();
    const { data: invitee } = await Dal.Users.getByEmail(email);
    if (!invitee) {
      const { error } = await createInvite(res, email, team);
      if (error) return res.answerFrom(error);
    } else {
      const { error } = await inviteExistingUser(res, invitee, team, user, id);
      if (error) return res.answerFrom(error);
    }

    return res.populate(true);
  } catch (err) {
    console.log("Invite user", err);
    return res.answer(500, "Internal service error");
  }
};
