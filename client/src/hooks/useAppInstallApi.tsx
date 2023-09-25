import axios from "axios";
import { getLocalData } from "../Utils/data";
import { useGlobalContext } from "../Store/globalContext";
import { useLayoutEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const useAppInstallApi = () => {
  const id = getLocalData("bankPwaId");
  const { handleSetNotification } = useGlobalContext();
  const [pwaStatus, setPwaStatus] = useState({
    data: "",
    isLoading: false,
  });

  const isPwaInstalled = window.matchMedia(
    "(display-mode: standalone)"
  ).matches;

  const getPwaStatusData = async (newId: string) => {
    try {
      setPwaStatus({ ...pwaStatus, isLoading: true });
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/pwa/${id || newId}`
      );
      setPwaStatus({ ...pwaStatus, data: data.data, isLoading: false });
    } catch (error) {
      setPwaStatus({ ...pwaStatus, isLoading: false });
      handleSetNotification({
        message: "Something went wrong,Try again!",
        status: "error",
      });
    }
  };

  const setPwaStatusData = async () => {
    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/pwa`, { id });
  };

  useLayoutEffect(() => {
    const newId = uuidv4();
    if (!id) {
      localStorage.setItem("bankPwaId", JSON.stringify(newId));
    }

    if (!isPwaInstalled) {
      getPwaStatusData(newId);
    }
  }, []);

  return { pwaStatus, setPwaStatusData, isPwaInstalled };
};

export default useAppInstallApi;
