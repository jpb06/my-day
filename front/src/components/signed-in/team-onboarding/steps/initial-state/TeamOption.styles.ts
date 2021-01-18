import { makeStyles } from "@material-ui/core";
import { cyan } from "@material-ui/core/colors";

export const styles = makeStyles((theme) => ({
  centered: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
  },
  actionIcon: {
    width: 100,
    height: 100,
  },
  cyan: {
    color: cyan[300],
  },
}));
