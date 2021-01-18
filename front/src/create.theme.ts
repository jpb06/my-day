import { createMuiTheme } from "@material-ui/core";
import { cyan, red } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: cyan[900],
    },
    secondary: {
      main: red[900],
    },
    background: { paper: "darkslategray" },
  },
});

export default theme;
