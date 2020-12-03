import { body, param, query } from "express-validator";

import { ConstraintSource } from "./";

export const withId = (name: string, source: ConstraintSource = "body") => {
  switch (source) {
    case "body":
      return body(name).isMongoId().withMessage("must be an ObjectId");
    case "params":
      return param(name).isMongoId().withMessage("must be an ObjectId");
    case "query":
      return query(name).isMongoId().withMessage("must be an ObjectId");
  }
};
