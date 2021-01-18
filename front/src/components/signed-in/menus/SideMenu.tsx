import clsx from "clsx";
import React from "react";

import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import EventIcon from "@material-ui/icons/Event";

import { Brand } from "../../generic/brand/Brand";
import { styles } from "./SideMenu.styles";
import { SideMenuItem } from "./SideMenuItem";

interface SideMenuProps {
  isOpen: boolean;
  toggleDrawer: (
    open: boolean
  ) => (event: React.SyntheticEvent<{}, Event>) => void;
}

export const SideMenu: React.FC<SideMenuProps> = ({ isOpen, toggleDrawer }) => {
  const classes = styles();

  return (
    <SwipeableDrawer
      open={isOpen}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
    >
      <div
        className={clsx(classes.fullList, classes.sideMenu)}
        role="presentation"
      >
        <Brand color="cyan" centered />
        <List>
          <SideMenuItem
            menuText="Daily"
            fullText="Daily"
            to="/daily"
            IconComponent={EventIcon}
          />
        </List>
        <Divider />
      </div>
    </SwipeableDrawer>
  );
};
