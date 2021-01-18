import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    [theme.breakpoints.down("sm")]: {
      top: theme.spacing(9),
    },
    [theme.breakpoints.up("sm")]: {
      top: theme.spacing(10),
    },
    height: 46,
    width: 46,
    backgroundColor: theme.palette.secondary.main,
  },
}));
