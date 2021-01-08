import { ObjectId } from "bson";
import { mocked } from "ts-jest/utils";

import { Team } from "../../../../../front/src/stack-shared-code/types";
import Dal from "../../../dal";

export const mockGetTeamById = (team?: Team) =>
  mocked(Dal.Teams.getById).mockResolvedValueOnce(team);

export const mockGetTeamByName = (team?: Team) =>
  mocked(Dal.Teams.getByName).mockResolvedValueOnce(team);

export const mockCreateByMember = (id: ObjectId) =>
  mocked(Dal.Teams.createByMember).mockResolvedValueOnce(id);

export const mockTeamUpdate = (result: boolean) =>
  mocked(Dal.Teams.Update).mockResolvedValueOnce(result);
