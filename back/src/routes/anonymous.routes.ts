import express from "express";

import { withString as string } from "../constraints";
import { validationMiddleware } from "../middlewares";
import { loginRoute } from "./anonymous/login.route";

const router = express.Router();

router.post("/user/login", [string("token")], validationMiddleware, loginRoute);

export default router;
