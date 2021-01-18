import { makeStyles } from "@material-ui/core";

import { ThemeColor } from "../../../../../theme/theme.colors";

export const styles = makeStyles((theme) => ({
  arrowContainer: {
    textAlign: "center",
  },
  arrow: {
    fontSize: 50,
    color: ThemeColor.LightCyan,
  },
}));
