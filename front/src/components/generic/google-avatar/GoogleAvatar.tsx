import clsx from "clsx";
import React from "react";

import { Avatar } from "@material-ui/core";

import GoogleLogo from "../../../svg/Google_Logo.svg";
import { styles } from "./GoogleAvatar.syles";

interface GoogleAvatarProps {
  isSmallAvatar?: boolean;
}

export const GoogleAvatar: React.FC<GoogleAvatarProps> = ({
  isSmallAvatar = true,
}) => {
  const classes = styles();

  return (
    <Avatar
      className={clsx(classes.container, {
        [classes.smallContainer]: isSmallAvatar,
      })}
    >
      <img
        alt="Google"
        src={GoogleLogo}
        className={clsx({
          [classes.smallLogo]: isSmallAvatar,
        })}
      ></img>
    </Avatar>
  );
};
