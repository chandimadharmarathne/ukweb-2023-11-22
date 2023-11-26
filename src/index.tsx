import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import Root from "./store/root";

ReactDOM.render(
  <React.StrictMode>
    <Root>
      <App />
    </Root>
  </React.StrictMode>,
  document.getElementById("root")
);
