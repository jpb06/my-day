import React from "react";

import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";

import { GlobalError } from "../../generic/global-error/GlobalError";

export const LoginError = () => (
  <GlobalError
    title="Oh no!"
    content="An error occured while initializing the application"
    Icon={SentimentDissatisfiedIcon}
    hasTopMargin={false}
  />
);
