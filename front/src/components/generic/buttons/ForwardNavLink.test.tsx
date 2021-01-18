import React from "react";

import { screen } from "@testing-library/react";

import { withRouterRender } from "../../../test-utils/with.router.render";
import ForwardNavLink from "./ForwardNavLink";

describe("Forward nav link component", () => {
  it("should generate a link", () => {
    withRouterRender(<ForwardNavLink to="/yolo">That's a text</ForwardNavLink>);

    const mainLink = screen.getByRole("link", {
      name: /that's a text/i,
    });
    expect(mainLink).toHaveAttribute("href", "/yolo");
  });
});
