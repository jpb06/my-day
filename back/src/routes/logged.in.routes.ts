import express from "express";

import { withEmail as email, withId as id, withString as string } from "../constraints";
import { validationMiddleware as validation } from "../middlewares";
import {
    acceptInviteRoute, createTeamRoute, inviteUserRoute, joinTeamRoute, rejectInviteRoute
} from "./loggedin";

const router = express.Router();

router.post("/team/create", [string("name")], validation, createTeamRoute);
router.post(
  "/team/:name/join",
  [string("name", "params")],
  validation,
  joinTeamRoute
);

router.post(
  "/user/invite",
  [email("userEmail"), id("teamId")],
  validation,
  inviteUserRoute
);
router.post(
  "/user/invite/:id/accept",
  [id("id", "params")],
  validation,
  acceptInviteRoute
);
router.post(
  "/user/invite/:id/reject",
  [id("id", "params")],
  validation,
  rejectInviteRoute
);

export default router;
