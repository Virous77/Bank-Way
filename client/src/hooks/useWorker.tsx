/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGlobalContext } from "../Store/globalContext";

const useWorker = () => {
  const { state, setState } = useGlobalContext();

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("../sw.js").then(() => {
      console.log("registered");
    });
  }

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    setState({ ...state, service: event });
    return false;
  });

  const handleInstall = () => {
    if (state.service) {
      state.service.prompt();
      state.service.userChoice.then((value: any) => {
        if (value.outcome === "dismissed") {
          console.log("user close");
        } else {
          console.log("installed");
        }
      });
    }
  };

  const userAgent = navigator.userAgent;

  const userClient = () => {
    if (userAgent.includes("Chrome")) {
      return "chrome";
    } else if (userAgent.includes("Firefox")) {
      return "firefox";
    } else if (userAgent.includes("Safari")) {
      return "safari";
    } else if (userAgent.includes("Edg")) {
      return "edge";
    } else {
      return null;
    }
  };

  const isMobile = () => {
    if (
      screen.width <= 821 ||
      (window.matchMedia &&
        window.matchMedia("only screen and (max-width: 821px)").matches)
    ) {
      return true;
    } else {
      return false;
    }
  };

  return { handleInstall, userClient, isMobile };
};

export default useWorker;
