import clsx from "clsx";
import React, { useContext, useState } from "react";

import Avatar from "@material-ui/core/Avatar";
import { useTheme } from "@material-ui/core/styles";

import { stringToColor } from "../../../logic/util/colors.util";
import { getInitials } from "../../../logic/util/user.util";
import { GoogleAuthContext } from "../../contexts/WithGoogleAuth";
import { styles } from "./UserAvatar.styles";

interface UserAvatarProps {
  isBigAvatar?: boolean;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  isBigAvatar = false,
}) => {
  const classes = styles();
  const theme = useTheme();
  const { signedUser: user } = useContext(GoogleAuthContext);

  const color = user ? stringToColor(user.name) : "#ffffff";
  const [avatarColor] = useState(color);
  const [avatarTextColor] = useState(theme.palette.getContrastText(color));

  if (!user) return null;

  const initials = getInitials(user.name);

  if (user.imageUrl && user.imageUrl.length !== 0) {
    return (
      <Avatar
        alt={user.name}
        src={user.imageUrl}
        className={clsx({
          [classes.big]: isBigAvatar,
          [classes.small]: !isBigAvatar,
        })}
      />
    );
  }

  return (
    <Avatar
      role="img"
      aria-label={user.name}
      style={{ backgroundColor: avatarColor, color: avatarTextColor }}
      className={clsx(classes.smallFont, {
        [classes.big]: isBigAvatar,
        [classes.small]: !isBigAvatar,
      })}
    >
      {initials}
    </Avatar>
  );
};
