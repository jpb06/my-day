import express from "express";

import { authMiddleware } from "../middlewares";
import anonymousRoutes from "./anonymous.routes";
import loggedInRoutes from "./logged.in.routes";

const router = express.Router();

router.get("/", (req, res) => res.send("This is My day Api!"));
router.use(anonymousRoutes);
router.use(authMiddleware, loggedInRoutes);

export default router;
