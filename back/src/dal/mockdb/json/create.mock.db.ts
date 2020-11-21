import fs from "fs-extra";
import path from "path";

import { appKeys } from "./data/app.keys.data";
import { teams } from "./data/teams.mock.data";
import { users } from "./data/users.mock.data";

export const createMockDb = async () => {
  if (process.env.NODE_ENV === "development") {
    console.log("Creating mock db ...");

    const filepath = path.join(__dirname, "data", "db.json");
    const data = { users, teams, appKeys };

    await fs.writeJson(filepath, data);
    console.log("Mock DB created.");
  }
};
