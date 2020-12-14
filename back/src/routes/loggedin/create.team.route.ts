import { NextFunction, Request } from "express";

import Dal from "../../dal";
import { ApiResponse } from "../../types/api.response.interface";

export const createTeamRoute = async (
  req: Request,
  res: ApiResponse,
  next: NextFunction
) => {
  try {
    const team = await res.log(Dal.Teams.getByName, req.body.name);
    if (team) {
      return res.answer(409, `Team ${req.body.name} already exists`);
    }

    const teamId = await res.log(Dal.Teams.create, req.body.name);
    return res.populate({ _id: teamId, name: req.body.name });
  } catch (err) {
    console.log("Create team", err);
    return res.answer(500, "Internal service error");
  }
};
