import express from "express";

import { authMiddleware, loggedUserMiddleware } from "../middlewares";
import anonymousRoutes from "./anonymous.routes";
import loggedInRoutes from "./logged.in.routes";

const router = express.Router();

router.get("/", (req, res) => res.send("This is My day Api!"));
router.use(anonymousRoutes);
router.use(authMiddleware, loggedUserMiddleware, loggedInRoutes);

export default router;
