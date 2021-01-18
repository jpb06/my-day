import React from "react";
import { mocked } from "ts-jest/utils";

import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import WarningIcon from "@material-ui/icons/Warning";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { SnackbarKind } from "../../../types";
import AppSnackbar, { snackbarKindToClassName, snackbarKindToIcon } from "./AppSnackbar";

describe("App snackbar component", () => {
  const handleClose = jest.fn();
  const data = {
    type: SnackbarKind.Error,
    text: "Oh no!",
  };

  beforeEach(() => {
    handleClose.mockReset();
  });

  it("should not be displayed", async () => {
    const { container } = render(
      <AppSnackbar isOpen={false} message={data} onClose={handleClose} />
    );

    expect(container).toHaveTextContent("");
    expect(container.children.length).toBe(0);
  });

  it("should display a text", async () => {
    render(<AppSnackbar isOpen message={data} onClose={handleClose} />);

    expect(screen.getByRole("contentinfo")).toHaveTextContent("Oh no!");
  });

  it("should display an icon", async () => {
    render(<AppSnackbar isOpen message={data} onClose={handleClose} />);

    screen.getByRole("img", { name: /snackbar-icon/i });
  });

  it("should close the snackbar", async () => {
    render(<AppSnackbar isOpen message={data} onClose={handleClose} />);

    userEvent.click(screen.getByRole("button"));
    const closeButtonMock = mocked(handleClose);
    expect(closeButtonMock).toHaveBeenCalledTimes(1);
  });
});

describe("snackbarKindToIcon function", () => {
  it("should return the success icon", () => {
    const Icon = snackbarKindToIcon(SnackbarKind.Success);
    expect(Icon).toMatchObject(CheckCircleIcon);
  });

  it("should return the error icon", () => {
    const Icon = snackbarKindToIcon(SnackbarKind.Error);
    expect(Icon).toMatchObject(ErrorIcon);
  });

  it("should return the info icon", () => {
    const Icon = snackbarKindToIcon(SnackbarKind.Info);
    expect(Icon).toMatchObject(InfoIcon);
  });

  it("should return the warning icon", () => {
    const Icon = snackbarKindToIcon(SnackbarKind.Warning);
    expect(Icon).toMatchObject(WarningIcon);
  });
});

describe("snackbarKindToClassName function", () => {
  const classes = {
    success: 0,
    error: 1,
    warning: 2,
    info: 3,
  };

  it("should return the success prop", () => {
    const result = snackbarKindToClassName(SnackbarKind.Success, classes);
    expect(result).toBe(0);
  });

  it("should return the error prop", () => {
    const result = snackbarKindToClassName(SnackbarKind.Error, classes);
    expect(result).toBe(1);
  });

  it("should return the info prop", () => {
    const result = snackbarKindToClassName(SnackbarKind.Info, classes);
    expect(result).toBe(3);
  });

  it("should return the warning prop", () => {
    const result = snackbarKindToClassName(SnackbarKind.Warning, classes);
    expect(result).toBe(2);
  });
});
