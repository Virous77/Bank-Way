import Error from "../Components/Error/Error";
import { useEffect } from "react";
import { useGlobalContext } from "../Store/globalContext";

const ErrorPage = () => {
  const { setState, state } = useGlobalContext();

  useEffect(() => {
    setState({ ...state, error: true });

    return () => {
      setState({ ...state, error: false });
      window.location.reload();
    };
  }, []);
  return <Error />;
};

export default ErrorPage;
