import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, createTheme } from "@mui/material";
import router from "./router/router"
import { RouterProvider } from "react-router-dom";
import "./styles/style.css"
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';



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

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
