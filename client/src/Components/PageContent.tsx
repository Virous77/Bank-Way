import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../Pages/HomePage";

const PageContent = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </React.Fragment>
  );
};

export default PageContent;
