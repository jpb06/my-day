import fs from "fs-extra";
import path from "path";

import { appKeys } from "../data/app.keys.data";
import { invitations } from "../data/invitations.mock.data";
import { teams } from "../data/teams.mock.data";
import { users } from "../data/users.mock.data";

export const createMockDb = async () => {
  if (process.env.NODE_ENV === "development") {
    console.log("Creating mock db ...");

    const dbPath = path.join(__dirname, "..", "data", "json");
    await fs.ensureDir(dbPath);
    const filepath = path.join(dbPath, "db.json");
    const data = { users, teams, appKeys, invitations };

    await fs.writeJson(filepath, data);
    console.log("Mock DB created.\n");
  }
};
