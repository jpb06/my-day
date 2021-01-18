import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";

import { render as rtlRender } from "@testing-library/react";

interface WrapperProps {
  children: React.ReactElement;
}

export const withRouterRender = (ui: React.ReactElement) => {
  const history = createMemoryHistory();
  const providerWrapper = ({ children }: WrapperProps) => (
    <Router history={history}>{children}</Router>
  );

  const returns = rtlRender(ui, {
    wrapper: providerWrapper as React.ComponentType,
  });

  return { history, ...returns };
};
