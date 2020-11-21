import { DbConfig } from "../../../types/db.config.interface";

const verifyConfig = (config: any) => {
  if (
    !config.host ||
    config.host.length === 0 ||
    config.host === "mongodb://:" ||
    config.host.startsWith("mongodb://:") ||
    config.host.endsWith(":")
  ) {
    throw new Error("Invalid url specified to access mongodb instance");
  }

  if (!config.database || config.database.length === 0) {
    throw new Error("No database specified");
  }
};

export const getDbConfig = (): DbConfig => {
  const config = {
    url: `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}`,
    database: process.env.MONGODB_DB,
    username: process.env.MONGODB_DB_USR,
    password: process.env.MONGODB_DB_PWD,
  };
  verifyConfig(config);

  return config as DbConfig;
};
