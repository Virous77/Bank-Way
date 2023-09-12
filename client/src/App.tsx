import React from "react";
import Navbar from "./Components/Layout/Navbar";
import Router from "./Router";
import { PublicRoutes } from "./Components/Private/PtotectedRoutes";
import Notification from "./Components/Notification/Notification";
import Nav from "./Components/InfoNav/Nav";
import { useGlobalContext } from "./Store/globalContext";
import useWorker from "./hooks/useWorker";

const App = () => {
  const { state } = useGlobalContext();
  // useWorker();

  return (
    <React.Fragment>
      {state.show === "banner" && <Nav />}
      <Navbar />
      <PublicRoutes>
        <Router />
      </PublicRoutes>
      <Notification />
    </React.Fragment>
  );
};

export default App;
