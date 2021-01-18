import React from "react";

import {
    IconButton, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Typography
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

import { GoogleAvatar } from "../../../../generic/google-avatar/GoogleAvatar";
import { styles } from "./User.styles";

interface UserProps {
  email: string;
}

export const User: React.FC<UserProps> = ({ email }) => {
  const classes = styles();

  return (
    <ListItem key={email} button disableGutters>
      <ListItemAvatar>
        <GoogleAvatar />
      </ListItemAvatar>
      <ListItemText
        primary={<Typography className={classes.lightCyan}>{email}</Typography>}
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete">
          <DeleteIcon className={classes.lightCyan} />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
