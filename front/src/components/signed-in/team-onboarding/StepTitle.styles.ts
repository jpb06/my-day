import { makeStyles } from "@material-ui/core";

import { ThemeColor } from "../../../theme/theme.colors";

export const styles = makeStyles((theme) => ({
  centered: {
    textAlign: "center",
  },
  title: {
    color: ThemeColor.Amber,
    margin: 0,
    marginBottom: theme.spacing(1),
  },
}));
