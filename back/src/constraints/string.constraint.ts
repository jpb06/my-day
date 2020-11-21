import { body, param, query } from "express-validator";

import { ConstraintSource } from "./";

export const withString = (name: string, source: ConstraintSource = "body") => {
  switch (source) {
    case "body":
      return body(name).notEmpty();
    case "params":
      return param(name).notEmpty();
    case "query":
      return query(name).notEmpty();
  }
};
