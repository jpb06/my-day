import React from "react";

import google from "../../../svg/Google_Logo.svg";
import { SimpleButton } from "./SimpleButton";

interface GoogleButtonProps {
  onClick: () => void;
}

export const GoogleButton: React.FC<GoogleButtonProps> = ({ onClick }) => (
  <SimpleButton
    onClick={onClick}
    text="Continue with Google"
    icon={<img height="20" alt="Google" src={google}></img>}
    hasTopMargin
  />
);
