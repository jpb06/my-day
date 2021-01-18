import { makeStyles } from "@material-ui/core";
import { cyan } from "@material-ui/core/colors";

export const styles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: theme.palette.primary.main,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: cyan[300],
  },
}));
