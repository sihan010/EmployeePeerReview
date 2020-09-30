import { createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import red from "@material-ui/core/colors/red";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: red[500],
    },
  },
  typography: {
    fontFamily: `'Roboto Condensed', sans-serif`,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    //fontWeightMedium: 500,
    fontWeightBold: 700,
  },
});

export default theme;
