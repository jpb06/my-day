import { Result, ValidationError, validationResult } from "express-validator";
import { mocked } from "ts-jest/utils";

export const mockValidationResult = (errors?: Array<string>) =>
  mocked(validationResult).mockReturnValueOnce(({
    formatWith: jest.fn(
      () =>
        (({
          isEmpty: jest.fn(() => (errors ? false : true)),
          array: jest.fn(() => errors),
        } as unknown) as Result<string>)
    ),
  } as unknown) as Result<ValidationError>);
