import { body, param, query } from "express-validator";

import { ConstraintSource } from "./";

export const withEmail = (name: string, source: ConstraintSource = "body") => {
  switch (source) {
    case "body":
      return body(name).isEmail().withMessage("must be an email");
    case "params":
      return param(name).isEmail().withMessage("must be an email");
    case "query":
      return query(name).isEmail().withMessage("must be an email");
  }
};
