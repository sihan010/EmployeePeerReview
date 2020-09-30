import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  textFieldHorizontalPadding: {
    padding: 10,
  },
  imputCard: {
    margin: 10,
  },
});

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

export { useStyles, useRowStyles };
