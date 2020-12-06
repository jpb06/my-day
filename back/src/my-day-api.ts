import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv-flow";
import express, { Express } from "express";

import { createMockDb } from "./dal/mockdb/logic/create.mock.db";
import {
    artificialDelayMiddleware, errorsMiddleware, noRouteMiddleware, responseMiddlewares
} from "./middlewares";
import index from "./routes/main.router";

dotenv.config();
createMockDb();
const app: Express = express();
app.use(
  cors({
    origin: process.env.CORS_AUTHORIZED_URLS?.split(","),
    optionsSuccessStatus: 200,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(responseMiddlewares);

// simulate delay
app.use(artificialDelayMiddleware);

app.use(index);

app.use(errorsMiddleware);
app.use(noRouteMiddleware);

const port = 3003;
app.listen(port, "", () => {
  console.log(`My day api running on port ${port}`);
});
