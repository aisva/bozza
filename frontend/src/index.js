import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app/App";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./reducers";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

export const store = createStore(rootReducer);

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#000000"
    },
    secondary: {
      main: "#ff0088"
    }
  }
});

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
