import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ba1b1d",
      light: "#fbfaf8",
    },
    secondary: {
      main: "#393e41",
    },
    warning: {
      main: "#ffb30f",
    },
    success: {
      main: "#4c9f70",
    },
  },
  typography: {
    h1: {
      fontSize: "3rem",
      fontWeight: 600,
    },
    h2: {
      fontSize: "1.75rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },
  },
});

export default theme;