import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";

const Router = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/landing" element={<LandingPage />} />
      </Routes>
    </React.Fragment>
  );
};

export default Router;
