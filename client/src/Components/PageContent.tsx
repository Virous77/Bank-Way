import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import TransactionPage from "../Pages/TransactionPage";
import SettingsPage from "../Pages/SettingsPage";

const PageContent = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/transaction" element={<TransactionPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </React.Fragment>
  );
};

export default PageContent;
