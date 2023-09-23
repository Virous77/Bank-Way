import React from "react";
import Navbar from "./Components/Layout/Navbar";
import Router from "./Router";
import { PublicRoutes } from "./Components/Private/PtotectedRoutes";
import Notification from "./Components/Notification/Notification";
import Nav from "./Components/InfoNav/Nav";
import { useGlobalContext } from "./Store/globalContext";
import useWorker from "./hooks/useWorker";
import useAppInstallApi from "./hooks/useAppInstallApi";
import { getLocalData } from "./Utils/data";

const App = () => {
  const id = getLocalData("bankId");
  const { state } = useGlobalContext();
  const { pwaStatus } = useAppInstallApi();
  useWorker();

  const isPwaInstalled = window.matchMedia(
    "(display-mode: standalone)"
  ).matches;

  return (
    <React.Fragment>
      {!id && (
        <>
          {state.install === "banner" && !isPwaInstalled && !pwaStatus && (
            <Nav />
          )}
        </>
      )}

      <Navbar />
      <PublicRoutes>
        <Router />
      </PublicRoutes>
      <Notification />
    </React.Fragment>
  );
};

export default App;
