import React from "react";
import { Link, P } from "./auth.style";
import { useGlobalContext } from "../../Store/globalContext";
import { useAuthContext } from "../../Store/AuthContext";

type ActionType = {
  title: string;
};

const Action: React.FC<ActionType> = ({ title }) => {
  const { setState, state } = useGlobalContext();
  const { setFormData, formData } = useAuthContext();

  return (
    <P
      onClick={() =>
        setFormData({ ...formData, password: "", email: "", name: "" })
      }
    >
      {title !== "signIn"
        ? "Already have an Account?"
        : "Don't have an Account?"}{" "}
      {title !== "signIn" ? (
        <Link onClick={() => setState({ ...state, show: "signIn" })}>
          Sign In
        </Link>
      ) : (
        <Link onClick={() => setState({ ...state, show: "signUp" })}>
          Sign Up
        </Link>
      )}
    </P>
  );
};

export default Action;
