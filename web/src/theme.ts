import { red } from "@mui/material/colors";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { getFontFamily } from "./utils";

// A custom theme for this app
const theme = createTheme({
  typography: {
    fontFamily: getFontFamily("Libre Franklin"),
    h1: {
      fontSize: '3rem'
    },
    h2: {
      fontSize: '2.5rem'
    },
    h3: {
      fontSize: '2rem'
    },
    h4: {
      fontSize: '1.7rem'
    },
    h5: {
      fontSize: '1.5rem'
    }
  },
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#11111",
    },
    error: {
      main: red.A400,
    },
    accent: {
      main: "#ff0000",
      contrastText: "#ff005c",
      light: "#787878",
      // Purple.
      '100': "#FF00E5",
      // Orange.
      '200': "#FF7300",
      // Yellow.
      '300': "#E7FF00",
      // Green.
      '400': "#64FF00",
      // Blue.
      '500': "#5FE8FF",
    },
  },
});

export default responsiveFontSizes(theme);
