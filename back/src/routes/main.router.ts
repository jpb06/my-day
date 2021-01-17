import express from "express";

import { authMiddleware, loggedUserMiddleware } from "../middlewares";
import anonymousRoutes from "./anonymous.routes";
import loggedInRoutes from "./logged.in.routes";

export const mainRouter = express.Router();

mainRouter.get("/", (req, res) => res.send("This is My day Api!"));
mainRouter.use(anonymousRoutes);
mainRouter.use(authMiddleware, loggedUserMiddleware, loggedInRoutes);
