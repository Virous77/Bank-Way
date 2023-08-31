/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-var */
const useWorker = () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("../sw.js").then(() => {
      console.log("registered");
    });
  }

  var globalWorker: any;

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    globalWorker = event;
    return false;
  });

  const handleInstall = () => {
    if (globalWorker) {
      globalWorker.prompt();
      globalWorker.userChoice.then((cool: any) => {
        if (cool.outcome === "dismissed") {
          console.log("user close");
        } else {
          console.log("added it");
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
    } else if (userAgent.includes("Edge")) {
      return "edge";
    } else {
      return null;
    }
  };

  return { handleInstall, userClient };
};

export default useWorker;
