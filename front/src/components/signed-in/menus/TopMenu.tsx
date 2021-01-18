import React from "react";
import { Link } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";

import { Brand } from "../../generic/brand/Brand";
import { UserAvatar } from "../../generic/user-avatar/UserAvatar";
import { SideMenu } from "./SideMenu";
import { styles } from "./TopMenu.styles";

export const TopMenu = () => {
  const classes = styles();

  const [isSiderOpen, setIsSiderOpen] = React.useState(false);

  const toggleDrawer = (isOpen: boolean) => (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | any
  ) => setIsSiderOpen(isOpen);

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar} aria-label="appbar">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          <Brand color="cyan" />

          <Link to="/account" style={{ textDecoration: "none" }}>
            <UserAvatar />
          </Link>
        </Toolbar>
      </AppBar>

      <SideMenu isOpen={isSiderOpen} toggleDrawer={toggleDrawer} />
    </div>
  );
};
