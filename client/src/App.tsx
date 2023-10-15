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
import Offline from "./Components/Offline/Offline";

const App = () => {
  const id = getLocalData("bankId");
  const { state } = useGlobalContext();
  const { pwaStatus, isPwaInstalled } = useAppInstallApi();
  useWorker();

  return (
    <React.Fragment>
      {!pwaStatus.isLoading && (
        <>
          {state.install === "banner" &&
            !isPwaInstalled &&
            !pwaStatus.data &&
            !id && <Nav />}
        </>
      )}

      <Navbar />
      <PublicRoutes>
        <Router />
      </PublicRoutes>
      <Notification />
      <Offline />
    </React.Fragment>
  );
};

export default App;
