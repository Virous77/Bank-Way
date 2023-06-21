import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import Home from "./Pages/Home";

const Router = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </React.Fragment>
  );
};

export default Router;
