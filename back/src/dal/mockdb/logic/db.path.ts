import path from "path";

export const getDbPath = () =>
  path.join(__dirname, "..", "data", "json", "db.json");
