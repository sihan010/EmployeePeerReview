import React from "react";
import "./style/Main.css";
import AuthContextProvider from "./context/AuthContext";
import Home from "./routes/Home";
import { ThemeProvider } from "@material-ui/core";
import theme from "./style/Theme";

const App = () => {
  return (
    <AuthContextProvider>
      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>
    </AuthContextProvider>
  );
};

export default App;
