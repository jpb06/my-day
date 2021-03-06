import React from "react";
import { NavLink } from "react-router-dom";

// https://github.com/mui-org/material-ui/issues/15903
export const ForwardNavLink = React.forwardRef((props: any, ref: any) => (
  <NavLink {...props} role="link" name="forward-nav-link" innerRef={ref} />
));
