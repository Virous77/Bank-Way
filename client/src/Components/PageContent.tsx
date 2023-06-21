import React from "react";
import { Routes, Route } from "react-router-dom";
import TransactionPage from "../Pages/TransactionPage";
import SettingsPage from "../Pages/SettingsPage";
import UserPage from "../Pages/UserPage";
import DashboardPage from "../Pages/DashboardPage";
import ErrorPage from "../Pages/ErrorPage";

const PageContent = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/transaction" element={<TransactionPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/account" element={<UserPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </React.Fragment>
  );
};

export default PageContent;
