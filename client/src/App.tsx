import React from "react";
import Navbar from "./Components/Layout/Navbar";
import Home from "./Pages/Home";
import Router from "./Router";
import {
  PrivateRoutes,
  PublicRoutes,
} from "./Components/Private/PtotectedRoutes";
import Notification from "./Components/Notification/Notification";

const App = () => {
  return (
    <React.Fragment>
      <Navbar />
      <PublicRoutes>
        <Router />
      </PublicRoutes>
      <PrivateRoutes>
        <Home />
      </PrivateRoutes>
      <Notification />
    </React.Fragment>
  );
};

export default App;
