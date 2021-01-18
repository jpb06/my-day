import { makeStyles } from "@material-ui/core";

import { ThemeColor } from "../../../theme/theme.colors";

export const styles = makeStyles((theme) => ({
  marginBottom: {
    marginBottom: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  amber: {
    color: ThemeColor.Amber,
  },
  cyan: {
    color: ThemeColor.LightCyan,
  },
}));
