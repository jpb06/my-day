import { fade, makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundImage: 'url("/img/background14_low.jpg")',
    backgroundSize: "cover",
  },
  card: {
    width: "100%",
    maxWidth: 310,
    paddingBottom: theme.spacing(2),
    backgroundColor: fade(theme.palette.background.default, 0.88),
  },
  media: {
    height: 220,
  },
  actions: {
    paddingTop: 0,
    justifyContent: "center",
  },
}));
