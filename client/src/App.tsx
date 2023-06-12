import React from "react";
import Navbar from "./Components/Layout/Navbar";
import Home from "./Pages/Home";
import Router from "./Router";
import {
  PrivateRoutes,
  PublicRoutes,
} from "./Components/Private/PtotectedRoutes";

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
    </React.Fragment>
  );
};

export default App;
