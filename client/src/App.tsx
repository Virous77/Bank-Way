import React from "react";
import Navbar from "./Components/Layout/Navbar";
import Home from "./Pages/Home";
import Router from "./Router";
import { PrivateRoutes } from "./Components/Private/PrivateRoutes";

const App = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Router />
      <PrivateRoutes>
        <Home />
      </PrivateRoutes>
    </React.Fragment>
  );
};

export default App;
