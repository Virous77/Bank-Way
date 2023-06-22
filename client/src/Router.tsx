import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import Home from "./Pages/Home";
import { PrivateRoutes } from "./Components/Private/PtotectedRoutes";

const Router = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/landing" element={<LandingPage />} />
        <Route
          path="/*"
          element={
            <PrivateRoutes>
              <Home />
            </PrivateRoutes>
          }
        />
      </Routes>
    </React.Fragment>
  );
};

export default Router;
