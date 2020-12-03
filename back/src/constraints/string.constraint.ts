import { body, param, query } from "express-validator";

import { ConstraintSource } from "./";

export const withString = (name: string, source: ConstraintSource = "body") => {
  switch (source) {
    case "body":
      return body(name).notEmpty().withMessage("must not be empty");
    case "params":
      return param(name).notEmpty().withMessage("must not be empty");
    case "query":
      return query(name).notEmpty().withMessage("must not be empty");
  }
};
