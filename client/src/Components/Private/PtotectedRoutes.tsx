import { Navigate } from "react-router-dom";
import { getLocalData } from "../../Utils/data";

export const PrivateRoutes = ({ children }: { children: React.ReactNode }) => {
  const active = getLocalData("bankId");

  if (active) return children;
  return <Navigate to={"/landing"} />;
};

export const PublicRoutes = ({ children }: { children: React.ReactNode }) => {
  const active = getLocalData("bankId");

  if (!active) return children;
  return <Navigate to={"/"} />;
};

export const PrivateLinks = ({ children }: { children: React.ReactNode }) => {
  const active = getLocalData("bankId");

  if (active) return children;
  return null;
};

export const PublicLinks = ({ children }: { children: React.ReactNode }) => {
  const active = getLocalData("bankId");

  if (!active) return children;
  return null;
};
