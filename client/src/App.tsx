import React from "react";
import Navbar from "./Components/Layout/Navbar";
import Router from "./Router";
import { PublicRoutes } from "./Components/Private/PtotectedRoutes";
import Notification from "./Components/Notification/Notification";

const App = () => {
  return (
    <React.Fragment>
      <Navbar />
      <PublicRoutes>
        <Router />
      </PublicRoutes>

      <Notification />
    </React.Fragment>
  );
};

export default App;
