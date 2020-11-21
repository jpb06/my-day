import { body, param, query } from "express-validator";

import { ConstraintSource } from "./";

export const withId = (name: string, source: ConstraintSource = "body") => {
  switch (source) {
    case "body":
      return body(name).isMongoId();
    case "params":
      return param(name).isMongoId();
    case "query":
      return query(name).isMongoId();
  }
};
