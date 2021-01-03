import { ObjectId } from "bson";
import { mocked } from "ts-jest/utils";

import { Team } from "../../../front/src/stack-shared-code/types";
import Dal from "../dal";

export const mockGetTeamById = (data?: Team) =>
  mocked(Dal.Teams.getById).mockResolvedValueOnce({
    data,
  });

export const mockGetTeamByName = (data?: Team) =>
  mocked(Dal.Teams.getByName).mockResolvedValueOnce({
    data,
  });

export const mockCreateByMember = (id: ObjectId) =>
  mocked(Dal.Teams.createByMember).mockResolvedValueOnce({
    data: id,
  });

export const mockTeamUpdate = (result: boolean) =>
  mocked(Dal.Teams.Update).mockResolvedValueOnce({
    data: result,
  });
