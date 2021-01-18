import { createStyles, fade, Theme } from "@material-ui/core";
import { amber } from "@material-ui/core/colors";

export const styles = createStyles((theme: Theme) => ({
  topPadding: {
    paddingTop: theme.spacing(6),
  },
  root: {
    textAlign: "center",
  },
  whiteColored: {
    color: fade("#fff", 0.35),
  },
  amberColored: {
    color: amber[500],
  },
  progressIcon: {
    height: 130,
    width: 130,
  },
  spinner: {
    animationName: "$spin",
    animationDuration: "4000ms",
    animationIterationCount: "infinite",
    animationTimingFunction: "linear",
  },
  "@keyframes spin": {
    from: { transform: "rotate(0deg)" },
    to: { transform: "rotate(360deg)" },
  },
}));
