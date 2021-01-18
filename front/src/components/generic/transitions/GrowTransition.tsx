import React from "react";

import { Grow } from "@material-ui/core";

export const GrowTransition: React.FC = React.forwardRef(
  (props: any, ref: any) => <Grow ref={ref} {...props} />
);
