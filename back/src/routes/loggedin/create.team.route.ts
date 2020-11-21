import { NextFunction, Request } from "express";

import Dal from "../../dal";
import { ApiResponse } from "../../types/api.response.interface";

export const createTeamRoute = async (
  req: Request,
  res: ApiResponse,
  next: NextFunction
) => {
  try {
    const team = await Dal.Teams.getByName(req.body.name);
    if (team) {
      return res.answer(409, `Team ${req.body.name} already exists`);
    }

    const teamId = await Dal.Teams.create(req.body.name);
    return res.populate(teamId);
  } catch (err) {
    console.log("Create team", err);
    return res.answer(500, "Internal service error");
  }
};
