import axios from "axios";
import { getLocalData } from "../Utils/data";
import { useGlobalContext } from "../Store/globalContext";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const useAppInstallApi = () => {
  const id = getLocalData("bankPwaId");
  const { handleSetNotification } = useGlobalContext();
  const [pwaStatus, setPwaStatus] = useState("");

  const getPwaStatusData = async (newId: string) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/pwa/${id || newId}`
      );
      setPwaStatus(data.data);
    } catch (error) {
      handleSetNotification({
        message: "Something went wrong,Try again!",
        status: "error",
      });
    }
  };

  const setPwaStatusData = async () => {
    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/pwa`, { id });
  };

  useEffect(() => {
    const newId = uuidv4();
    if (!id) {
      localStorage.setItem("bankPwaId", JSON.stringify(newId));
    }

    getPwaStatusData(newId);
  }, []);

  return { pwaStatus, setPwaStatusData };
};

export default useAppInstallApi;
