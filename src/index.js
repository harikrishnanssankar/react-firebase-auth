import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import Context, { FirebaseContext } from "./store/userContext";
import { Firebase } from './firebase';

ReactDOM.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={{ Firebase }}>
      <Context>
        <Router>
          <App />
        </Router>
      </Context>
    </FirebaseContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
