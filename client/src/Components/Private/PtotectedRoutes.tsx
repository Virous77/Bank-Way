import { Navigate } from "react-router-dom";
import { getLocalData } from "../../Utils/data";
import { useGlobalContext } from "../../Store/globalContext";

export const PrivateRoutes = ({ children }: { children: React.ReactNode }) => {
  const { state } = useGlobalContext();
  const active = getLocalData("bankId");

  if (active || state.isLoggedIn) return children;
  return <Navigate to={"/landing"} />;
};

export const PublicRoutes = ({ children }: { children: React.ReactNode }) => {
  const { state } = useGlobalContext();
  const active = getLocalData("bankId");

  if (!active || !state.isLoggedIn) return children;
  return <Navigate to={"/"} />;
};

export const PrivateLinks = ({ children }: { children: React.ReactNode }) => {
  const active = getLocalData("bankId");
  const { state } = useGlobalContext();

  if (active || state.isLoggedIn) return children;
  return null;
};

export const PublicLinks = ({ children }: { children: React.ReactNode }) => {
  const active = getLocalData("bankId");
  const { state } = useGlobalContext();

  if (!active || !state.isLoggedIn) return children;
  return null;
};
